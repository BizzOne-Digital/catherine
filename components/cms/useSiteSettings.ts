"use client";

import { useCallback, useEffect, useState } from "react";

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
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  businessName: "Lumina Medi Spa",
  tagline: "Medical Aesthetics Designed Around You",
  phone: "(437) 888-9022",
  email: "Luminamedispa@gmail.com",
  address: "42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9",
  instagramUrl: "https://instagram.com/luminamedispa",
  facebookUrl: "",
  googleMapsUrl: "",
  hoursMonFri: "10:00 AM – 7:00 PM (By Appointment)",
  hoursSat: "10:00 AM – 7:00 PM (By Appointment)",
  hoursSun: "10:00 AM – 6:00 PM (By Appointment)",
  announcementBarText: "✦ Complimentary Skin Consultation — Book Today ✦",
  announcementBarEnabled: true,
  metaTitle: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  metaDescription:
    "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
  leadOfferTitle: "Free Consultation",
  leadOfferSubtitle: "20% Off on Your First Treatment",
};

/** Digits-only tel: href from a display phone string */
export function phoneToTel(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "tel:+14378889022";
  return digits.startsWith("1") ? `tel:+${digits}` : `tel:+1${digits}`;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch(`/api/settings?_=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.settings) {
          setSettings({ ...DEFAULT_SITE_SETTINGS, ...d.settings });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { settings, loading, reload: load };
}
