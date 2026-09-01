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
    const result = await fulfillAppointmentFromStripeSession(sessionId);
    if (!result) {
      return NextResponse.json(
        { error: "Payment not completed for this session" },
        { status: 400 }
      );
    }

    await connectDB();
    const appointment = await Appointment.findById(result.appointmentId);
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
        emailSent: result.emailSent,
        calendarSynced: result.calendarSynced,
        createdAt: appointment.createdAt,
      },
    });
  } catch (err) {
    console.error("[booking/receipt]", err);
    return NextResponse.json({ error: "Could not load appointment" }, { status: 500 });
  }
}
