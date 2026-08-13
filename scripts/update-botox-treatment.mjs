/**
 * One-time sync for Botox or Dysport treatment images + benefits.
 * Usage: node scripts/update-botox-treatment.mjs
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

const Treatment = mongoose.model(
  "Treatment",
  new mongoose.Schema({}, { strict: false })
);

await mongoose.connect(readMongoUri());

const result = await Treatment.updateOne(
  { categorySlug: "injectables-wrinkle-relaxers", slug: "botox-or-dysport" },
  {
    $set: {
      image: "/images/treatments/botox-main.png",
      beforeImage: "/images/treatments/botox-before-after.png",
      afterImage: "__combined__",
      "sections.$[hero].image": "/images/treatments/botox-main.png",
    },
    $pull: {
      "sections.$[benefits].items": "No downtime required",
    },
  },
  {
    arrayFilters: [{ "hero.type": "hero" }, { "benefits.type": "benefits" }],
  }
);

console.log("Matched:", result.matchedCount, "Modified:", result.modifiedCount);
await mongoose.disconnect();
