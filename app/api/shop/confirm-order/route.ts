import { NextRequest, NextResponse } from "next/server";
import { fulfillOrderFromStripeSession } from "@/lib/orderFulfillment";

/** Backup when Stripe webhook is missing or delayed — sends order emails to admin inbox. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Valid sessionId is required" }, { status: 400 });
    }

    const result = await fulfillOrderFromStripeSession(sessionId);

    if (!result) {
      return NextResponse.json(
        { error: "Payment not completed for this session" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      emailSent: result.emailSent,
      created: result.created,
    });
  } catch (err) {
    console.error("Confirm order error:", err);
    const message = err instanceof Error ? err.message : "Failed to confirm order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
