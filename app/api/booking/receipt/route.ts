import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { fulfillAppointmentFromStripeSession } from "@/lib/appointmentFulfillment";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id")?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    await connectDB();
    let appointment = await Appointment.findOne({ stripeSessionId: sessionId });

    if (!appointment) {
      const result = await fulfillAppointmentFromStripeSession(sessionId);
      if (result) {
        appointment = await Appointment.findById(result.appointmentId);
      }
    } else if (appointment.paymentStatus !== "paid") {
      await fulfillAppointmentFromStripeSession(sessionId);
      appointment = await Appointment.findOne({ stripeSessionId: sessionId });
    }

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({
      appointment: {
        id: appointment._id.toString(),
        serviceName: appointment.serviceName,
        customerName: appointment.customerName,
        email: appointment.email,
        phone: appointment.phone,
        startLocal: appointment.startLocal,
        endLocal: appointment.endLocal,
        depositAmount: appointment.depositAmount,
        status: appointment.status,
        emailSent: appointment.emailSent,
        createdAt: appointment.createdAt,
      },
    });
  } catch (err) {
    console.error("[booking/receipt]", err);
    return NextResponse.json({ error: "Could not load appointment" }, { status: 500 });
  }
}
