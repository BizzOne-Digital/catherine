/**
 * Sync pricing updates + HIFEM muscle toning treatments.
 * Usage: node scripts/update-pricing-hifem.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { pricingItems } from "../data/pricing.mjs";
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

const Pricing = mongoose.model("Pricing", new mongoose.Schema({}, { strict: false }));
const Treatment = mongoose.model("Treatment", new mongoose.Schema({}, { strict: false }));
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  new mongoose.Schema({}, { strict: false })
);

await mongoose.connect(readMongoUri());

// Remove old Package of 3 muscle toning entries if present
const removed = await Pricing.deleteMany({
  category: "Muscle Toning",
  treatmentName: {
    $in: [
      "Package of 3: Muscle Toning with HIFEM (Single Area)",
      "Package of 3: Muscle Toning with HIFEM (Two Areas)",
    ],
  },
});
console.log(`Removed ${removed.deletedCount} legacy muscle toning pricing rows.`);

for (const item of pricingItems) {
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

// Fix legacy laser pricing titles (or → OR)
const laserTitleFixes = [
  [
    "Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, or Bikini)",
    "Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
  ],
  [
    "Large Area Laser Hair Removal (Full Legs, Back, Chest, or Brazilian)",
    "Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
  ],
  [
    "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, or Bikini)",
    "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
  ],
  [
    "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, or Brazilian)",
    "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
  ],
];

for (const [oldName, newName] of laserTitleFixes) {
  const r = await Pricing.updateOne(
    { category: "Laser Hair Removal", treatmentName: oldName },
    { $set: { treatmentName: newName } }
  );
  if (r.modifiedCount) console.log(`pricing rename: ${oldName} → ${newName}`);
}

const cat = await ServiceCategory.findOne({ slug: "body-sculpting-contouring" }).lean();
if (!cat) throw new Error("body-sculpting-contouring category not found");

for (const t of treatmentsByCategory["body-sculpting-contouring"] || []) {
  const doc = {
    name: t.name,
    slug: t.slug,
    categoryId: cat._id,
    categorySlug: "body-sculpting-contouring",
    shortDescription: t.shortDescription || "",
    price: t.price || "",
    hidePrice: t.price ? false : Boolean(t.hidePrice),
    image: t.image || "",
    beforeImage: t.beforeImage || "",
    afterImage: t.afterImage || "",
    bookingUrl: t.bookingUrl || "",
    popular: Boolean(t.popular),
    isActive: true,
    order: t.order || 0,
    sections: t.sections || [],
  };

  const result = await Treatment.updateOne(
    { categorySlug: "body-sculpting-contouring", slug: t.slug },
    { $set: doc },
    { upsert: true }
  );
  const action =
    result.upsertedCount > 0
      ? "inserted"
      : result.modifiedCount > 0
        ? "updated"
        : "unchanged";
  console.log(`treatment ${t.slug}: ${action}`);
}

// Update laser treatment display names
const laserTreatments = treatmentsByCategory["laser-hair-removal"] || [];
for (const t of laserTreatments) {
  const result = await Treatment.updateOne(
    { categorySlug: "laser-hair-removal", slug: t.slug },
    { $set: { name: t.name } }
  );
  if (result.modifiedCount) console.log(`laser name updated: ${t.slug}`);
}

await mongoose.disconnect();
console.log("Done.");
