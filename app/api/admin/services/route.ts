import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/adminAuth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const body = await req.json();
    const slug = slugify(body.title, { lower: true, strict: true });
    const service = await Service.create({ ...body, slug });
    return NextResponse.json({ service }, { status: 201 });
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
    const service = await Service.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ service });
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
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
