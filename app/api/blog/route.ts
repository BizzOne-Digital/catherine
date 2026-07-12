import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

    const query: Record<string, unknown> = { status: "published" };
    if (category) query.category = category;

    let q = BlogPost.find(query).sort({ publishedAt: -1 });
    if (limit) q = q.limit(limit);

    const posts = await q.lean();
    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
