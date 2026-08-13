/**
 * Upsert only the About page CMS content (does not wipe other pages).
 * Usage: node scripts/update-about-page.mjs
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

const aboutPage = {
  slug: "about",
  title: "About",
  path: "/about",
  sections: [
    sec(
      "hero",
      "hero",
      {
        title: "About\nLumina Medi Spa",
        subtitle: "Evidence-Based. Personalized. Natural Results.",
        content:
          "At Lumina Medi Spa, we combine medical aesthetics with personalized care to help you achieve refreshed, natural-looking results. Every treatment begins with a consultation to understand your goals and determine an approach suited to you.",
      },
      0
    ),
    sec(
      "team",
      "cards",
      {
        title: "Our Professionals",
        content:
          "Our team includes trained healthcare and aesthetic professionals committed to providing knowledgeable, attentive care.",
        items: [],
      },
      1
    ),
    sec(
      "values",
      "cards",
      {
        subtitle: "Our Approach",
        title: "What Guides Us",
        items: [
          "Safety First|We prioritize safety, education, and professional standards in every treatment.",
          "Personalized Care|Treatment recommendations are tailored to your individual goals and needs.",
          "Natural Results|Our goal is to enhance your features while preserving your natural appearance.",
          "Ongoing Excellence|We stay current with advances in medical aesthetics through continued education and training.",
        ],
      },
      2
    ),
    sec(
      "credentials",
      "cards",
      {
        title: "Credentials & Training",
        items: [
          "Medical Aesthetician",
          "Registered Nurse (RN), College of Nurses of Ontario",
          "Medical Director",
          "Advanced Neuromodulators & Dermal Fillers Certificate – CAMA",
          "IPL & Laser Therapy Certified",
          "Ongoing Education in Medical Aesthetics",
        ],
      },
      3
    ),
  ],
};

const SitePage = mongoose.model(
  "SitePage",
  new mongoose.Schema(
    {
      slug: { type: String, unique: true },
      title: String,
      path: String,
      sections: Array,
    },
    { timestamps: true, strict: false }
  )
);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || readEnv());
  await SitePage.findOneAndUpdate({ slug: "about" }, aboutPage, {
    upsert: true,
    new: true,
  });
  console.log("Upserted About page CMS content.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
