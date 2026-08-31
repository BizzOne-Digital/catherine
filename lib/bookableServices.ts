/** Online bookable treatments — durations per Lumina spec (minutes). */

export type BookableService = {
  id: string;
  name: string;
  categorySlug: string;
  treatmentSlug: string;
  durationMinutes: number;
};

export const BOOKABLE_SERVICES: BookableService[] = [
  // Facials
  {
    id: "purifying-facial",
    name: "Purifying Pore Refinement Hydrafacial",
    categorySlug: "facials-skin-health",
    treatmentSlug: "purifying-facial",
    durationMinutes: 60,
  },
  {
    id: "hydra-glow-facial",
    name: "Hydra Glow Rejuvenating Hydrafacial",
    categorySlug: "facials-skin-health",
    treatmentSlug: "hydra-glow-facial",
    durationMinutes: 60,
  },
  {
    id: "relaxation-facial",
    name: "Signature Relaxation Facial",
    categorySlug: "facials-skin-health",
    treatmentSlug: "relaxation-facial",
    durationMinutes: 60,
  },
  {
    id: "glow-and-go-facial",
    name: "Glow & Go Facial",
    categorySlug: "facials-skin-health",
    treatmentSlug: "glow-and-go-facial",
    durationMinutes: 30,
  },
  {
    id: "facial-package-2",
    name: "Package of Any Facial (2 Sessions)",
    categorySlug: "facials-skin-health",
    treatmentSlug: "facial-package-2",
    durationMinutes: 60,
  },
  {
    id: "facial-package-3",
    name: "Package of Any Facial (3 Sessions)",
    categorySlug: "facials-skin-health",
    treatmentSlug: "facial-package-3",
    durationMinutes: 60,
  },
  {
    id: "facial-package-5",
    name: "Package of Any Facial (5 Sessions)",
    categorySlug: "facials-skin-health",
    treatmentSlug: "facial-package-5",
    durationMinutes: 60,
  },
  // Muscle toning
  {
    id: "body-sculpting-hifem",
    name: "Muscle Toning with HIFEM (Single Area)",
    categorySlug: "body-sculpting-contouring",
    treatmentSlug: "body-sculpting-hifem",
    durationMinutes: 30,
  },
  {
    id: "hifem-two-areas",
    name: "Muscle Toning with HIFEM (Two Areas)",
    categorySlug: "body-sculpting-contouring",
    treatmentSlug: "hifem-two-areas",
    durationMinutes: 30,
  },
  {
    id: "hifem-single-area-package-4",
    name: "Package of 4: Muscle Toning with HIFEM (Single Area)",
    categorySlug: "body-sculpting-contouring",
    treatmentSlug: "hifem-single-area-package-4",
    durationMinutes: 30,
  },
  {
    id: "hifem-two-areas-package-4",
    name: "Package of 4: Muscle Toning with HIFEM (Two Areas)",
    categorySlug: "body-sculpting-contouring",
    treatmentSlug: "hifem-two-areas-package-4",
    durationMinutes: 30,
  },
  // Laser hair removal
  {
    id: "small-area",
    name: "Small Area Laser Hair Removal (Chin OR Upper Lip)",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "small-area",
    durationMinutes: 20,
  },
  {
    id: "medium-area",
    name: "Medium Area Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "medium-area",
    durationMinutes: 20,
  },
  {
    id: "large-area",
    name: "Large Area Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "large-area",
    durationMinutes: 30,
  },
  {
    id: "full-body",
    name: "Full Body Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "full-body",
    durationMinutes: 75,
  },
  {
    id: "small-area-package-6",
    name: "Package of 6: Small Area Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "small-area-package-6",
    durationMinutes: 20,
  },
  {
    id: "medium-area-package-6",
    name: "Package of 6: Medium Area Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "medium-area-package-6",
    durationMinutes: 20,
  },
  {
    id: "large-area-package-6",
    name: "Package of 6: Large Area Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "large-area-package-6",
    durationMinutes: 30,
  },
  {
    id: "full-body-package-6",
    name: "Package of 6: Full Body Laser Hair Removal",
    categorySlug: "laser-hair-removal",
    treatmentSlug: "full-body-package-6",
    durationMinutes: 75,
  },
  // Microneedling
  {
    id: "microneedling",
    name: "Microneedling with HA (Face)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "microneedling",
    durationMinutes: 60,
  },
  {
    id: "microneedling-face-neck",
    name: "Microneedling with HA (Face and Neck)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "microneedling",
    durationMinutes: 75,
  },
  {
    id: "microneedling-pdrn",
    name: "Microneedling with PDRN (Face)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "microneedling",
    durationMinutes: 60,
  },
  {
    id: "microneedling-package-3",
    name: "Package of 3: Microneedling with HA (Face)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "microneedling",
    durationMinutes: 60,
  },
  {
    id: "microneedling-package-3-face-neck",
    name: "Package of 3: Microneedling with HA (Face and Neck)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "microneedling",
    durationMinutes: 75,
  },
  // IPL / BBL
  {
    id: "ipl-photofacial",
    name: "IPL Full Face Complexion Reset",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "ipl-photofacial",
    durationMinutes: 30,
  },
  {
    id: "ipl-spot",
    name: "IPL Spot Treatment (Acne Scars & Pigmentation)",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "ipl-photofacial",
    durationMinutes: 20,
  },
  {
    id: "ipl-full-face-package-3",
    name: "Package of 3: IPL Full Face Complexion Reset",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "ipl-photofacial",
    durationMinutes: 30,
  },
  {
    id: "ipl-spot-package-3",
    name: "Package of 3: IPL Spot Treatment",
    categorySlug: "microneedling-skin-resurfacing",
    treatmentSlug: "ipl-photofacial",
    durationMinutes: 20,
  },
];

export function getBookableService(id: string) {
  return BOOKABLE_SERVICES.find((s) => s.id === id);
}

export function getBookableServiceBySlug(categorySlug: string, treatmentSlug: string) {
  return BOOKABLE_SERVICES.find(
    (s) => s.categorySlug === categorySlug && s.treatmentSlug === treatmentSlug
  );
}

export const BOOKING_DEPOSIT_CAD = 30;
