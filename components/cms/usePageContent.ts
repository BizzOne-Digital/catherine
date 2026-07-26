"use client";
import { useCallback, useEffect, useState } from "react";

export type PageSection = {
  id: string;
  key: string;
  type: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
};

export type SitePageData = {
  slug: string;
  title: string;
  path: string;
  sections: PageSection[];
  updatedAt?: string;
};

export function sectionByKey(
  sections: PageSection[] | undefined,
  key: string
): PageSection | undefined {
  return sections?.find((s) => s.key === key);
}

export function usePageContent(slug: string) {
  const [page, setPage] = useState<SitePageData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch(`/api/pages?slug=${encodeURIComponent(slug)}&_=${Date.now()}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d) => setPage(d.page || null))
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    load();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load]);

  const get = useCallback(
    (key: string) => {
      const s = sectionByKey(page?.sections, key);
      if (!s) return undefined;
      const items = Array.isArray(s.items)
        ? s.items
        : typeof s.items === "string" && s.items
          ? [s.items]
          : [];
      return { ...s, items };
    },
    [page]
  );

  return { page, loading, get, sections: page?.sections || [], reload: load };
}
