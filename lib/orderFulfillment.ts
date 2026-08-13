import type Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { formatAddress, getStripe } from "@/lib/stripe";

export type FulfillResult = {
  orderId: string;
  emailSent: boolean;
  created: boolean;
};

async function buildOrderFromSession(session: Stripe.Checkout.Session) {
  const stripe = getStripe();
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

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
    session.metadata?.phone || session.customer_details?.phone || undefined;
  const shippingAddress =
    session.metadata?.shippingAddress ||
    formatAddress(
      session.shipping_details?.address || session.customer_details?.address || null
    );
  const billingAddress = formatAddress(session.customer_details?.address || null);

  return {
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
    paymentStatus: "paid" as const,
    orderStatus: "processing" as const,
    emailSent: false,
  };
}

/** Create or load a paid order from Stripe Checkout and send confirmation emails once. */
export async function fulfillOrderFromStripeSession(
  sessionId: string
): Promise<FulfillResult | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  await connectDB();
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return null;
  }

  let order = await Order.findOne({ stripeSessionId: session.id });
  let created = false;

  if (!order) {
    const payload = await buildOrderFromSession(session);
    try {
      order = await Order.create(payload);
      created = true;
    } catch (err: unknown) {
      // Race with webhook — load existing order
      const isDup =
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as { code?: number }).code === 11000;
      if (!isDup) throw err;
      order = await Order.findOne({ stripeSessionId: session.id });
      if (!order) throw err;
    }
  } else if (order.paymentStatus !== "paid") {
    order.paymentStatus = "paid";
    order.orderStatus = order.orderStatus === "new" ? "processing" : order.orderStatus;
    await order.save();
  }

  let emailSent = Boolean(order.emailSent);

  if (!emailSent) {
    await sendOrderConfirmationEmail({
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax ?? 0,
      total: order.total,
      orderId: order._id.toString(),
      stripeSessionId: session.id,
    });
    order.emailSent = true;
    await order.save();
    emailSent = true;
  }

  return {
    orderId: order._id.toString(),
    emailSent,
    created,
  };
}
