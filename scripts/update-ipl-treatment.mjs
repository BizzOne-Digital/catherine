/**
 * Sync IPL/BBL Photofacial copy updates.
 * Usage: node scripts/update-ipl-treatment.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readMongoUri() {
  const envPath = resolve(root, ".env.local");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^MONGODB_URI=(.+)$/);
    if (match) return match[1].trim();
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const shortDescription =
  "Advanced light-based treatments designed to improve sun damage, pigmentation, redness, acne, and overall skin clarity.";

const heroContent = shortDescription;

const aboutContent =
  "IPL (Intense Pulsed Light) and BBL (BroadBand Light) Photofacials use controlled pulses of light energy to target pigmentation, sun damage, redness, visible blood vessels, and acne-related concerns. The light energy is absorbed by areas of excess pigment and vascular concerns while also helping reduce acne-causing bacteria and inflammation, promoting a clearer, healthier-looking complexion.";

const benefitsItems = [
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

const idealFor =
  "Clients looking to improve sun damage, pigmentation, redness, visible capillaries, acne, or uneven skin tone. Ideal for those seeking a non-invasive treatment to restore clearer, healthier-looking skin.";

const Treatment = mongoose.model(
  "Treatment",
  new mongoose.Schema({}, { strict: false })
);

await mongoose.connect(readMongoUri());

const result = await Treatment.updateOne(
  { categorySlug: "microneedling-skin-resurfacing", slug: "ipl-photofacial" },
  {
    $set: {
      shortDescription,
      "sections.$[hero].content": heroContent,
      "sections.$[about].content": aboutContent,
      "sections.$[benefits].items": benefitsItems,
      "sections.$[ideal].content": idealFor,
    },
  },
  {
    arrayFilters: [
      { "hero.type": "hero" },
      { "about.type": "about" },
      { "benefits.type": "benefits" },
      { "ideal.type": "ideal_for" },
    ],
  }
);

console.log("Matched:", result.matchedCount, "Modified:", result.modifiedCount);
await mongoose.disconnect();
