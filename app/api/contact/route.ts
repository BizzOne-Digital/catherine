import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interestedService, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    await connectDB();

    const inquiry = await ContactInquiry.create({
      name, email, phone, interestedService, message, status: "new",
    });

    // Send email (non-blocking)
    sendContactEmail({ name, email, phone, interestedService, message }).catch(console.error);

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
