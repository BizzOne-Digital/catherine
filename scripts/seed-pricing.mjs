/**
 * Seed / refresh the Pricing collection from data/pricing.mjs
 * Usage: npm run seed:pricing
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { pricingItems } from "../data/pricing.mjs";

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

const Pricing = mongoose.model(
  "Pricing",
  new mongoose.Schema(
    {
      treatmentName: String,
      category: String,
      price: String,
      duration: String,
      description: String,
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);

async function run() {
  await mongoose.connect(MONGODB_URI);
  await Pricing.deleteMany({});
  await Pricing.insertMany(
    pricingItems.map((item) => ({
      ...item,
      isActive: true,
    }))
  );
  console.log(`Seeded ${pricingItems.length} pricing items.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
