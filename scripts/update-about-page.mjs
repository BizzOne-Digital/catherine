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
          "At Lumina Medi Spa, we combine evidence-based medical aesthetics with personalized treatment plans to help you achieve refreshed, natural-looking results. Every treatment begins with a thorough consultation, ensuring your concerns, goals, and unique features guide every recommendation.",
      },
      0
    ),
    sec(
      "team",
      "cards",
      {
        subtitle: "Our Specialists",
        title: "Meet Our Team",
        items: [
          "Catherine|Registered Nurse & Lead Injector|Catherine is a Registered Nurse with clinical experience in both medical-surgical nursing and primary care. She completed advanced neuromodulator and dermal filler training through the Canadian Association of Medical Aesthetics (CAMA) and is passionate about providing safe, evidence-based aesthetic treatments with natural-looking results. Her approach focuses on patient education, individualized care, and enhancing each client's unique features with precision and professionalism.",
          "Wendy|Medical Aesthetician|Wendy is a Medical Aesthetician with professional training in advanced skincare treatments. She enjoys getting to know each client, understanding their goals, and working together to achieve results that feel right for them. Seeing her clients' progress over time is the most rewarding part of what she does.",
        ],
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
          "Safety First|Your safety is our highest priority. Every treatment is performed using evidence-based techniques with a focus on patient education, comfort, and professional standards.",
          "Personalized Care|No two clients are alike. We take the time to understand your goals and create customized treatment plans tailored to your unique needs.",
          "Natural-Looking Results|We believe the best aesthetic treatments enhance your natural features while preserving your individuality.",
          "Ongoing Excellence|We are committed to continuing education and staying current with the latest advancements in medical aesthetics to provide safe and effective care.",
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
          "Registered Nurse (RN), College of Nurses of Ontario",
          "Advanced Neuromodulators & Dermal Fillers Certificate – Canadian Association of Medical Aesthetics (CAMA)",
          "Medical Aesthetician",
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
