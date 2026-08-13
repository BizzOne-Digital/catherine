/**
 * Seed script — populates MongoDB with all site content so it can be
 * managed through the admin panel.
 *
 * Usage: npm run seed
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { serviceCategories, treatmentsByCategory } from "./service-catalog.mjs";
import { products } from "../data/products.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// --- Read MONGODB_URI from .env.local ---
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

// --- Schemas (kept in sync with models/*.ts) ---
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  new mongoose.Schema(
    {
      title: String,
      slug: { type: String, unique: true },
      description: String,
      icon: { type: String, default: "Sparkles" },
      detailPage: { type: String, default: "" },
      order: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
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
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCategory" },
      categorySlug: String,
      shortDescription: String,
      price: String,
      hidePrice: { type: Boolean, default: false },
      image: { type: String, default: "" },
      beforeImage: { type: String, default: "" },
      afterImage: { type: String, default: "" },
      bookingUrl: { type: String, default: "" },
      popular: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
      sections: [
        {
          id: { type: String },
          type: { type: String },
          title: { type: String, default: "" },
          content: { type: String, default: "" },
          image: { type: String, default: "" },
          items: [{ type: String },],
          order: { type: Number, default: 0 },
        },
      ],
    },
    { timestamps: true }
  )
);

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
      image: { type: String, default: "/images/placeholder-product.jpg" },
      galleryImages: [String],
      stockStatus: { type: String, default: "in_stock" },
      isFeatured: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

// Pricing model removed — pricing lives on Treatment.price

const FAQ = mongoose.model(
  "FAQ",
  new mongoose.Schema(
    {
      question: String,
      answer: String,
      category: { type: String, default: "General" },
      order: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

// --- Data (categories + treatments from service-catalog.mjs) ---

const faqs = [
  { question: "What is a complimentary consultation and what does it include?", answer: "Your complimentary consultation is a relaxed, pressure-free conversation where we discuss your aesthetic goals, assess your skin and facial anatomy, and provide honest recommendations. We'll walk you through treatment options, expected results, pricing, and answer any questions you have. There is absolutely no obligation to proceed with any treatment.", category: "General", order: 1 },
  { question: "How do I know which treatment is right for me?", answer: "That's exactly what your consultation is for! Every person's anatomy, skin type, and goals are unique. We never recommend a one-size-fits-all approach — your personalized plan is based on a thorough assessment of your concerns and what will realistically achieve your goals safely and naturally.", category: "General", order: 2 },
  { question: "Is Botox safe? Will I look frozen?", answer: "When administered by a trained medical professional, Botox is extremely safe with decades of safety data. The 'frozen' look results from over-treatment — our philosophy is subtle, natural-looking results that preserve your expressions while smoothing lines. We use conservative dosing and precise placement to ensure you still look like yourself.", category: "Treatments", order: 3 },
  { question: "How long do results last?", answer: "Results vary by treatment: Botox typically lasts 3-4 months, dermal fillers last 12-18 months depending on the product and area, IPL photofacial results are long-lasting with proper sun protection, and laser hair removal provides permanent hair reduction over a series of sessions. We'll discuss expected longevity for your specific treatments at your consultation.", category: "Treatments", order: 4 },
  { question: "Is there downtime after treatments?", answer: "Most of our treatments have minimal to no downtime. Botox and fillers may cause minor redness or swelling for a few hours to a couple of days. IPL may cause temporary redness. We'll always advise you on what to expect and provide aftercare instructions. Many clients return to their daily activities immediately after treatment.", category: "Treatments", order: 5 },
  { question: "Are the treatments painful?", answer: "Most clients find our treatments very tolerable. Botox injections feel like tiny pinches. Filler treatments use topical numbing cream to maximize comfort. IPL has a snapping sensation. We prioritize your comfort throughout every treatment and take our time to ensure you feel at ease.", category: "Treatments", order: 6 },
  { question: "What qualifications does your injector have?", answer: "Our lead injector is a Registered Nurse (RN) with over 10 years of medical aesthetic experience, including advanced training in injectables, laser therapy, and body contouring. All treatments are performed under medical oversight, adhering to the highest safety standards in Ontario.", category: "General", order: 7 },
  { question: "How soon will I see results?", answer: "Results timeline varies by treatment: Botox takes 7-14 days for full effect, dermal fillers show results immediately (with any swelling subsiding within days), IPL shows progressive improvement over several weeks, and body sculpting results develop over 4-12 weeks as the body naturally processes treated fat cells or builds muscle.", category: "Treatments", order: 8 },
  { question: "Do you offer packages or memberships?", answer: "Yes! We offer package pricing for laser hair removal series and body sculpting programs. Ask about our loyalty program during your consultation. Package pricing represents significant savings compared to individual sessions.", category: "Pricing", order: 9 },
  { question: "What is your cancellation policy?", answer: "We require 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a booking fee. We understand that life happens — please reach out as early as possible if you need to change your appointment and we'll always do our best to accommodate you.", category: "Booking", order: 10 },
  { question: "Do you offer financing or monthly payment options?", answer: "Yes. Lumina Medi Spa offers patient financing through Medicard by iFinance. Eligible clients can apply through a secure online application. Financing approval, terms and payments are managed directly by Medicard/iFinance. [Apply for financing](https://apply.medicard.com/25759)", category: "Pricing", order: 11 },
];


// --- Run ---
async function seed() {
  console.log("Connecting to", MONGODB_URI, "...");
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  // Drop the reviews collection entirely (feature removed)
  const collections = await db.listCollections({ name: "reviews" }).toArray();
  if (collections.length) {
    await db.dropCollection("reviews");
    console.log("Dropped 'reviews' collection.");
  } else {
    console.log("'reviews' collection not present — nothing to drop.");
  }

  // Clear legacy collections no longer used in admin
  for (const name of ["services", "pricings", "treatments", "servicecategories"]) {
    const exists = await db.listCollections({ name }).toArray();
    if (exists.length) {
      await db.dropCollection(name);
      console.log(`Dropped '${name}' collection.`);
    }
  }

  await ServiceCategory.deleteMany({});
  const insertedCategories = await ServiceCategory.insertMany(
    serviceCategories.map((c) => ({ ...c, isActive: true, detailPage: c.detailPage || "" }))
  );
  console.log(`Seeded ${insertedCategories.length} documents into 'servicecategories'.`);

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
  console.log(`Seeded ${treatmentDocs.length} documents into 'treatments'.`);

  // Also seed CMS pages if script available
  try {
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync(process.execPath, [resolve(root, "scripts", "seed-pages.mjs")], {
      stdio: "inherit",
      env: process.env,
    });
    if (r.status !== 0) console.warn("seed-pages exited with", r.status);
  } catch (e) {
    console.warn("Could not run seed-pages:", e);
  }

  const jobs = [
    ["products", Product, products],
    ["faqs", FAQ, faqs],

  ];

  for (const [name, Model, data] of jobs) {
    await Model.deleteMany({});
    await Model.insertMany(data);
    console.log(`Seeded ${data.length} documents into '${name}'.`);
  }

  await mongoose.disconnect();
  console.log("\nDone! Categories & treatments are in MongoDB and manageable via Admin → Categories / Treatments.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
