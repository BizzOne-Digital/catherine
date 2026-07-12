import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
  return NextResponse.json({ inquiries });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const { id, status } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const inquiry = await ContactInquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ inquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
