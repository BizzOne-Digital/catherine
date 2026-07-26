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
import { buildSections } from "./treatment-content.mjs";

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
      image: { type: String, default: "" },
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
          items: [{ type: String }],
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

const GalleryItem = mongoose.model(
  "GalleryItem",
  new mongoose.Schema(
    {
      title: String,
      category: String,
      image: String,
      description: String,
      isFeatured: { type: Boolean, default: false },
      order: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);

const BlogPost = mongoose.model(
  "BlogPost",
  new mongoose.Schema(
    {
      title: String,
      slug: { type: String, unique: true },
      category: String,
      excerpt: String,
      content: String,
      featuredImage: { type: String, default: "/images/placeholder-blog.jpg" },
      status: { type: String, default: "published" },
      publishedAt: Date,
    },
    { timestamps: true }
  )
);

// --- Data ---
const serviceCategories = [
  {
    title: "Injectables & Wrinkle Relaxers",
    slug: "injectables-wrinkle-relaxers",
    description: "Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.",
    icon: "Sparkles",
    order: 1,
  },
  {
    title: "Dermal Fillers & Skin Boosters",
    slug: "dermal-fillers-skin-boosters",
    description: "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
    icon: "Heart",
    order: 2,
  },
  {
    title: "Facials & Skin Health",
    slug: "facials-skin-health",
    description: "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
    icon: "Droplets",
    order: 3,
  },
  {
    title: "Microneedling & Skin Resurfacing",
    slug: "microneedling-skin-resurfacing",
    description: "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
    icon: "Activity",
    order: 4,
  },
  {
    title: "Laser Hair Removal",
    slug: "laser-hair-removal",
    description: "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
    icon: "Zap",
    order: 5,
  },
  {
    title: "Body Sculpting & Contouring",
    slug: "body-sculpting-contouring",
    description: "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
    icon: "Activity",
    order: 6,
  },
];

/** Treatments keyed by category slug — price only (no duration) */
const treatmentsByCategory = {
  "injectables-wrinkle-relaxers": [
    { name: "Botox", slug: "botox", shortDescription: "Smooth dynamic lines on the forehead, frown and crow's feet.", price: "From $11–$14 / unit", image: "/images/treatments/botox.jpg", popular: true, order: 1 },
    { name: "Dysport & Nuceiva", slug: "dysport-nuceiva", shortDescription: "Alternative neuromodulators for fast-acting, natural smoothing.", price: "From $11–$14 / unit", image: "/images/treatments/dysport.jpg", order: 2 },
    { name: "Daxxify", slug: "daxxify", shortDescription: "Long-lasting neuromodulator with results up to 6 months.", price: "From $16–$18 / unit", image: "/images/treatments/daxxify.jpg", order: 3 },
  ],
  "dermal-fillers-skin-boosters": [
    { name: "Dermal Fillers", slug: "dermal-fillers", shortDescription: "Restore volume and contour cheeks, jawline and chin.", price: "From $700–$1,200 / syringe", image: "/images/treatments/dermal-fillers.jpg", order: 1 },
    { name: "Lip Filler", slug: "lip-filler", shortDescription: "Hydrate, define and gently enhance the lips.", price: "From $650–$900 / syringe", image: "/images/treatments/lip-filler.jpg", popular: true, order: 2 },
    { name: "Skin Booster Injections", slug: "skin-boosters", shortDescription: "Profhilo & Juvéderm SkinVive for deep hydration and glow.", price: "From $450–$650 / session", image: "/images/treatments/skin-boosters.jpg", order: 3 },
  ],
  "facials-skin-health": [
    { name: "Purifying Deep Clean Facial", slug: "purifying-facial", shortDescription: "Deep cleanse with custom LED light therapy for radiant skin.", price: "From $145", image: "/images/treatments/purifying-facial.jpg", popular: true, order: 1 },
    { name: "Signature Relaxation Facial", slug: "relaxation-facial", shortDescription: "Expert skincare meets a soothing face and neck massage.", price: "From $160", image: "/images/treatments/relaxation-facial.jpg", order: 2 },
    { name: "Chemical Peel", slug: "chemical-peel", shortDescription: "Resurface for brighter, clearer, more even-toned skin.", price: "From $150", image: "/images/treatments/chemical-peel.jpg", order: 3 },
  ],
  "microneedling-skin-resurfacing": [
    { name: "Microneedling", slug: "microneedling", shortDescription: "Collagen-stimulating treatment for texture, pores and scars.", price: "From $250", image: "/images/treatments/microneedling.jpg", popular: true, order: 1 },
    { name: "IPL Photofacial", slug: "ipl-photofacial", shortDescription: "Target sun damage, redness and uneven pigmentation.", price: "From $250", image: "/images/treatments/ipl-photofacial.jpg", order: 2 },
  ],
  "laser-hair-removal": [
    { name: "Laser Hair Removal — Small Area", slug: "small-area", shortDescription: "Lip, chin, underarms and other small areas.", price: "From $60–$130 / session", image: "/images/treatments/laser-face.jpg", order: 1 },
    { name: "Laser Hair Removal — Large Area", slug: "large-area", shortDescription: "Full legs, full arms, back or Brazilian.", price: "From $230–$330 / session", image: "/images/treatments/laser-legs.jpg", popular: true, order: 2 },
    { name: "Full Body Laser Hair Removal", slug: "full-body", shortDescription: "All major body areas in one session (excludes back).", price: "From $550 / session", image: "/images/treatments/laser-full-body.jpg", order: 3 },
  ],
  "body-sculpting-contouring": [
    { name: "Body Sculpting with HIFEM", slug: "body-sculpting-hifem", shortDescription: "Build muscle and tone a target area — no downtime.", price: "From $300 / session", image: "/images/treatments/emsculpt.jpg", popular: true, order: 1 },
  ],
};

const products = [
  { name: "Hydrating HA Serum", slug: "hydrating-ha-serum", category: "Serums", shortDescription: "Intense hydration with triple-weight hyaluronic acid for all skin types", description: "A deeply hydrating serum featuring three molecular weights of hyaluronic acid to hydrate every layer of the skin. Plumps fine lines, restores bounce, and leaves skin dewy and supple. Suitable for all skin types, including sensitive skin.", ingredients: "Hyaluronic Acid (Low, Medium, High MW), Glycerin, Panthenol, Aloe Vera", howToUse: "Apply 2-3 drops to damp skin morning and evening before moisturizer.", price: 85, image: "/images/product-1.jpg", isFeatured: true },
  { name: "Vitamin C Brightening Complex", slug: "vitamin-c-brightening-complex", category: "Serums", shortDescription: "20% L-Ascorbic acid serum for luminous, even-toned skin", description: "A potent antioxidant serum with 20% L-Ascorbic acid, vitamin E, and ferulic acid. Brightens dull skin, fades dark spots, and protects against environmental damage for a radiant, even complexion.", ingredients: "L-Ascorbic Acid 20%, Vitamin E, Ferulic Acid", howToUse: "Apply 3-4 drops to clean, dry skin every morning. Follow with SPF.", price: 95, image: "/images/product-2.jpg", isFeatured: true },
  { name: "Peptide Renewal Cream", slug: "peptide-renewal-cream", category: "Moisturizers", shortDescription: "Advanced neuropeptide moisturizer targeting fine lines and firmness", description: "A luxurious anti-aging moisturizer powered by advanced neuropeptides and ceramides. Visibly firms skin, softens expression lines, and strengthens the moisture barrier overnight.", ingredients: "Neuropeptides, Ceramides, Squalane, Shea Butter", howToUse: "Massage a pearl-sized amount onto face and neck every evening.", price: 110, image: "/images/product-3.jpg", isFeatured: true },
  { name: "SPF 50+ Daily Shield", slug: "spf-50-daily-shield", category: "Sun Care", shortDescription: "Elegant broad-spectrum sunscreen with a sheer, non-greasy finish", description: "A weightless broad-spectrum SPF 50+ sunscreen that layers beautifully under makeup. Protects against UVA/UVB damage — the number one cause of premature aging — with a sheer, non-greasy finish.", ingredients: "Zinc Oxide, Niacinamide, Vitamin E", howToUse: "Apply generously as the last step of your morning routine. Reapply every 2 hours of sun exposure.", price: 65, image: "/images/product-4.jpg" },
  { name: "Retinol Resurfacing Serum", slug: "retinol-resurfacing-serum", category: "Serums", shortDescription: "Encapsulated retinol for overnight skin renewal and refinement", description: "Encapsulated retinol delivers powerful skin renewal with minimal irritation. Smooths texture, refines pores, and softens fine lines while you sleep. Ideal for building a long-term anti-aging routine.", ingredients: "Encapsulated Retinol 0.5%, Bakuchiol, Niacinamide, Squalane", howToUse: "Apply a pea-sized amount at night, 2-3 times per week, gradually increasing frequency.", price: 90, salePrice: 75, image: "/images/product-5.jpg" },
  { name: "Niacinamide Pore Refiner", slug: "niacinamide-pore-refiner", category: "Treatments", shortDescription: "10% niacinamide concentrate minimizing pores and controlling shine", description: "A 10% niacinamide and zinc concentrate that visibly tightens pores, balances oil production, and evens skin tone. Lightweight and layerable with any routine.", ingredients: "Niacinamide 10%, Zinc PCA, Hyaluronic Acid", howToUse: "Apply a few drops morning and evening after cleansing, before moisturizer.", price: 70, image: "/images/product-6.jpg" },
  { name: "Post-Treatment Repair Balm", slug: "post-treatment-repair-balm", category: "Treatments", shortDescription: "Soothing barrier recovery cream for post-procedure skin", description: "Specifically formulated for skin recovering from professional treatments — lasers, peels, microneedling, and injectables. Calms redness, restores the barrier, and accelerates healing.", ingredients: "Centella Asiatica, Ceramides, Panthenol, Madecassoside", howToUse: "Apply a thin layer to treated areas 2-3 times daily or as directed by your clinician.", price: 55, stockStatus: "limited", image: "/images/product-7.jpg" },
  { name: "AHA/BHA Exfoliating Toner", slug: "aha-bha-exfoliating-toner", category: "Toners", shortDescription: "Gentle chemical exfoliant for smooth, refined skin texture", description: "A balanced blend of glycolic, lactic, and salicylic acids that gently dissolves dead skin cells, unclogs pores, and refines texture — revealing smoother, brighter skin with regular use.", ingredients: "Glycolic Acid, Lactic Acid, Salicylic Acid, Witch Hazel", howToUse: "Sweep over clean skin with a cotton pad 2-3 evenings per week. Avoid using with retinol on the same night.", price: 60, image: "/images/product-8.jpg" },
];

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

const galleryItems = [
  { title: "Treatment Room", category: "Clinic", image: "/images/gallery/gallery-1.jpg", description: "Our serene treatment suite", order: 1, isFeatured: true },
  { title: "Skincare Collection", category: "Clinic", image: "/images/gallery/gallery-2.jpg", description: "Medical-grade skincare products", order: 2 },
  { title: "Facial Treatment", category: "Treatments", image: "/images/gallery/gallery-3.jpg", description: "Signature facial experience", order: 3, isFeatured: true },
  { title: "Skin Analysis", category: "Treatments", image: "/images/gallery/gallery-4.jpg", description: "Personalized skin assessment", order: 4 },
  { title: "Body Contouring", category: "Treatments", image: "/images/gallery/gallery-5.jpg", description: "Advanced body sculpting session", order: 5 },
  { title: "Natural Enhancement", category: "Transformations", image: "/images/gallery/gallery-6.jpg", description: "Subtle, natural-looking results", order: 6, isFeatured: true },
  { title: "Glow Restoration", category: "Transformations", image: "/images/gallery/gallery-7.jpg", description: "Radiant skin transformation", order: 7 },
  { title: "Clinic Interior", category: "Clinic", image: "/images/gallery/gallery-8.jpg", description: "Luxury med spa environment", order: 8 },
  { title: "Wellness Event", category: "Events", image: "/images/gallery/gallery-9.jpg", description: "Community wellness gathering", order: 9 },
];

const blogPosts = [
  {
    title: "Botox vs. Fillers: What's the Difference?",
    slug: "botox-vs-fillers",
    category: "Education",
    excerpt: "Two of the most popular aesthetic treatments — but they do very different things. Here's everything you need to know about injectables to make the right choice for your goals.",
    content: `Botox and dermal fillers are often mentioned together, but they work in fundamentally different ways. Understanding the distinction helps you choose the right treatment — and set realistic expectations for your results.

Botox (and other neuromodulators) temporarily relax targeted facial muscles. This softens dynamic wrinkles caused by repeated expressions — forehead lines, crow's feet, and frown lines between the brows. Results typically appear within 7–14 days and last about 3–4 months.

Dermal fillers, on the other hand, restore volume and structure. Made from hyaluronic acid, they can enhance lips, define cheekbones, smooth deep folds, and rejuvenate under-eye hollows. Results are immediate, with final results visible once any swelling subsides.

Many clients benefit from both treatments as part of a comprehensive plan. Botox addresses movement-related lines, while fillers restore youthful volume. During your consultation at Lumina Medi Spa, we assess your anatomy, discuss your goals, and recommend a personalized approach — never a one-size-fits-all menu.

The key to natural-looking results with either treatment is precision, conservative dosing, and an artistic eye. Our philosophy is enhancement, not transformation — so you still look like yourself, only refreshed.`,
    status: "published",
    featuredImage: "/images/blog-1.jpg",
    publishedAt: new Date("2024-06-01"),
  },
  {
    title: "How to Prepare for Your First Injectable Treatment",
    slug: "prepare-first-injectable",
    category: "Tips & Advice",
    excerpt: "First time considering Botox or fillers? We walk you through everything you need to know before, during, and after your first appointment to ensure the best possible results.",
    content: `Your first injectable appointment should feel exciting, not intimidating. A little preparation goes a long way toward a smooth experience and beautiful results.

Before your visit, avoid blood-thinning supplements and medications when possible — including aspirin, ibuprofen, fish oil, and vitamin E — for about a week prior. This reduces the chance of bruising. Come with a clean face, free of makeup if you can, and bring a list of any medications or allergies.

During your consultation, be honest about your goals. Reference photos can help, but remember: your anatomy is unique. We'll discuss what's achievable for your face and recommend a conservative starting approach, especially for first-time clients.

After treatment, avoid lying down for 4 hours, skip strenuous exercise for 24 hours, and don't massage the treated area unless instructed. Mild redness or swelling is normal and usually resolves quickly.

Most importantly, trust the process. Injectables are as much art as science — and your first visit is the beginning of a relationship with your injector, not a one-time transaction. We're here to guide you every step of the way.`,
    status: "published",
    featuredImage: "/images/blog-2.jpg",
    publishedAt: new Date("2024-05-15"),
  },
  {
    title: "The Truth About Natural-Looking Aesthetic Results",
    slug: "natural-looking-results",
    category: "Philosophy",
    excerpt: "The best aesthetic treatments are the ones nobody notices. Our approach to medical aesthetics is rooted in enhancement — not transformation — and here's why that matters.",
    content: `There's a misconception that aesthetic medicine always leads to an "overdone" look. In reality, the vast majority of well-performed treatments are invisible — you simply notice that someone looks rested, refreshed, or subtly more youthful.

At Lumina Medi Spa, natural results aren't an accident. They're the outcome of deliberate choices: conservative product volumes, precise placement, and a deep respect for facial harmony and proportion.

We believe your expressions, asymmetries, and unique features are what make you recognizably you. Our job is to soften what bothers you — not erase what defines you.

This philosophy influences everything from our consultation style to our technique. We won't push treatments you don't need, and we'll always prioritize safety and longevity over trends.

When you leave our clinic, our goal is for you to feel confident — not self-conscious. The best compliment is when someone says, "You look amazing," without being able to pinpoint why.`,
    status: "published",
    featuredImage: "/images/blog-3.jpg",
    publishedAt: new Date("2024-05-01"),
  },
  {
    title: "IPL Photofacial: Is It Right for Your Skin?",
    slug: "ipl-photofacial-guide",
    category: "Treatments",
    excerpt: "Dealing with sunspots, redness, or uneven skin tone? IPL photofacial might be the solution you've been looking for. Here's our complete guide to the treatment.",
    content: `Intense Pulsed Light (IPL) therapy is one of the most versatile treatments in medical aesthetics. It uses broad-spectrum light to target pigment and vascular concerns — sunspots, freckles, redness, rosacea, and overall uneven tone.

IPL works by delivering light energy that is absorbed by melanin and hemoglobin in the skin. The body naturally clears the treated pigment over the following weeks, revealing a more even, luminous complexion.

Most clients need a series of 3–5 sessions spaced about four weeks apart for optimal results. Maintenance sessions once or twice a year help preserve your glow.

IPL is best suited for lighter skin tones (Fitzpatrick I–III) and is not recommended during active tanning or for very dark skin types. A thorough consultation includes a skin assessment to confirm you're a good candidate.

Downtime is minimal — you may experience mild redness for a few hours. Sun protection is essential before and after treatment. With consistent care, IPL can dramatically improve skin clarity and radiance without surgery or significant recovery.`,
    status: "published",
    featuredImage: "/images/blog-4.jpg",
    publishedAt: new Date("2024-04-20"),
  },
  {
    title: "Your Complete Guide to Lip Filler",
    slug: "lip-filler-guide",
    category: "Treatments",
    excerpt: "Natural-looking lip enhancement is an art form. From choosing the right amount of filler to aftercare and longevity — everything you need to know about lip fillers at Lumina.",
    content: `Lip filler remains one of our most requested treatments — and for good reason. When done well, it adds definition, hydration, and subtle volume that complements your natural lip shape.

Hyaluronic acid fillers are the gold standard for lips. They're soft, reversible, and provide immediate results. We typically start conservatively — often 0.5ml to 1ml — and build gradually over sessions if more volume is desired.

The goal is balance: enhancing the cupid's bow, defining the vermillion border, and restoring lost volume without creating an unnatural profile. Every face is different, and so is every ideal lip shape.

Swelling peaks at 24–48 hours and settles within a week. Avoid strenuous exercise, excessive heat, and pressure on the lips during this time. Results last approximately 12–18 months depending on the product and your metabolism.

If you're curious about lip filler, start with a consultation. Bring reference photos if helpful, but trust our assessment of what will look harmonious with your overall facial features.`,
    status: "published",
    featuredImage: "/images/blog-5.jpg",
    publishedAt: new Date("2024-04-05"),
  },
  {
    title: "Building Your Home Skincare Routine After Treatment",
    slug: "home-skincare-post-treatment",
    category: "Skincare",
    excerpt: "In-clinic treatments get you there — a good skincare routine keeps you there. Here are our medical-grade recommendations for maintaining and extending your results at home.",
    content: `Professional treatments deliver transformative results — but what you do at home every day determines how long those results last. A thoughtful skincare routine is the foundation of lasting radiance.

Start with the essentials: a gentle cleanser, daily SPF 30+, and a moisturizer suited to your skin type. Sun protection is non-negotiable, especially after IPL, laser, or any treatment targeting pigmentation.

Active ingredients like vitamin C (morning antioxidant), retinol (evening renewal), and hyaluronic acid (hydration) can complement in-clinic care. Introduce new products one at a time to monitor tolerance.

After injectable treatments, keep your routine simple for the first few days. After facials or peels, follow the specific aftercare instructions provided — your skin may be more sensitive temporarily.

We carry medical-grade products in our shop, curated by our clinical team. During your visit, ask for personalized recommendations based on your skin type, concerns, and treatment plan.

Consistency beats complexity. A simple routine you follow daily outperforms an elaborate regimen you abandon after a week.`,
    status: "published",
    featuredImage: "/images/blog-6.jpg",
    publishedAt: new Date("2024-03-20"),
  },
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
  const insertedCategories = await ServiceCategory.insertMany(serviceCategories);
  console.log(`Seeded ${insertedCategories.length} documents into 'servicecategories'.`);

  const categoryBySlug = Object.fromEntries(insertedCategories.map((c) => [c.slug, c]));
  const treatmentDocs = [];
  for (const [slug, list] of Object.entries(treatmentsByCategory)) {
    const cat = categoryBySlug[slug];
    if (!cat) continue;
    for (const t of list) {
      treatmentDocs.push({
        ...t,
        categoryId: cat._id,
        categorySlug: cat.slug,
        isActive: true,
        sections: buildSections(cat.slug, t.slug, t.image || ""),
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
    ["galleryitems", GalleryItem, galleryItems],
    ["blogposts", BlogPost, blogPosts],
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
