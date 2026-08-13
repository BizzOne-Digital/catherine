import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const uri = readFileSync(resolve(root, ".env.local"), "utf8")
  .match(/^MONGODB_URI=(.+)$/m)[1]
  .trim();

const Treatment = mongoose.model("Treatment", new mongoose.Schema({}, { strict: false }));
await mongoose.connect(uri);

const image = "/images/treatments/microneedling-main.png";
const result = await Treatment.updateOne(
  { categorySlug: "microneedling-skin-resurfacing", slug: "microneedling" },
  { $set: { image, "sections.$[hero].image": image } },
  { arrayFilters: [{ "hero.type": "hero" }] }
);

console.log("matched", result.matchedCount, "modified", result.modifiedCount);
await mongoose.disconnect();
