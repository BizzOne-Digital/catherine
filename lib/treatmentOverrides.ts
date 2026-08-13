/** Live overrides for treatment pages when CMS/DB seed data is stale. */
type Section = {
  id: string;
  type: string;
  title: string;
  content: string;
  image: string;
  items: string[];
  order: number;
};

type TreatmentLike = {
  name: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  price: string;
  hidePrice?: boolean;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  bookingUrl?: string;
  popular: boolean;
  sections: Section[];
};

const HYDRAFACIAL_IMAGE = "/images/treatments/hydrafacial-main.png";
const LED_THERAPY_IMAGE = "/images/treatments/led-therapy-facial.png";
const MICRONEEDLING_IMAGE = "/images/treatments/microneedling-main.png";

const HYDRAFACIAL_SLUGS = new Set(["purifying-facial", "hydra-glow-facial"]);

const LED_THERAPY_SLUGS = new Set([
  "relaxation-facial",
  "glow-and-go-facial",
  "facial-package-2",
  "facial-package-3",
  "facial-package-5",
]);

const IPL_SHORT_DESCRIPTION =
  "Advanced light-based treatments designed to improve sun damage, pigmentation, redness, acne, and overall skin clarity.";

const IPL_ABOUT_CONTENT =
  "IPL (Intense Pulsed Light) and BBL (BroadBand Light) Photofacials use controlled pulses of light energy to target pigmentation, sun damage, redness, visible blood vessels, and acne-related concerns. The light energy is absorbed by areas of excess pigment and vascular concerns while also helping reduce acne-causing bacteria and inflammation, promoting a clearer, healthier-looking complexion.";

const IPL_BENEFITS = [
  "Reduces the appearance of sun damage and age spots",
  "Improves uneven pigmentation and skin tone",
  "Helps minimize redness and visible blood vessels",
  "Helps reduce active acne breakouts and calm acne-related inflammation",
  "Reduces the appearance of freckles and brown spots",
  "Enhances overall skin clarity and texture",
  "Stimulates a healthier-looking complexion",
  "Quick treatment with minimal downtime",
  "Gradual, natural-looking improvement",
];

const IPL_IDEAL_FOR =
  "Clients looking to improve sun damage, pigmentation, redness, visible capillaries, acne, or uneven skin tone. Ideal for those seeking a non-invasive treatment to restore clearer, healthier-looking skin.";

function withHeroImage<T extends TreatmentLike>(treatment: T, image: string): T {
  return {
    ...treatment,
    image,
    sections: (treatment.sections || []).map((section) =>
      section.type === "hero" ? { ...section, image } : section
    ),
  };
}

/** Combined before/after images (single graphic per item). */
export function getCombinedBeforeAfterGallery(
  categorySlug: string,
  treatmentSlug: string
): string[] {
  if (
    categorySlug === "dermal-fillers-skin-boosters" &&
    treatmentSlug === "lip-filler"
  ) {
    return [
      "/images/treatments/lip-filler-before-after-1.png",
      "/images/treatments/lip-filler-before-after-2.png",
    ];
  }
  return [];
}

export function applyTreatmentOverrides<T extends TreatmentLike>(
  treatment: T,
  categorySlug: string,
  treatmentSlug: string
): T {
  if (
    categorySlug === "injectables-wrinkle-relaxers" &&
    treatmentSlug === "botox-or-dysport"
  ) {
    return {
      ...treatment,
      image: "/images/treatments/botox-main.png",
      beforeImage: "/images/treatments/botox-before-after.png",
      afterImage: "__combined__",
      sections: (treatment.sections || []).map((section) => {
        if (section.type === "hero") {
          return { ...section, image: "/images/treatments/botox-main.png" };
        }
        if (section.type === "benefits") {
          return {
            ...section,
            items: (section.items || []).filter(
              (item) => item.trim().toLowerCase() !== "no downtime required"
            ),
          };
        }
        return section;
      }),
    };
  }

  if (
    categorySlug === "dermal-fillers-skin-boosters" &&
    treatmentSlug === "lip-filler"
  ) {
    return {
      ...treatment,
      beforeImage: "",
      afterImage: "",
    };
  }

  if (
    categorySlug === "dermal-fillers-skin-boosters" &&
    treatmentSlug === "nctf-135-mesotherapy"
  ) {
    return {
      ...treatment,
      image: "/images/treatments/mesotherapy-main.png",
      sections: (treatment.sections || []).map((section) =>
        section.type === "hero"
          ? { ...section, image: "/images/treatments/mesotherapy-main.png" }
          : section
      ),
    };
  }

  if (
    categorySlug === "facials-skin-health" &&
    HYDRAFACIAL_SLUGS.has(treatmentSlug)
  ) {
    return withHeroImage(treatment, HYDRAFACIAL_IMAGE);
  }

  if (
    categorySlug === "microneedling-skin-resurfacing" &&
    treatmentSlug === "microneedling"
  ) {
    return withHeroImage(treatment, MICRONEEDLING_IMAGE);
  }

  if (
    categorySlug === "microneedling-skin-resurfacing" &&
    treatmentSlug === "ipl-photofacial"
  ) {
    return {
      ...withHeroImage(treatment, LED_THERAPY_IMAGE),
      shortDescription: IPL_SHORT_DESCRIPTION,
      sections: (treatment.sections || []).map((section) => {
        if (section.type === "hero") {
          return {
            ...section,
            image: LED_THERAPY_IMAGE,
            content: IPL_SHORT_DESCRIPTION,
          };
        }
        if (section.type === "about") {
          return { ...section, content: IPL_ABOUT_CONTENT };
        }
        if (section.type === "benefits") {
          return { ...section, items: IPL_BENEFITS };
        }
        if (section.type === "ideal_for") {
          return { ...section, content: IPL_IDEAL_FOR };
        }
        return section;
      }),
    };
  }

  if (
    (categorySlug === "facials-skin-health" && LED_THERAPY_SLUGS.has(treatmentSlug)) ||
    (categorySlug === "microneedling-skin-resurfacing" &&
      LED_THERAPY_SLUGS.has(treatmentSlug))
  ) {
    return withHeroImage(treatment, LED_THERAPY_IMAGE);
  }

  return treatment;
}
