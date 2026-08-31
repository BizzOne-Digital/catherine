/** Canonical public-facing site settings + legacy field migration. */

import {
  DEFAULT_HOURS_MON_FRI,
  DEFAULT_HOURS_SAT,
  DEFAULT_HOURS_SUN,
} from "@/lib/businessHours";

export type SiteSettings = {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  hoursMonFri: string;
  hoursSat: string;
  hoursSun: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
  metaTitle: string;
  metaDescription: string;
  leadOfferTitle: string;
  leadOfferSubtitle: string;
  /** Google Appointment Schedules booking page URL */
  googleAppointmentUrl: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  businessName: "Lumina Medi Spa",
  tagline: "Medical Aesthetics Designed Around You",
  phone: "(437) 888-9022",
  email: "Luminamedispa@gmail.com",
  address: "42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9",
  instagramUrl: "https://instagram.com/luminamedispa",
  facebookUrl: "https://www.facebook.com/people/Lumina-Medi-Spa/61592873863862/",
  googleMapsUrl: "",
  hoursMonFri: DEFAULT_HOURS_MON_FRI,
  hoursSat: DEFAULT_HOURS_SAT,
  hoursSun: DEFAULT_HOURS_SUN,
  announcementBarText: "✦ Complimentary Skin Consultation — Book Today ✦",
  announcementBarEnabled: true,
  metaTitle: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  metaDescription:
    "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
  leadOfferTitle: "Free Consultation",
  leadOfferSubtitle: "20% Off on Your First Treatment",
  googleAppointmentUrl: "",
};

function pickString(...candidates: unknown[]): string | undefined {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return undefined;
}

/**
 * Merge DB / API payload with defaults.
 * Migrates legacy field names and ignores empty strings so they don't wipe defaults.
 */
export function normalizeSiteSettings(
  raw: Record<string, unknown> | null | undefined
): SiteSettings {
  const r = raw || {};

  const instagramUrl =
    pickString(r.instagramUrl, r.instagram) ||
    DEFAULT_SITE_SETTINGS.instagramUrl;

  // Support bare handle stored as "luminamedispa"
  const normalizedIg =
    instagramUrl.startsWith("http")
      ? instagramUrl
      : `https://instagram.com/${instagramUrl.replace(/^@/, "")}`;

  return {
    businessName:
      pickString(r.businessName) || DEFAULT_SITE_SETTINGS.businessName,
    tagline:
      pickString(r.tagline, r.heroSubtitle) || DEFAULT_SITE_SETTINGS.tagline,
    phone: pickString(r.phone) || DEFAULT_SITE_SETTINGS.phone,
    email: pickString(r.email) || DEFAULT_SITE_SETTINGS.email,
    address: pickString(r.address) || DEFAULT_SITE_SETTINGS.address,
    instagramUrl: normalizedIg,
    facebookUrl: pickString(r.facebookUrl) || "",
    googleMapsUrl: pickString(r.googleMapsUrl) || "",
    hoursMonFri:
      pickString(r.hoursMonFri) || DEFAULT_SITE_SETTINGS.hoursMonFri,
    hoursSat: pickString(r.hoursSat) || DEFAULT_SITE_SETTINGS.hoursSat,
    hoursSun: pickString(r.hoursSun) || DEFAULT_SITE_SETTINGS.hoursSun,
    announcementBarText:
      pickString(r.announcementBarText, r.announcementText) ||
      DEFAULT_SITE_SETTINGS.announcementBarText,
    announcementBarEnabled:
      typeof r.announcementBarEnabled === "boolean"
        ? r.announcementBarEnabled
        : DEFAULT_SITE_SETTINGS.announcementBarEnabled,
    metaTitle:
      pickString(r.metaTitle, r.seoTitle) || DEFAULT_SITE_SETTINGS.metaTitle,
    metaDescription:
      pickString(r.metaDescription, r.seoDescription) ||
      DEFAULT_SITE_SETTINGS.metaDescription,
    leadOfferTitle:
      pickString(r.leadOfferTitle) || DEFAULT_SITE_SETTINGS.leadOfferTitle,
    leadOfferSubtitle:
      pickString(r.leadOfferSubtitle) || DEFAULT_SITE_SETTINGS.leadOfferSubtitle,
    googleAppointmentUrl:
      pickString(r.googleAppointmentUrl) || DEFAULT_SITE_SETTINGS.googleAppointmentUrl,
  };
}

/** Google Appointment Schedules link for Phase 1 online booking. */
export function resolveGoogleAppointmentUrl(
  settings: Pick<SiteSettings, "googleAppointmentUrl">
): string {
  return (
    settings.googleAppointmentUrl?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL?.trim() ||
    ""
  );
}

export function phoneToTel(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "tel:+14378889022";
  return digits.startsWith("1") ? `tel:+${digits}` : `tel:+1${digits}`;
}

/** Split full address into city line + street line for footer display */
export function splitAddress(address: string): { city: string; street: string } {
  const full = (address || DEFAULT_SITE_SETTINGS.address).trim();
  // Expected: "42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9"
  const mississaugaIdx = full.search(/Mississauga/i);
  if (mississaugaIdx > 0) {
    const street = full
      .slice(0, mississaugaIdx)
      .replace(/,\s*$/, "")
      .trim();
    return {
      city: "Mississauga, Ontario",
      street: street || "42 Village Centre Place, Unit 100",
    };
  }
  return {
    city: "Mississauga, Ontario",
    street: full || "42 Village Centre Place, Unit 100",
  };
}
