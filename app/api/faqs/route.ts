import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 }).lean();
    return NextResponse.json({ faqs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
