import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({});
  }
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const body = await req.json();
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(body);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, body, { new: true });
    }
    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
