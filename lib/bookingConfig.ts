/** Online booking vs consultation inquiry routing. */

export const INQUIRY_ONLY_CATEGORIES = new Set([
  "injectables-wrinkle-relaxers",
  "dermal-fillers-skin-boosters",
]);

export const ONLINE_BOOKABLE_CATEGORIES = new Set([
  "facials-skin-health",
  "body-sculpting-contouring",
  "laser-hair-removal",
  "microneedling-skin-resurfacing",
]);

export function isInquiryOnlyCategory(categorySlug: string) {
  return INQUIRY_ONLY_CATEGORIES.has(categorySlug);
}

export function isOnlineBookableCategory(categorySlug: string) {
  return ONLINE_BOOKABLE_CATEGORIES.has(categorySlug);
}

export function getTreatmentBookHref(categorySlug: string, treatmentSlug: string) {
  if (isInquiryOnlyCategory(categorySlug)) {
    return `/booking?service=${encodeURIComponent(treatmentSlug)}`;
  }
  if (isOnlineBookableCategory(categorySlug)) {
    const params = new URLSearchParams({
      category: categorySlug,
      treatment: treatmentSlug,
    });
    return `/book?${params.toString()}`;
  }
  return "/book";
}

export function getTreatmentBookLabel(categorySlug: string) {
  return isInquiryOnlyCategory(categorySlug) ? "Book Consultation" : "Book Online";
}

export const BOOKING_CATEGORY_LABELS: Record<string, string> = {
  "facials-skin-health": "Facials & Skin Health",
  "body-sculpting-contouring": "Muscle Toning (HIFEM)",
  "laser-hair-removal": "Laser Hair Removal",
  "microneedling-skin-resurfacing": "Microneedling & IPL",
};
