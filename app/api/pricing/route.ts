import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pricing from "@/models/Pricing";

export async function GET() {
  try {
    await connectDB();
    const pricing = await Pricing.find({ isActive: true }).sort({ order: 1 }).lean();
    return NextResponse.json({ pricing });
  } catch {
    return NextResponse.json({ pricing: [] }, { status: 200 });
  }
}
