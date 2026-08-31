import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import {
  BOOKING_DEPOSIT_CAD,
  getBookableService,
} from "@/lib/bookableServices";
import {
  computeEndLocal,
  validateSlotAvailable,
} from "@/lib/appointmentFulfillment";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const serviceId = String(body?.serviceId || "").trim();
    const startLocal = String(body?.startLocal || "").trim();
    const customerName = String(body?.customerName || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();

    if (!serviceId || !startLocal || !customerName || !email || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const service = getBookableService(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    const slotCheck = await validateSlotAvailable(serviceId, startLocal);
    if (!slotCheck.ok) {
      return NextResponse.json({ error: slotCheck.error }, { status: 400 });
    }

    const endLocal = await computeEndLocal(startLocal, service.durationMinutes);

    await connectDB();

    const appointment = await Appointment.create({
      serviceId: service.id,
      serviceName: service.name,
      durationMinutes: service.durationMinutes,
      categorySlug: service.categorySlug,
      treatmentSlug: service.treatmentSlug,
      customerName,
      email,
      phone,
      startLocal,
      endLocal,
      depositAmount: BOOKING_DEPOSIT_CAD,
      paymentStatus: "pending",
      status: "pending",
      emailSent: false,
    });

    const stripe = getStripe();
    const siteUrl = getSiteUrl(req);
    const depositCents = Math.round(BOOKING_DEPOSIT_CAD * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Appointment deposit — ${service.name}`,
              description: `Deposit for ${startLocal.replace("T", " at ")} (Eastern Time)`,
            },
            unit_amount: depositCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/book?category=${encodeURIComponent(service.categorySlug)}&treatment=${encodeURIComponent(service.treatmentSlug)}`,
      metadata: {
        type: "appointment",
        appointmentId: appointment._id.toString(),
        serviceId: service.id,
        startLocal,
        customerName: customerName.slice(0, 200),
        phone: phone.slice(0, 100),
      },
    });

    appointment.stripeSessionId = session.id;
    await appointment.save();

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("[booking/checkout]", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
