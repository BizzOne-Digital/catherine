/**
 * Sync facial + resurfacing treatment hero/listing images.
 * Usage: node scripts/update-facial-treatments.mjs
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

const HYDRAFACIAL_IMAGE = "/images/treatments/hydrafacial-main.png";
const LED_THERAPY_IMAGE = "/images/treatments/led-therapy-facial.png";
const MICRONEEDLING_IMAGE = "/images/treatments/microneedling-main.png";

const updates = [
  {
    categorySlug: "facials-skin-health",
    slug: "purifying-facial",
    image: HYDRAFACIAL_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "hydra-glow-facial",
    image: HYDRAFACIAL_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "relaxation-facial",
    image: LED_THERAPY_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "glow-and-go-facial",
    image: LED_THERAPY_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "facial-package-2",
    image: LED_THERAPY_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "facial-package-3",
    image: LED_THERAPY_IMAGE,
  },
  {
    categorySlug: "facials-skin-health",
    slug: "facial-package-5",
    image: LED_THERAPY_IMAGE,
  },
  {
    categorySlug: "microneedling-skin-resurfacing",
    slug: "microneedling",
    image: MICRONEEDLING_IMAGE,
  },
  {
    categorySlug: "microneedling-skin-resurfacing",
    slug: "ipl-photofacial",
    image: LED_THERAPY_IMAGE,
  },
];

const Treatment = mongoose.model(
  "Treatment",
  new mongoose.Schema({}, { strict: false })
);

await mongoose.connect(readMongoUri());

for (const { categorySlug, slug, image } of updates) {
  const result = await Treatment.updateOne(
    { categorySlug, slug },
    {
      $set: {
        image,
        "sections.$[hero].image": image,
      },
    },
    { arrayFilters: [{ "hero.type": "hero" }] }
  );
  console.log(`${categorySlug}/${slug}: matched ${result.matchedCount}, modified ${result.modifiedCount}`);
}

await mongoose.disconnect();
