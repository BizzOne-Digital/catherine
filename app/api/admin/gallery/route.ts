import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const body = await req.json();
    const item = await GalleryItem.create(body);
    return NextResponse.json({ item }, { status: 201 });
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
    const item = await GalleryItem.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ item });
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
    await GalleryItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
