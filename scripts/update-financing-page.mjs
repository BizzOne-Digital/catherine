/**
 * Update financing page hero — remove Beautifi, apply Medicard tagline.
 * Usage: node scripts/update-financing-page.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const uri = readFileSync(resolve(root, ".env.local"), "utf8")
  .match(/^MONGODB_URI=(.+)$/m)[1]
  .trim();

const SitePage = mongoose.model("SitePage", new mongoose.Schema({}, { strict: false }));

const heroTitle = "Care Today, Pay Over Time|with Medicard by iFinance";
const heroContent =
  "We believe aesthetic treatments should be accessible. Lumina Medi Spa offers financing through Medicard by iFinance, so eligible clients can spread the cost of treatment over manageable monthly payments.";

await mongoose.connect(uri);

const page = await SitePage.findOne({ slug: "financing" }).lean();
if (!page) {
  console.log("No financing page in CMS — fallback copy on site will be used.");
} else {
  const sections = (page.sections || []).map((section) => {
    if (section.key !== "hero" && section.type !== "hero") return section;
    const title = (section.title || "")
      .replace(/\s*beautifi\s*/gi, " ")
      .replace(/\s*with\s+with\s+/gi, " with ")
      .replace(/\|\s*with\s*$/i, "|with Medicard by iFinance")
      .trim();

    return {
      ...section,
      subtitle: "Medicard by iFinance",
      title: title.toLowerCase().includes("beautifi") ? heroTitle : heroTitle,
      content: heroContent,
    };
  });

  const result = await SitePage.updateOne(
    { slug: "financing" },
    { $set: { sections } }
  );
  console.log("Financing CMS page updated:", result.modifiedCount);
}

await mongoose.disconnect();
