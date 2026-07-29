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

    sendBookingEmail({
      fullName,
      email,
      phone,
      treatmentInterest,
      preferredDate,
      preferredTime,
      clientType,
      message,
    }).catch(console.error);

    return NextResponse.json({ success: true, id: booking._id }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
