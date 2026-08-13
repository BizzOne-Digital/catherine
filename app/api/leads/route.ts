import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, marketingConsent } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }
    if (!marketingConsent) {
      return NextResponse.json(
        { error: "Please agree to receive communications to continue" },
        { status: 400 }
      );
    }

    await connectDB();

    const interestedService = "Free Consultation · 20% Off First Treatment";
    const msg =
      (message || "").trim() ||
      "Lead capture pop-up submission (Free Consultation · 20% Off First Treatment)";

    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: msg,
      interestedService,
      source: "lead_popup",
      marketingConsent: true,
      status: "new",
    });

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interestedService,
        message: msg,
        source: "lead_popup",
      });
    } catch (emailErr) {
      console.error("Lead notification email failed:", emailErr);
    }

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
