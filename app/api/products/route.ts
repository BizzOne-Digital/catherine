import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

    const query: Record<string, unknown> = { isActive: true };
    if (featured) query.isFeatured = true;
    if (category) query.category = category;

    let q = Product.find(query).sort({ createdAt: -1 });
    if (limit) q = q.limit(limit);

    const products = await q.lean();
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
