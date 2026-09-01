/**
 * Sync product image URLs to MongoDB (images only — descriptions unchanged).
 * Usage: node scripts/sync-product-images.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { products } from "../data/products.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readMongoUri() {
  const envPath = resolve(root, ".env.local");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^MONGODB_URI=(.+)$/);
    if (match) return match[1].trim();
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));
await mongoose.connect(readMongoUri());

for (const p of products) {
  if (!p.image || p.image.includes("placeholder")) continue;
  const result = await Product.updateOne({ slug: p.slug }, { $set: { image: p.image } });
  if (result.matchedCount === 0) {
    console.warn(`no product: ${p.slug}`);
  } else {
    console.log(`${p.slug} → ${p.image}`);
  }
}

await mongoose.disconnect();
console.log("Done.");
