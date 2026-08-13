import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BookingInquiry from "@/models/BookingInquiry";
import { sendBookingEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      treatmentInterest,
      preferredDate,
      preferredTime,
      clientType,
      message,
      marketingConsent,
    } = body;

    if (!fullName || !email || !phone || !treatmentInterest) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    await connectDB();

    const booking = await BookingInquiry.create({
      fullName,
      email,
      phone,
      treatmentInterest,
      preferredDate,
      preferredTime,
      clientType: clientType || "new",
      message,
      marketingConsent: Boolean(marketingConsent),
      status: "new",
    });

    try {
      await sendBookingEmail({
        fullName,
        email,
        phone,
        treatmentInterest,
        preferredDate,
        preferredTime,
        clientType: clientType || "new",
        message,
      });
      console.info("[booking] Notification email sent to Luminamedispa@gmail.com");
    } catch (emailErr) {
      console.error("[booking] Notification email failed:", emailErr);
      return NextResponse.json(
        {
          error:
            "Your inquiry was saved but we could not send the notification email. Please call us directly or try again shortly.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, id: booking._id }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
