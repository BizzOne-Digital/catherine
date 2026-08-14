export type BeforeAfterItem = {
  service: string;
  beforeSrc: string;
  afterSrc: string;
};

export type ClinicPhoto = {
  src: string;
  alt: string;
  label: string;
  category: string;
};

/** Before & after pairs — labeled by treatment name. */
export const HOME_BEFORE_AFTER: BeforeAfterItem[] = [
  {
    service: "Botox / Dysport",
    beforeSrc: "/images/treatments/botox-before-after.png",
    afterSrc: "/images/treatments/botox-before-after.png",
  },
  {
    service: "Lip Filler",
    beforeSrc: "/images/treatments/lip-filler-before-after-2.png",
    afterSrc: "/images/treatments/lip-filler-before-after-2.png",
  },
  {
    service: "Microneedling",
    beforeSrc: "/images/treatments/Microneedling-before-and-after.png",
    afterSrc: "/images/treatments/Microneedling-before-and-after.png",
  },
  {
    service: "BBL / IPL Photofacial",
    beforeSrc: "/images/treatments/IPL-BBL-before-and-after.png",
    afterSrc: "/images/treatments/IPL-BBL-before-and-after.png",
  },
  {
    service: "BBL / IPL Photofacial (2)",
    beforeSrc: "/images/treatments/IPL-BBL-before-and-after-1.png",
    afterSrc: "/images/treatments/IPL-BBL-before-and-after-1.png",
  },
  {
    service: "HIFEM Muscle Toning",
    beforeSrc: "/images/treatments/HIFEM-muscle-toning-before-and-after.png",
    afterSrc: "/images/treatments/HIFEM-muscle-toning-before-and-after.png",
  },
];

/** Clinic environment photos. */
export const HOME_CLINIC_PHOTOS: ClinicPhoto[] = [
  {
    src: "/images/clinic/treatment-room-1.png",
    alt: "Lumina Medi Spa treatment room with two treatment beds",
    label: "Treatment Room",
    category: "Treatment Room",
  },
  {
    src: "/images/clinic/treatment-room-2.png",
    alt: "Lumina Medi Spa private treatment room",
    label: "Treatment Room",
    category: "Treatment Room",
  },
  {
    src: "/images/clinic/facial-analysis.png",
    alt: "Digital facial skin analysis at Lumina Medi Spa",
    label: "Facial Analysis",
    category: "Facial Analysis",
  },
  {
    src: "/images/clinic/injection-treatment.png",
    alt: "Injectable treatment at Lumina Medi Spa",
    label: "Injection Treatment",
    category: "Injection Treatment",
  },
  {
    src: "/images/clinic/waiting-area-1.png",
    alt: "Lumina Medi Spa waiting area seating",
    label: "Waiting Area",
    category: "Waiting Area",
  },
  {
    src: "/images/clinic/waiting-area-2.png",
    alt: "Lumina Medi Spa lounge and waiting area",
    label: "Waiting Area",
    category: "Waiting Area",
  },
  {
    src: "/images/clinic/washroom.png",
    alt: "Lumina Medi Spa washroom",
    label: "Washroom",
    category: "Washroom",
  },
];

export const CLINIC_LOUNGE_HD = "/images/clinic/clinic-lounge-hd.png";

export const SHOP_COLLECTION_DESCRIPTION =
  "Curated skincare products designed to complement your treatments and help maintain your in-clinic results at home.";

export const FACEBOOK_URL =
  "https://www.facebook.com/people/Lumina-Medi-Spa/61592873863862/";

export const TIKTOK_URL = "https://www.tiktok.com/@lumina.medi.spa";

export const DEFAULT_CLINIC_ADDRESS =
  "42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9";

export function getGoogleMapEmbedUrl(address?: string, customUrl?: string) {
  if (customUrl?.includes("google.com/maps/embed")) return customUrl;
  const query = encodeURIComponent(address?.trim() || DEFAULT_CLINIC_ADDRESS);
  return `https://www.google.com/maps?q=${query}&hl=en&z=16&output=embed`;
}

export function getGoogleMapLinkUrl(address?: string, customUrl?: string) {
  if (customUrl?.trim()) return customUrl.trim();
  const query = encodeURIComponent(address?.trim() || DEFAULT_CLINIC_ADDRESS);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
