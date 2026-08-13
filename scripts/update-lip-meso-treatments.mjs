/**
 * Sync Lip Filler before/after gallery + Mesotherapy main image.
 * Usage: node scripts/update-lip-meso-treatments.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readMongoUri() {
  for (const line of readFileSync(resolve(root, ".env.local"), "utf8").split(/\r?\n/)) {
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

const lip = await Treatment.updateOne(
  { categorySlug: "dermal-fillers-skin-boosters", slug: "lip-filler" },
  {
    $set: {
      beforeImage: "",
      afterImage: "",
    },
  }
);

const meso = await Treatment.updateOne(
  { categorySlug: "dermal-fillers-skin-boosters", slug: "nctf-135-mesotherapy" },
  {
    $set: {
      image: "/images/treatments/mesotherapy-main.png",
      "sections.$[hero].image": "/images/treatments/mesotherapy-main.png",
    },
  },
  { arrayFilters: [{ "hero.type": "hero" }] }
);

console.log("Lip filler — matched:", lip.matchedCount, "modified:", lip.modifiedCount);
console.log("Mesotherapy — matched:", meso.matchedCount, "modified:", meso.modifiedCount);
await mongoose.disconnect();
