export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Botox vs. Fillers: What's the Difference?",
    slug: "botox-vs-fillers",
    category: "Education",
    excerpt:
      "Two of the most popular aesthetic treatments — but they do very different things. Here's everything you need to know about injectables to make the right choice for your goals.",
    content: `Botox and dermal fillers are often mentioned together, but they work in fundamentally different ways. Understanding the distinction helps you choose the right treatment — and set realistic expectations for your results.

Botox (and other neuromodulators) temporarily relax targeted facial muscles. This softens dynamic wrinkles caused by repeated expressions — forehead lines, crow's feet, and frown lines between the brows. Results typically appear within 7–14 days and last about 3–4 months.

Dermal fillers, on the other hand, restore volume and structure. Made from hyaluronic acid, they can enhance lips, define cheekbones, smooth deep folds, and rejuvenate under-eye hollows. Results are immediate, with final results visible once any swelling subsides.

Many clients benefit from both treatments as part of a comprehensive plan. Botox addresses movement-related lines, while fillers restore youthful volume. During your consultation at Lumina Medi Spa, we assess your anatomy, discuss your goals, and recommend a personalized approach — never a one-size-fits-all menu.

The key to natural-looking results with either treatment is precision, conservative dosing, and an artistic eye. Our philosophy is enhancement, not transformation — so you still look like yourself, only refreshed.`,
    featuredImage: "/images/blog-1.jpg",
    publishedAt: "2024-06-01",
    createdAt: "2024-06-01",
  },
  {
    _id: "2",
    title: "How to Prepare for Your First Injectable Treatment",
    slug: "prepare-first-injectable",
    category: "Tips & Advice",
    excerpt:
      "First time considering Botox or fillers? We walk you through everything you need to know before, during, and after your first appointment to ensure the best possible results.",
    content: `Your first injectable appointment should feel exciting, not intimidating. A little preparation goes a long way toward a smooth experience and beautiful results.

Before your visit, avoid blood-thinning supplements and medications when possible — including aspirin, ibuprofen, fish oil, and vitamin E — for about a week prior. This reduces the chance of bruising. Come with a clean face, free of makeup if you can, and bring a list of any medications or allergies.

During your consultation, be honest about your goals. Reference photos can help, but remember: your anatomy is unique. We'll discuss what's achievable for your face and recommend a conservative starting approach, especially for first-time clients.

After treatment, avoid lying down for 4 hours, skip strenuous exercise for 24 hours, and don't massage the treated area unless instructed. Mild redness or swelling is normal and usually resolves quickly.

Most importantly, trust the process. Injectables are as much art as science — and your first visit is the beginning of a relationship with your injector, not a one-time transaction. We're here to guide you every step of the way.`,
    featuredImage: "/images/blog-2.jpg",
    publishedAt: "2024-05-15",
    createdAt: "2024-05-15",
  },
  {
    _id: "3",
    title: "The Truth About Natural-Looking Aesthetic Results",
    slug: "natural-looking-results",
    category: "Philosophy",
    excerpt:
      "The best aesthetic treatments are the ones nobody notices. Our approach to medical aesthetics is rooted in enhancement — not transformation — and here's why that matters.",
    content: `There's a misconception that aesthetic medicine always leads to an "overdone" look. In reality, the vast majority of well-performed treatments are invisible — you simply notice that someone looks rested, refreshed, or subtly more youthful.

At Lumina Medi Spa, natural results aren't an accident. They're the outcome of deliberate choices: conservative product volumes, precise placement, and a deep respect for facial harmony and proportion.

We believe your expressions, asymmetries, and unique features are what make you recognizably you. Our job is to soften what bothers you — not erase what defines you.

This philosophy influences everything from our consultation style to our technique. We won't push treatments you don't need, and we'll always prioritize safety and longevity over trends.

When you leave our clinic, our goal is for you to feel confident — not self-conscious. The best compliment is when someone says, "You look amazing," without being able to pinpoint why.`,
    featuredImage: "/images/blog-3.jpg",
    publishedAt: "2024-05-01",
    createdAt: "2024-05-01",
  },
  {
    _id: "4",
    title: "IPL Photofacial: Is It Right for Your Skin?",
    slug: "ipl-photofacial-guide",
    category: "Treatments",
    excerpt:
      "Dealing with sunspots, redness, or uneven skin tone? IPL photofacial might be the solution you've been looking for. Here's our complete guide to the treatment.",
    content: `Intense Pulsed Light (IPL) therapy is one of the most versatile treatments in medical aesthetics. It uses broad-spectrum light to target pigment and vascular concerns — sunspots, freckles, redness, rosacea, and overall uneven tone.

IPL works by delivering light energy that is absorbed by melanin and hemoglobin in the skin. The body naturally clears the treated pigment over the following weeks, revealing a more even, luminous complexion.

Most clients need a series of 3–5 sessions spaced about four weeks apart for optimal results. Maintenance sessions once or twice a year help preserve your glow.

IPL is best suited for lighter skin tones (Fitzpatrick I–III) and is not recommended during active tanning or for very dark skin types. A thorough consultation includes a skin assessment to confirm you're a good candidate.

Downtime is minimal — you may experience mild redness for a few hours. Sun protection is essential before and after treatment. With consistent care, IPL can dramatically improve skin clarity and radiance without surgery or significant recovery.`,
    featuredImage: "/images/blog-4.jpg",
    publishedAt: "2024-04-20",
    createdAt: "2024-04-20",
  },
  {
    _id: "5",
    title: "Your Complete Guide to Lip Filler",
    slug: "lip-filler-guide",
    category: "Treatments",
    excerpt:
      "Natural-looking lip enhancement is an art form. From choosing the right amount of filler to aftercare and longevity — everything you need to know about lip fillers at Lumina.",
    content: `Lip filler remains one of our most requested treatments — and for good reason. When done well, it adds definition, hydration, and subtle volume that complements your natural lip shape.

Hyaluronic acid fillers are the gold standard for lips. They're soft, reversible, and provide immediate results. We typically start conservatively — often 0.5ml to 1ml — and build gradually over sessions if more volume is desired.

The goal is balance: enhancing the cupid's bow, defining the vermillion border, and restoring lost volume without creating an unnatural profile. Every face is different, and so is every ideal lip shape.

Swelling peaks at 24–48 hours and settles within a week. Avoid strenuous exercise, excessive heat, and pressure on the lips during this time. Results last approximately 12–18 months depending on the product and your metabolism.

If you're curious about lip filler, start with a consultation. Bring reference photos if helpful, but trust our assessment of what will look harmonious with your overall facial features.`,
    featuredImage: "/images/blog-5.jpg",
    publishedAt: "2024-04-05",
    createdAt: "2024-04-05",
  },
  {
    _id: "6",
    title: "Building Your Home Skincare Routine After Treatment",
    slug: "home-skincare-post-treatment",
    category: "Skincare",
    excerpt:
      "In-clinic treatments get you there — a good skincare routine keeps you there. Here are our medical-grade recommendations for maintaining and extending your results at home.",
    content: `Professional treatments deliver transformative results — but what you do at home every day determines how long those results last. A thoughtful skincare routine is the foundation of lasting radiance.

Start with the essentials: a gentle cleanser, daily SPF 30+, and a moisturizer suited to your skin type. Sun protection is non-negotiable, especially after IPL, laser, or any treatment targeting pigmentation.

Active ingredients like vitamin C (morning antioxidant), retinol (evening renewal), and hyaluronic acid (hydration) can complement in-clinic care. Introduce new products one at a time to monitor tolerance.

After injectable treatments, keep your routine simple for the first few days. After facials or peels, follow the specific aftercare instructions provided — your skin may be more sensitive temporarily.

We carry medical-grade products in our shop, curated by our clinical team. During your visit, ask for personalized recommendations based on your skin type, concerns, and treatment plan.

Consistency beats complexity. A simple routine you follow daily outperforms an elaborate regimen you abandon after a week.`,
    featuredImage: "/images/blog-6.jpg",
    publishedAt: "2024-03-20",
    createdAt: "2024-03-20",
  },
];

export function getFallbackPostBySlug(slug: string): BlogPost | null {
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}

export function getFallbackRelatedPosts(slug: string, category: string, limit = 3): BlogPost[] {
  return fallbackBlogPosts
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, limit);
}
