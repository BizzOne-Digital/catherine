/**
 * Seed / refresh retail products only (does not wipe treatments).
 * Usage: npm run seed:products
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { products } from "../data/products.mjs";

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

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: String,
      slug: { type: String, unique: true },
      category: String,
      description: String,
      shortDescription: String,
      ingredients: String,
      howToUse: String,
      price: Number,
      salePrice: Number,
      image: String,
      galleryImages: [String],
      stockStatus: { type: String, default: "in_stock" },
      isFeatured: Boolean,
      isActive: Boolean,
    },
    { timestamps: true }
  )
);

async function run() {
  await mongoose.connect(MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
