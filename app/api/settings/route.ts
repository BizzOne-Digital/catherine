import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";
import { isPlaceholderHoursText } from "@/lib/businessHours";
import {
  DEFAULT_SITE_SETTINGS,
  normalizeSiteSettings,
} from "@/lib/siteSettings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    let doc = await SiteSetting.findOne({});

    if (!doc) {
      doc = await SiteSetting.create({ ...DEFAULT_SITE_SETTINGS });
    } else {
      // Backfill empty / legacy / stale contact fields after deploy
      const normalized = normalizeSiteSettings(doc.toObject());
      const staleContact =
        !normalized.phone.includes("437") ||
        !normalized.email.toLowerCase().includes("luminamedispa") ||
        !normalized.address.includes("Village Centre");

      const staleHours =
        isPlaceholderHoursText(doc.hoursMonFri) ||
        isPlaceholderHoursText(doc.hoursSat) ||
        isPlaceholderHoursText(doc.hoursSun);

      const needsPatch =
        staleContact ||
        staleHours ||
        !doc.instagramUrl ||
        !doc.hoursMonFri ||
        !doc.hoursSat ||
        !doc.hoursSun;

      if (needsPatch) {
        const patch = {
          ...normalized,
          ...(staleContact
            ? {
                phone: DEFAULT_SITE_SETTINGS.phone,
                email: DEFAULT_SITE_SETTINGS.email,
                address: DEFAULT_SITE_SETTINGS.address,
              }
            : {}),
          ...(staleHours
            ? {
                hoursMonFri: DEFAULT_SITE_SETTINGS.hoursMonFri,
                hoursSat: DEFAULT_SITE_SETTINGS.hoursSat,
                hoursSun: DEFAULT_SITE_SETTINGS.hoursSun,
              }
            : {}),
        };
        Object.assign(doc, patch);
        await doc.save();
      }
    }

    const settings = normalizeSiteSettings(doc.toObject());

    return NextResponse.json(
      { settings },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("[api/settings]", err);
    return NextResponse.json(
      { settings: normalizeSiteSettings(null) },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  }
}
