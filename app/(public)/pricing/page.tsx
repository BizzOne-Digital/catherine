"use client";
import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Syringe, Sparkles, ScanFace } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PricingItem {
  _id: string;
  treatmentName: string;
  category: string;
  price: string;
  duration?: string;
  description?: string;
}

interface CategoryCard {
  key: string;
  title: string;
  description: string;
  startingPrice: string;
  icon: ReactNode;
  filterCategory: string;
}

const fallbackPricing: PricingItem[] = [
  { _id: "1", treatmentName: "Botox — per unit", category: "Injectables", price: "$10/unit", duration: "30-45 min" },
  { _id: "2", treatmentName: "Botox — Full Forehead", category: "Injectables", price: "From $200", duration: "30-45 min" },
  { _id: "3", treatmentName: "Botox — Crow's Feet", category: "Injectables", price: "From $180", duration: "30-45 min" },
  { _id: "4", treatmentName: "Botox — Frown Lines (11s)", category: "Injectables", price: "From $200", duration: "30-45 min" },
  { _id: "5", treatmentName: "Botox — Lip Flip", category: "Injectables", price: "From $80", duration: "20 min" },
  { _id: "6", treatmentName: "Lip Filler — 0.5ml", category: "Dermal Fillers", price: "$350", duration: "45-60 min" },
  { _id: "7", treatmentName: "Lip Filler — 1ml", category: "Dermal Fillers", price: "$550", duration: "45-60 min" },
  { _id: "8", treatmentName: "Cheek Filler — 1ml", category: "Dermal Fillers", price: "$600", duration: "45-60 min" },
  { _id: "9", treatmentName: "Nasolabial Folds — 1ml", category: "Dermal Fillers", price: "$550", duration: "45-60 min" },
  { _id: "10", treatmentName: "Under-Eye (Tear Trough)", category: "Dermal Fillers", price: "From $650", duration: "45-60 min" },
  { _id: "11", treatmentName: "Mesotherapy — Face", category: "Skin Treatments", price: "$350", duration: "45-60 min" },
  { _id: "12", treatmentName: "Mesotherapy — Hair (Scalp)", category: "Skin Treatments", price: "$300", duration: "45 min" },
  { _id: "13", treatmentName: "Custom Medical Facial", category: "Skin Treatments", price: "From $150", duration: "60-90 min" },
  { _id: "14", treatmentName: "IPL Photofacial — Full Face", category: "Laser & Light", price: "$350", duration: "45 min" },
  { _id: "15", treatmentName: "IPL — Spot Treatment", category: "Laser & Light", price: "From $150", duration: "20-30 min" },
  { _id: "16", treatmentName: "Laser Hair — Upper Lip", category: "Laser & Light", price: "$80", duration: "15 min" },
  { _id: "17", treatmentName: "Laser Hair — Full Legs", category: "Laser & Light", price: "$350", duration: "60 min" },
  { _id: "18", treatmentName: "Laser Hair — Underarms", category: "Laser & Light", price: "$120", duration: "20 min" },
  { _id: "19", treatmentName: "EMS Muscle Toning", category: "Body", price: "$300/session", duration: "30 min" },
  { _id: "20", treatmentName: "Body Sculpting", category: "Body", price: "From $400", duration: "45-60 min" },
];

const categoryCards: CategoryCard[] = [
  {
    key: "injectables",
    title: "Injectables",
    description: "Smooth. Refine. Enhance naturally.",
    startingPrice: "$350",
    filterCategory: "Injectables",
    icon: <Syringe size={28} strokeWidth={1.2} />,
  },
  {
    key: "facials",
    title: "Facials",
    description: "Reveal your glow with personalized skin therapies.",
    startingPrice: "$150",
    filterCategory: "Skin Treatments",
    icon: <ScanFace size={28} strokeWidth={1.2} />,
  },
  {
    key: "laser",
    title: "Laser Services",
    description: "Advanced technology for clear, radiant skin.",
    startingPrice: "$250",
    filterCategory: "Laser & Light",
    icon: <Sparkles size={28} strokeWidth={1.2} />,
  },
  {
    key: "body",
    title: "Body Treatments",
    description: "Sculpt. Tone. Transform with confidence.",
    startingPrice: "$450",
    filterCategory: "Body",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-7 w-7" aria-hidden="true">
        <path d="M12 4c1.5 0 2.5 1.2 2.5 2.8 0 1.2-.6 2.2-1.5 2.7v1.5c2.2.4 4 2.2 4.4 4.4l.6 3.6c.2 1-.5 1.9-1.5 2.1-.3.1-.6.1-.9 0-1-.2-1.7-1.1-1.5-2.1l.6-3.6c.2-1.2 1-2.2 2-2.8V9.5c-.9-.5-1.5-1.5-1.5-2.7C9.5 5.2 10.5 4 12 4z" />
        <path d="M8.5 18.5c1.2-1.8 2.3-2.5 3.5-2.5s2.3.7 3.5 2.5" />
      </svg>
    ),
  },
];

const tableCategories = ["All", "Injectables", "Dermal Fillers", "Skin Treatments", "Laser & Light", "Body"];

function extractLowestPrice(items: PricingItem[]): string | null {
  let lowest: number | null = null;
  for (const item of items) {
    const match = item.price.match(/\$([\d,]+)/);
    if (!match) continue;
    const value = Number(match[1].replace(/,/g, ""));
    if (!Number.isNaN(value) && (lowest === null || value < lowest)) {
      lowest = value;
    }
  }
  return lowest !== null ? `$${lowest}` : null;
}

