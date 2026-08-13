import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    const query: Record<string, unknown> = { isActive: true };
    if (featured) query.isFeatured = true;
    if (category) query.category = category;

    const services = await Service.find(query).sort({ order: 1 }).lean();
    return NextResponse.json({ services });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
