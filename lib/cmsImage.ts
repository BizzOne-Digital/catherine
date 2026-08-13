/**
 * Resolve CMS / admin image URLs for safe storefront display.
 * - Mongo uploads: /api/uploads/...
 * - Legacy disk paths: /uploads/... → fallback (broken on Vercel)
 * - Static / remote URLs: passed through
 */
export const DEFAULT_CMS_IMAGE = "/images/about-clinic.jpg";

export function resolveCmsImage(
  url: string | null | undefined,
  fallback: string = DEFAULT_CMS_IMAGE
): string {
  if (!url || !String(url).trim()) return fallback;
  const trimmed = String(url).trim();

  // Legacy local-disk uploads — not available on Vercel
  if (trimmed.startsWith("/uploads/")) {
    return fallback;
  }

  if (trimmed.startsWith("/api/uploads/")) {
    if (trimmed.includes("..") || trimmed.includes("//")) return fallback;
    const parts = trimmed.replace(/^\/api\/uploads\//, "").split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return fallback;
    return trimmed;
  }

  return trimmed;
}

export function isMongoUploadUrl(url: string | null | undefined): boolean {
  return !!url?.startsWith("/api/uploads/");
}
