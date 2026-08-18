/**
 * Sync treatment images + hero sections from service-catalog.mjs
 * Usage: node scripts/sync-treatment-images.mjs
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

const Treatment = mongoose.model("Treatment", new mongoose.Schema({}, { strict: false }));
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  new mongoose.Schema({}, { strict: false })
);

await mongoose.connect(readMongoUri());

for (const [categorySlug, list] of Object.entries(treatmentsByCategory)) {
  const cat = await ServiceCategory.findOne({ slug: categorySlug }).lean();
  if (!cat) {
    console.warn(`skip category (not found): ${categorySlug}`);
    continue;
  }

  for (const t of list) {
    const sections = (t.sections || []).map((section) =>
      section.type === "hero" && t.image
        ? { ...section, image: t.image }
        : section
    );

    const doc = {
      name: t.name,
      slug: t.slug,
      categoryId: cat._id,
      categorySlug,
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
      sections,
    };

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
    console.log(`${categorySlug}/${t.slug}: ${action} → ${t.image}`);
  }
}

await mongoose.disconnect();
console.log("Done.");
