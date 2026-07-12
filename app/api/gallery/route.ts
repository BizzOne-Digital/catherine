import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const query: Record<string, unknown> = {};
    if (category && category !== "All") query.category = category;
    const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
