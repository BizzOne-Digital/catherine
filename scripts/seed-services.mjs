/**
 * Reseed categories + treatments from service-catalog.mjs (does not wipe products).
 * Usage: npm run seed:services
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { serviceCategories, treatmentsByCategory } from "./service-catalog.mjs";

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

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  new mongoose.Schema(
    {
      title: String,
      slug: { type: String, unique: true },
      description: String,
      icon: String,
      detailPage: String,
      order: Number,
      isActive: Boolean,
    },
    { timestamps: true }
  )
);

const Treatment = mongoose.model(
  "Treatment",
  new mongoose.Schema(
    {
      name: String,
      slug: String,
      categoryId: mongoose.Schema.Types.ObjectId,
      categorySlug: String,
      shortDescription: String,
      price: String,
      hidePrice: Boolean,
      image: String,
      beforeImage: String,
      afterImage: String,
      bookingUrl: String,
      popular: Boolean,
      isActive: Boolean,
      order: Number,
      sections: Array,
    },
    { timestamps: true }
  )
);

async function run() {
  await mongoose.connect(MONGODB_URI);

  await ServiceCategory.deleteMany({});
  const insertedCategories = await ServiceCategory.insertMany(
    serviceCategories.map((c) => ({ ...c, isActive: true, detailPage: c.detailPage || "" }))
  );
  console.log(`Seeded ${insertedCategories.length} categories.`);

  const categoryBySlug = Object.fromEntries(insertedCategories.map((c) => [c.slug, c]));

  const treatmentDocs = [];
  for (const [slug, list] of Object.entries(treatmentsByCategory)) {
    const cat = categoryBySlug[slug];
    if (!cat) continue;
    for (const t of list) {
      treatmentDocs.push({
        name: t.name,
        slug: t.slug,
        categoryId: cat._id,
        categorySlug: cat.slug,
        shortDescription: t.shortDescription || "",
        price: t.price || "",
        hidePrice: Boolean(t.hidePrice),
        image: t.image || "",
        beforeImage: t.beforeImage || "",
        afterImage: t.afterImage || "",
        bookingUrl: t.bookingUrl || "",
        popular: Boolean(t.popular),
        isActive: true,
        order: t.order || 0,
        sections: t.sections || [],
      });
    }
  }

  await Treatment.deleteMany({});
  await Treatment.insertMany(treatmentDocs);
  console.log(`Seeded ${treatmentDocs.length} treatments.`);

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
