import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await connectDB();

      // Update order payment status if order was pre-created
      const existingOrder = await Order.findOne({ stripeSessionId: session.id });

      if (existingOrder) {
        existingOrder.paymentStatus = "paid";
        existingOrder.orderStatus = "processing";
        await existingOrder.save();

        // Send confirmation emails
        await sendOrderConfirmationEmail({
          customerName: existingOrder.customerName,
          email: existingOrder.email,
          items: existingOrder.items,
          total: existingOrder.total,
          orderId: existingOrder._id.toString(),
        });
      } else {
        // Create order from session data
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        const items = lineItems.data.map((item) => ({
          name: item.description || "Product",
          price: (item.amount_total || 0) / 100 / (item.quantity || 1),
          quantity: item.quantity || 1,
        }));

        const total = (session.amount_total || 0) / 100;
        const customerName =
          session.customer_details?.name ||
          session.shipping_details?.name ||
          "Customer";
        const email = session.customer_details?.email || "";

        const newOrder = await Order.create({
          customerName,
          email,
          items,
          subtotal: total,
          total,
          stripeSessionId: session.id,
          paymentStatus: "paid",
          orderStatus: "processing",
        });

        await sendOrderConfirmationEmail({
          customerName,
          email,
          items,
          total,
          orderId: newOrder._id.toString(),
        });
      }
    } catch (err) {
      console.error("Order processing error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
