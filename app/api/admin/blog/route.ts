import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { requireAdmin } from "@/lib/adminAuth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const body = await req.json();
    const slug = slugify(body.title, { lower: true, strict: true });
    const publishedAt = body.status === "published" ? new Date() : undefined;
    const post = await BlogPost.create({ ...body, slug, publishedAt });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const { id, ...body } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ post });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
