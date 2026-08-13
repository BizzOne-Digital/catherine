/**
 * Upsert laser hair removal package treatments + sync session pricing.
 * Usage: node scripts/update-laser-packages.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { treatmentsByCategory } from "./service-catalog.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readMongoUri() {
  const envPath = resolve(root, ".env.local");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^MONGODB_URI=(.+)$/);
    if (match) return match[1].trim();
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  new mongoose.Schema({}, { strict: false })
);

const Treatment = mongoose.model(
  "Treatment",
  new mongoose.Schema({}, { strict: false })
);

const Pricing = mongoose.model(
  "Pricing",
  new mongoose.Schema({}, { strict: false })
);

const categorySlug = "laser-hair-removal";
const laserTreatments = treatmentsByCategory[categorySlug] || [];

await mongoose.connect(readMongoUri());

const cat = await ServiceCategory.findOne({ slug: categorySlug }).lean();
if (!cat) {
  throw new Error(`Category not found: ${categorySlug}`);
}

for (const t of laserTreatments) {
  const doc = {
    name: t.name,
    slug: t.slug,
    categoryId: cat._id,
    categorySlug,
    shortDescription: t.shortDescription || "",
    price: t.price || "",
    hidePrice: Boolean(t.hidePrice) && !t.price,
    image: t.image || "",
    beforeImage: t.beforeImage || "",
    afterImage: t.afterImage || "",
    bookingUrl: t.bookingUrl || "",
    popular: Boolean(t.popular),
    isActive: true,
    order: t.order || 0,
    sections: t.sections || [],
  };

  if (t.price) {
    doc.hidePrice = false;
  }

  const result = await Treatment.updateOne(
    { categorySlug, slug: t.slug },
    { $set: doc },
    { upsert: true }
  );

  const action =
    result.upsertedCount > 0
      ? "inserted"
      : result.modifiedCount > 0
        ? "updated"
        : "unchanged";
  console.log(`${t.slug}: ${action}`);
}

const packagePricing = [
  {
    treatmentName: "Package of 6: Small Area Laser Hair Removal (Chin OR Upper Lip)",
    category: "Laser Hair Removal",
    price: "$350",
    order: 5,
  },
  {
    treatmentName:
      "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
    category: "Laser Hair Removal",
    price: "$479",
    order: 6,
  },
  {
    treatmentName:
      "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
    category: "Laser Hair Removal",
    price: "$599",
    order: 7,
  },
  {
    treatmentName: "Package of 6: Full Body Laser Hair Removal",
    category: "Laser Hair Removal",
    price: "$1200",
    order: 8,
  },
];

for (const item of packagePricing) {
  const result = await Pricing.updateOne(
    { category: item.category, treatmentName: item.treatmentName },
    { $set: { ...item, isActive: true } },
    { upsert: true }
  );
  const action =
    result.upsertedCount > 0
      ? "inserted"
      : result.modifiedCount > 0
        ? "updated"
        : "unchanged";
  console.log(`pricing: ${item.treatmentName} — ${action}`);
}

await mongoose.disconnect();
console.log("Done.");
