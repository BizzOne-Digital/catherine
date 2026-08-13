/**
 * Seed SitePage documents for Admin → Pages CMS.
 * Usage: node scripts/seed-pages.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readEnv() {
  const envPath = resolve(root, ".env.local");
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^MONGODB_URI=(.+)$/);
    if (match) return match[1].trim();
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const MONGODB_URI = process.env.MONGODB_URI || readEnv();

function sec(key, type, data, order) {
  return {
    id: `${key}-${order}`,
    key,
    type,
    title: data.title || "",
    subtitle: data.subtitle || "",
    content: data.content || "",
    image: data.image || "",
    items: data.items || [],
    ctaLabel: data.ctaLabel || "",
    ctaHref: data.ctaHref || "",
    order,
  };
}

const pages = [
  {
    slug: "home",
    title: "Home",
    path: "/",
    sections: [
      sec("hero", "hero", {
        subtitle: "✦ Lumina Medi Spa · Mississauga",
        title: "Medical Aesthetics Designed Around You",
        content:
          "Expert injectables, advanced skin treatments, laser services, and body sculpting.",
        image: "/images/hero-bg.png",
        ctaLabel: "Book Consultation",
        ctaHref: "/booking",
      }, 0),
      sec("featured_treatments", "text", {
        subtitle: "Most Popular",
        title: "Popular Treatments",
        content:
          "From injectables to advanced facials, laser and body sculpting - every treatment is tailored to you and delivered with medical-grade care.",
      }, 1),
      sec("about_preview", "image_text", {
        subtitle: "Meet Your Specialist",
        title: "Care That Goes Beyond the Surface",
        content:
          "At Lumina Medi Spa, every treatment begins with a conversation. We start with a complimentary digital skin analysis to better understand your skin and create a personalized treatment plan tailored to your unique concerns and goals. By considering your anatomy, lifestyle, and desired results, we deliver natural-looking outcomes through a thoughtful, evidence-based approach.",
        image: "/images/about-clinic.jpg",
        items: [
          "Experienced Medical Aestheticians and Registered Nurse-led care",
          "Complimentary digital skin analysis",
          "Personalized treatment plans tailored to your unique goals",
          "Medical-grade technology and evidence-based treatments",
          "Safety, comfort, and transparency at every visit",
          "Natural-looking results that enhance your unique features",
        ],
        ctaLabel: "Learn More About Us",
        ctaHref: "/about",
      }, 2),
      sec("signature_care", "cards", {
        subtitle: "Treatments",
        title: "Treatments We Offer",
        content:
          "Four pillars of medical aesthetics — tailored with precision, safety, and natural-looking results.",
        items: [
          "Injectables|Botox®/Dysport®, dermal fillers, and skin boosters designed to smooth wrinkles, restore volume, and enhance your natural features.|/services/injectables-wrinkle-relaxers",
          "Skin Rejuvenation|Improve skin tone, texture, acne scars, pigmentation, and overall radiance with microneedling, BBL/IPL photofacials, and mesotherapy.|/services/microneedling-skin-resurfacing",
          "Advanced Facials|Deeply cleanse, exfoliate, and hydrate your skin with customized hydrafacial treatments for a refreshed, healthy glow.|/services/facials-skin-health",
          "Body & Laser Treatments|Achieve smoother skin with diode laser hair removal or strengthen and tone muscles with HIFEM body sculpting technology.|/services/laser-hair-removal",
        ],
        ctaLabel: "View All Services",
        ctaHref: "/services",
      }, 3),
      sec("shop_collection", "text", {
        subtitle: "Skincare",
        title: "Shop Our Collection",
        content:
          "Curated skincare products designed to complement your treatments and help maintain your in-clinic results at home.",
        ctaLabel: "View All Products",
        ctaHref: "/shop",
      }, 4),
      sec("final_cta", "cta", {
        subtitle: "Let's Create a Treatment Plan That's Right for You",
        title: "Ready to Get Started?",
        content:
          "Book your complimentary consultation and discover personalized treatments designed around your unique goals.",
        ctaLabel: "Book Free Consultation",
        ctaHref: "/booking",
        items: [
          "(437) 888-9022",
          "Lumina Medi Spa · 42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9 · By Appointment Only",
        ],
      }, 6),
    ],
  },
  {
    slug: "shop",
    title: "Shop",
    path: "/shop",
    sections: [
      sec("hero", "hero", {
        subtitle: "Retail Skincare",
        title: "Shop Our|Collection",
        content:
          "Medical-grade and clinical skincare from Cebelia, FORE Essentials, and Naturmed — curated to support your treatment results at home.",
      }, 0),
    ],
  },
  {
    slug: "about",
    title: "About",
    path: "/about",
    sections: [
      sec("hero", "hero", {
        title: "About\nLumina Medi Spa",
        subtitle: "Evidence-Based. Personalized. Natural Results.",
        content:
          "At Lumina Medi Spa, we combine medical aesthetics with personalized care to help you achieve refreshed, natural-looking results. Every treatment begins with a consultation to understand your goals and determine an approach suited to you.",
      }, 0),
      sec("team", "cards", {
        title: "Our Professionals",
        content:
          "Our team includes trained healthcare and aesthetic professionals committed to providing knowledgeable, attentive care.",
        items: [],
      }, 1),
      sec("values", "cards", {
        subtitle: "Our Approach",
        title: "What Guides Us",
        items: [
          "Safety First|We prioritize safety, education, and professional standards in every treatment.",
          "Personalized Care|Treatment recommendations are tailored to your individual goals and needs.",
          "Natural Results|Our goal is to enhance your features while preserving your natural appearance.",
          "Ongoing Excellence|We stay current with advances in medical aesthetics through continued education and training.",
        ],
      }, 2),
      sec("credentials", "cards", {
        title: "Credentials & Training",
        items: [
          "Medical Aesthetician",
          "Registered Nurse (RN), College of Nurses of Ontario",
          "Medical Director",
          "Advanced Neuromodulators & Dermal Fillers Certificate – CAMA",
          "IPL & Laser Therapy Certified",
          "Ongoing Education in Medical Aesthetics",
        ],
      }, 3),
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    path: "/contact",
    sections: [
      sec("hero", "hero", {
        subtitle: "Complimentary Consultation",
        title: "Book Your|Appointment",
        content:
          "Your first consultation is completely complimentary. Let's discuss your goals, answer your questions, and build a plan that's right for you.",
      }, 0),
    ],
  },
  {
    slug: "booking",
    title: "Booking",
    path: "/booking",
    sections: [
      sec("hero", "hero", {
        subtitle: "Complimentary Consultation",
        title: "Book Your|Appointment",
        content:
          "Your first consultation is completely complimentary. Let's discuss your goals, answer your questions, and build a plan that's right for you.",
      }, 0),
    ],
  },
  {
    slug: "services",
    title: "Services",
    path: "/services",
    sections: [
      sec("hero", "hero", {
        subtitle: "",
        title: "Our Treatments",
        content:
          "Explore personalized medical aesthetic treatments - from injectables and advanced skin rejuvenation to laser services, facials, and muscle toning, all delivered with safety, precision, and genuine care.",
      }, 0),
    ],
  },
  {
    slug: "pricing",
    title: "Pricing",
    path: "/pricing",
    sections: [
      sec("hero", "hero", {
        subtitle: "Transparent Pricing",
        title: "Treatment|Pricing",
        content:
          "Clear, upfront pricing for all our medical aesthetic treatments. Every plan is personalized during your complimentary consultation.",
        ctaLabel: "Book Free Consultation",
        ctaHref: "/booking",
      }, 0),
    ],
  },
  {
    slug: "financing",
    title: "Financing",
    path: "/financing",
    sections: [
      sec("hero", "hero", {
        subtitle: "Medicard by iFinance",
        title: "Care Today, Pay Over Time|with Medicard by iFinance",
        content:
          "We believe aesthetic treatments should be accessible. Lumina Medi Spa offers financing through Medicard by iFinance, so eligible clients can spread the cost of treatment over manageable monthly payments.",
        ctaLabel: "Apply with Medicard",
        ctaHref: "https://apply.medicard.com/25759",
      }, 0),
    ],
  },
  {
    slug: "faq",
    title: "FAQ",
    path: "/faq",
    sections: [
      sec("hero", "hero", {
        subtitle: "Got Questions?",
        title: "Frequently Asked|Questions",
        content: "Answers to the most common questions about treatments, safety, and booking at Lumina.",
      }, 0),
    ],
  },
  {
    slug: "category-injectables-wrinkle-relaxers",
    title: "Category: Injectables",
    path: "/services/injectables-wrinkle-relaxers",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Injectables & Wrinkle Relaxers",
        content:
          "Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.",
      }, 0),
    ],
  },
  {
    slug: "category-dermal-fillers-skin-boosters",
    title: "Category: Dermal Fillers",
    path: "/services/dermal-fillers-skin-boosters",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Dermal Fillers & Skin Boosters",
        content:
          "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
      }, 0),
    ],
  },
  {
    slug: "category-facials-skin-health",
    title: "Category: Facials",
    path: "/services/facials-skin-health",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Facials & Skin Health",
        content:
          "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
      }, 0),
    ],
  },
  {
    slug: "category-microneedling-skin-resurfacing",
    title: "Category: Microneedling",
    path: "/services/microneedling-skin-resurfacing",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Microneedling & Skin Resurfacing",
        content: "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
      }, 0),
    ],
  },
  {
    slug: "category-laser-hair-removal",
    title: "Category: Laser Hair Removal",
    path: "/services/laser-hair-removal",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Laser Hair Removal",
        content:
          "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
      }, 0),
    ],
  },
  {
    slug: "category-body-sculpting-contouring",
    title: "Category: Body Sculpting",
    path: "/services/body-sculpting-contouring",
    sections: [
      sec("hero", "hero", {
        subtitle: "Category",
        title: "Body Sculpting & Contouring",
        content:
          "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
      }, 0),
    ],
  },
];

const SitePage = mongoose.model(
  "SitePage",
  new mongoose.Schema(
    {
      slug: { type: String, unique: true },
      title: String,
      path: String,
      sections: [
        {
          id: { type: String },
          key: { type: String },
          type: { type: String },
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          content: { type: String, default: "" },
          image: { type: String, default: "" },
          items: [{ type: String }],
          ctaLabel: { type: String, default: "" },
          ctaHref: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },
    { timestamps: true }
  )
);

async function main() {
  console.log("Connecting to", MONGODB_URI, "...");
  await mongoose.connect(MONGODB_URI);
  await SitePage.deleteMany({});
  await SitePage.insertMany(pages);
  console.log(`Seeded ${pages.length} site pages.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
