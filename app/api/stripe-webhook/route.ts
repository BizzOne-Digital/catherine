import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { formatAddress, getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 503 }
    );
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature error:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await connectDB();

      const existingOrder = await Order.findOne({ stripeSessionId: session.id });

      if (existingOrder) {
        if (existingOrder.paymentStatus !== "paid") {
          existingOrder.paymentStatus = "paid";
          existingOrder.orderStatus =
            existingOrder.orderStatus === "new" ? "processing" : existingOrder.orderStatus;
          if (session.customer_details?.phone) {
            existingOrder.phone = session.customer_details.phone;
          }
          await existingOrder.save();
        }
        return NextResponse.json({ received: true, orderId: existingOrder._id });
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });

      // Pre-tax unit prices from amount_subtotal when available
      const items = lineItems.data.map((item) => {
        const qty = item.quantity || 1;
        const preTax =
          typeof item.amount_subtotal === "number"
            ? item.amount_subtotal / 100 / qty
            : (item.amount_total || 0) / 100 / qty;
        return {
          name: item.description || "Product",
          price: preTax,
          quantity: qty,
        };
      });

      const subtotal = (session.amount_subtotal ?? session.amount_total ?? 0) / 100;
      const tax = (session.total_details?.amount_tax ?? 0) / 100;
      const total = (session.amount_total || 0) / 100;

      const customerName =
        session.metadata?.customerName ||
        session.customer_details?.name ||
        session.shipping_details?.name ||
        "Customer";
      const email = session.customer_details?.email || session.customer_email || "";
      const phone =
        session.metadata?.phone ||
        session.customer_details?.phone ||
        undefined;

      const shippingAddress =
        session.metadata?.shippingAddress ||
        formatAddress(
          session.shipping_details?.address || session.customer_details?.address || null
        );
      const billingAddress = formatAddress(session.customer_details?.address || null);

      const newOrder = await Order.create({
        customerName,
        email: email || "unknown@example.com",
        phone,
        shippingAddress: shippingAddress || undefined,
        billingAddress: billingAddress || undefined,
        items,
        subtotal,
        tax,
        total,
        stripeSessionId: session.id,
        paymentStatus: "paid",
        orderStatus: "processing",
      });

      try {
        await sendOrderConfirmationEmail({
          customerName,
          email,
          phone,
          shippingAddress,
          billingAddress,
          items,
          subtotal,
          tax,
          total,
          orderId: newOrder._id.toString(),
          stripeSessionId: session.id,
        });
      } catch (emailErr) {
        console.error("Order confirmation email failed:", emailErr);
      }
    } catch (err) {
      console.error("Order processing error:", err);
      return NextResponse.json({ error: "Order processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
