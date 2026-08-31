import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { fulfillOrderFromStripeSession } from "@/lib/orderFulfillment";
import { getStripe } from "@/lib/stripe";

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
      if (session.metadata?.type === "appointment") {
        const { fulfillAppointmentFromStripeSession } = await import(
          "@/lib/appointmentFulfillment"
        );
        const result = await fulfillAppointmentFromStripeSession(session.id);
        return NextResponse.json({
          received: true,
          appointmentId: result?.appointmentId,
          emailSent: result?.emailSent,
        });
      }

      const result = await fulfillOrderFromStripeSession(session.id);
      return NextResponse.json({
        received: true,
        orderId: result?.orderId,
        emailSent: result?.emailSent,
      });
    } catch (err) {
      console.error("Checkout processing error:", err);
      return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
