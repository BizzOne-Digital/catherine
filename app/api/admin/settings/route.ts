import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";
import { requireAdmin } from "@/lib/adminAuth";
import {
  DEFAULT_SITE_SETTINGS,
  normalizeSiteSettings,
} from "@/lib/siteSettings";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({ ...DEFAULT_SITE_SETTINGS });
  } else {
    const normalized = normalizeSiteSettings(settings.toObject());
    Object.assign(settings, normalized);
    await settings.save();
  }
  return NextResponse.json({
    settings: normalizeSiteSettings(settings.toObject()),
  });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const body = await req.json();
    const normalized = normalizeSiteSettings({
      ...DEFAULT_SITE_SETTINGS,
      ...body,
    });

    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(normalized);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(
        settings._id,
        { $set: normalized },
        { new: true }
      );
    }
    return NextResponse.json({
      settings: normalizeSiteSettings(settings?.toObject()),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
