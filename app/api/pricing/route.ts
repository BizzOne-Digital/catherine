import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pricing from "@/models/Pricing";
import { pricingItems as catalogItems } from "@/data/pricing.mjs";

function catalogFallback() {
  return catalogItems.map((item, index) => ({
    ...item,
    _id: `catalog-${index}`,
    isActive: true,
  }));
}

export async function GET() {
  try {
    await connectDB();
    const pricing = await Pricing.find({ isActive: true }).sort({ order: 1 }).lean();
    if (pricing.length > 0) {
      return NextResponse.json({ pricing });
    }
    return NextResponse.json({ pricing: catalogFallback() });
  } catch (err) {
    console.error("[api/pricing]", err);
    return NextResponse.json({ pricing: catalogFallback() }, { status: 200 });
  }
}
