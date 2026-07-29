"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_SITE_SETTINGS,
  normalizeSiteSettings,
  phoneToTel,
  splitAddress,
  type SiteSettings,
} from "@/lib/siteSettings";

export type { SiteSettings };
export { DEFAULT_SITE_SETTINGS, phoneToTel, splitAddress };

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch(`/api/settings?_=${Date.now()}`, {
      cache: "no-store",
      headers: { Pragma: "no-cache" },
    })
      .then((r) => r.json())
      .then((d) => {
        setSettings(normalizeSiteSettings(d.settings || null));
      })
      .catch(() => {
        setSettings(DEFAULT_SITE_SETTINGS);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { settings, loading, reload: load };
}
