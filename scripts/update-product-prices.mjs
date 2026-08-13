/**
 * Update shop product prices from data/products.mjs (by slug).
 * Usage: node scripts/update-product-prices.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { products } from "../data/products.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const uri = readFileSync(resolve(root, ".env.local"), "utf8")
  .match(/^MONGODB_URI=(.+)$/m)[1]
  .trim();

const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

await mongoose.connect(uri);

for (const p of products) {
  const result = await Product.updateOne(
    { slug: p.slug },
    { $set: { price: p.price }, $unset: { salePrice: "" } }
  );
  console.log(
    `${p.slug}: matched ${result.matchedCount}, modified ${result.modifiedCount} → $${p.price}`
  );
}

await mongoose.disconnect();
console.log("Done.");
