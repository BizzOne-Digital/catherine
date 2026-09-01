import { NextRequest, NextResponse } from "next/server";
import { fulfillAppointmentFromStripeSession } from "@/lib/appointmentFulfillment";

export const dynamic = "force-dynamic";

/** Backup when Stripe webhook is delayed — creates calendar event + sends emails. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Valid sessionId is required" }, { status: 400 });
    }

    const result = await fulfillAppointmentFromStripeSession(sessionId);

    if (!result) {
      return NextResponse.json(
        { error: "Payment not completed for this appointment session" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      appointmentId: result.appointmentId,
      emailSent: result.emailSent,
      calendarSynced: result.calendarSynced,
    });
  } catch (err) {
    console.error("[booking/confirm]", err);
    const message = err instanceof Error ? err.message : "Failed to confirm appointment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