export default function PricingPage() {
  const [pricing, setPricing] = useState<PricingItem[]>(fallbackPricing);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((data) => { if (data?.pricing?.length) setPricing(data.pricing); })
      .catch(() => {});
  }, []);

  const cardsWithPrices = categoryCards.map((card) => {
    const items = pricing.filter((p) => p.category === card.filterCategory);
    const lowest = extractLowestPrice(items);
    return {
      ...card,
      startingPrice: lowest || card.startingPrice,
    };
  });

  const filtered = activeCategory === "All" ? pricing : pricing.filter((p) => p.category === activeCategory);
  const grouped = tableCategories.slice(1).reduce<Record<string, PricingItem[]>>((acc, cat) => {
    const items = filtered.filter((p) => p.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const scrollToPricing = (category: string) => {
    setActiveCategory(category);
    document.getElementById("pricing-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="pricing-hero relative min-h-0 overflow-hidden lg:min-h-[min(96vh,920px)]">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:min-h-[min(96vh,920px)] lg:px-8 lg:pb-10 lg:pt-32">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[500px]">
            <h1 className="pricing-hero-title font-playfair text-gold">Pricing</h1>

            <p className="pricing-hero-tagline mt-4 font-inter text-[10px] font-medium uppercase text-gold/85 sm:text-[11px]">
              Personalized Treatments. Transparent Luxury Care.
            </p>

            <p className="mt-5 max-w-[22rem] font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              From expert injectables to advanced skin and body treatments — every plan is tailored to you.
              Pricing is consultation-based or starting from.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/booking" className="hero-btn-primary group">
                <Calendar size={14} />
                Book Consultation
              </Link>
              <Link href="/services" className="hero-btn-secondary group">
                Explore Services
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="pricing-hero-footnote mt-6 font-inter text-[9px] font-medium uppercase tracking-[0.24em] text-gold/70 sm:text-[10px]">
              ✦ Medical Expertise. Artistic Results.
            </p>
          </ScrollReveal>

          <div className="mt-auto pt-10 lg:pt-14">
            <ScrollReveal delay={0.15} className="pricing-cards-row">
              {cardsWithPrices.map((card) => (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => scrollToPricing(card.filterCategory)}
                  className="pricing-category-card text-left"
                >
                  <div className="pricing-category-icon">{card.icon}</div>
                  <h2 className="pricing-category-name">{card.title}</h2>
                  <p className="pricing-category-desc">{card.description}</p>
                  <p className="pricing-category-price-label">Starting From</p>
                  <p className="pricing-category-price">{card.startingPrice}</p>
                </button>
              ))}
            </ScrollReveal>

            <p className="pricing-hero-disclaimer mt-5 text-center sm:text-left">
              ✦ All pricing is consultation-based or starting from. ✦
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Pricing */}
      <section id="pricing-details" className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal className="mb-10 text-center">
            <span className="mb-3 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
              Full Price List
            </span>
            <h2 className="font-playfair text-3xl text-warm-beige lg:text-4xl">
              Treatment <span className="text-gold">Pricing</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mb-12 flex flex-wrap justify-center gap-2">
            {tableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 font-inter text-xs uppercase tracking-[2px] transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-gold bg-gold text-luxury-black"
                    : "border-gold/20 text-soft-taupe hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          <div className="mx-auto max-w-4xl space-y-10">
            {Object.entries(grouped).map(([cat, items], gi) => (
              <ScrollReveal key={cat} delay={gi * 0.1}>
                <div className="overflow-hidden rounded-xl border border-gold/15">
                  <div className="border-b border-gold/10 bg-gold/5 px-4 py-4 sm:px-6">
                    <h3 className="font-playfair text-xl text-gold">{cat}</h3>
                  </div>

                  {/* Mobile list */}
                  <div className="divide-y divide-gold/10 md:hidden">
                    {items.map((item) => (
                      <div key={item._id} className="px-4 py-4">
                        <p className="font-medium text-warm-beige/90">{item.treatmentName}</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <span className="text-xs text-soft-taupe/70">{item.duration || "—"}</span>
                          <span className="font-playfair text-gold">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="admin-table w-full">
                      <thead>
                        <tr>
                          <th className="w-1/2">Treatment</th>
                          <th>Duration</th>
                          <th className="text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item._id} className="transition-colors hover:bg-gold/5">
                            <td className="font-medium text-warm-beige/90">{item.treatmentName}</td>
                            <td className="text-xs text-soft-taupe/70">{item.duration || "—"}</td>
                            <td className="text-right">
                              <span className="font-playfair text-gold">{item.price}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mx-auto mt-12 max-w-2xl text-center">
            <div className="rounded-xl border border-gold/25 bg-ivory/90 p-6 shadow-card">
              <p className="mb-4 font-inter text-xs leading-relaxed text-soft-taupe">
                <strong className="text-warm-beige/70">Please Note:</strong> Prices listed are starting prices and may vary based
                on the amount of product used, treatment area, and individual needs assessed at consultation.
                All pricing is confirmed before any treatment begins.
              </p>
              <Link href="/booking" className="btn-gold inline-flex items-center gap-3 rounded-sm text-[11px] group">
                Book Free Consultation
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
