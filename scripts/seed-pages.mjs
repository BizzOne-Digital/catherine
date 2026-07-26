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
        title: "Reveal Your Best Skin",
        content: "Personalized Medical Aesthetics for Natural, Beautiful Results",
        image: "/images/hero-bg.png",
        ctaLabel: "Book Consultation",
        ctaHref: "/booking",
      }, 0),
      sec("featured_treatments", "text", {
        subtitle: "Most Popular",
        title: "Popular Treatments",
        content:
          "Our most-loved treatments — expertly delivered with precision, safety, and results you'll love.",
      }, 1),
      sec("about_preview", "image_text", {
        subtitle: "Meet Your Specialist",
        title: "Care That Goes Beyond the Surface",
        content:
          "At Lumina Medi Spa, every treatment begins with a conversation. We believe beautiful results come from truly understanding your goals, your anatomy, and your lifestyle — not from a one-size-fits-all approach.\n\n\"My goal is never to change who you are — it's to help you look like the best version of yourself.\"",
        image: "/images/about-clinic.jpg",
        items: [
          "Registered Nurse with 10+ years of aesthetic expertise",
          "Medical oversight ensuring the highest safety standards",
          "Customized treatment plans — never cookie-cutter",
          "Premium medical-grade products and technology",
          "Natural, balanced results that enhance your features",
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
          "Injectables|Botox and dermal fillers for smooth lines, restored volume, and naturally refined contours.|/services/injectables-wrinkle-relaxers",
          "Skin Tightening|Advanced treatments that firm, lift, and revitalize skin for a smoother, more youthful look.|/services/facials-skin-health",
          "Laser Rejuvenation|Laser and light-based care to improve tone, texture, pigmentation, and overall radiance.|/services/laser-hair-removal",
          "Medical Facials|Medical-grade facials customized to your skin type for clearer, healthier, glowing skin.|/services/facials-skin-health",
        ],
        ctaLabel: "View All Services",
        ctaHref: "/services",
      }, 3),
      sec("final_cta", "cta", {
        subtitle: "Begin Your Transformation",
        title: "Your Most Confident Self Awaits",
        content:
          "Take the first step toward results that feel effortlessly, beautifully you. Your complimentary consultation is waiting.",
        ctaLabel: "Book Free Consultation",
        ctaHref: "/booking",
        items: [
          "(905) 123-4567",
          "Lumina Medi Spa · 123 Luxury Lane, Mississauga, ON · By Appointment",
        ],
      }, 4),
    ],
  },
  {
    slug: "about",
    title: "About",
    path: "/about",
    sections: [
      sec("hero", "hero", {
        title: "About\nLumina Medi Spa",
        subtitle: "Woman-Owned. Medical-Grade. Results Driven.",
        content:
          "At Lumina Medi Spa, we combine advanced medical aesthetics with personalized care to help you look refreshed, natural, and confident in your own skin.",
      }, 0),
      sec("story", "image_text", {
        subtitle: "Our Beginning",
        title: "Where Medical Science Meets Artistry",
        content:
          "Lumina Medi Spa was born from a simple conviction: that every person deserves access to safe, effective, and personalized aesthetic care — delivered with warmth, honesty, and expertise.\n\nFounded by Catherine, a Registered Nurse with over a decade of experience in medical aesthetics, Lumina has become Mississauga's trusted destination for those seeking results that look and feel authentically them.",
        items: [
          "Catherine Zhang|RN, Founder & Lead Injector|\"My passion has always been helping people feel confident in their own skin — not by chasing perfection, but by celebrating the beauty that's already there.\"",
        ],
      }, 1),
      sec("values", "cards", {
        subtitle: "What Guides Us",
        title: "Our Values",
        items: [
          "Medical Safety First|All treatments are performed with rigorous medical standards and oversight by licensed professionals.",
          "Genuine Care|We listen. Every consultation begins with understanding your goals, concerns, and lifestyle.",
          "Expertise & Precision|With 10+ years in medical aesthetics, our technique is refined, artistic, and evidence-based.",
          "You-Centered Results|We believe in enhancing your natural beauty — never altering who you are, only elevating it.",
        ],
      }, 2),
      sec("credentials", "cards", {
        title: "Credentials & Training",
        items: [
          "Registered Nurse (RN) — Ontario College of Nurses",
          "Certified Medical Aesthetic Injector",
          "Advanced Injectable Training — Botox, Fillers, Mesotherapy",
          "IPL & Laser Therapy Certified",
          "Body Contouring & Muscle Stimulation Certified",
          "Ongoing Education in Aesthetic Medicine",
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
        subtitle: "Reach Out",
        title: "Get in|Touch",
        content:
          "Have a question or want to learn more? We'd love to hear from you. Expect a response within 24 hours.",
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
        subtitle: "Luxury Treatments",
        title: "Our Services",
        content:
          "Expert injectables, advanced skin treatments, facials, laser services, and body sculpting — tailored with precision, safety, and genuine care.",
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
        subtitle: "Flexible Payments",
        title: "Care today, paid your way with|Beautifi",
        content:
          "At Lumina, we believe great care shouldn't come with financial strain. Our partnership with Beautifi lets you access the treatments you want with flexible, affordable monthly payments.",
        ctaLabel: "Apply with Beautifi",
        ctaHref: "https://www.beautifi.com/",
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
    slug: "gallery",
    title: "Gallery",
    path: "/gallery",
    sections: [
      sec("hero", "hero", {
        subtitle: "Moments of Beauty. Stories of Confidence.",
        title: "Gallery",
        content:
          "See the glow. Feel the difference.\n\nExplore real moments from our clinic — treatments, transformations, and the luxury experience that defines Lumina Medi Spa.",
      }, 0),
    ],
  },
  {
    slug: "blog",
    title: "Blog",
    path: "/blog",
    sections: [
      sec("hero", "hero", {
        subtitle: "Insights & Education",
        title: "The Lumina|Journal",
        content:
          "Expert insights on medical aesthetics, skincare science, and the art of natural enhancement.",
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
