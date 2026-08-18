"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Droplets,
  Zap,
  Activity,
  ScanFace,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsPageHero from "@/components/cms/CmsPageHero";

const CATEGORY_ORDER = [
  "Injectables",
  "Lip Filler",
  "Mesotherapy / Skin Boosters",
  "Microneedling",
  "Skin Treatments",
  "IPL Laser and Light",
  "Laser Hair Removal",
  "Muscle Toning",
];

const categoryIcons: Record<string, LucideIcon> = {
  Injectables: Sparkles,
  "Lip Filler": Heart,
  "Mesotherapy / Skin Boosters": Droplets,
  Microneedling: Activity,
  "Skin Treatments": Flower2,
  "IPL Laser and Light": Zap,
  "Laser Hair Removal": ScanFace,
  "Muscle Toning": Activity,
};

type PricingItem = {
  _id?: string;
  treatmentName: string;
  category: string;
  price: string;
  duration?: string;
  description?: string;
  order: number;
};

function isInquiryCta(item: PricingItem) {
  return (
    item.category === "Injectables" &&
    /botox|dysport/i.test(item.treatmentName)
  );
}

export default function PricingPage() {
  const [items, setItems] = useState<PricingItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((d) => setItems(d.pricing || []))
      .catch(() => setItems([]))
      .finally(() => setLoaded(true));
  }, []);

  const groups = useMemo(() => {
    const byCat = new Map<string, PricingItem[]>();
    for (const item of items) {
      const list = byCat.get(item.category) || [];
      list.push(item);
      byCat.set(item.category, list);
    }
    for (const list of byCat.values()) {
      list.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    const ordered = CATEGORY_ORDER.filter((c) => byCat.has(c)).map((c) => ({
      category: c,
      items: byCat.get(c) || [],
    }));
    // Any unexpected categories from admin edits
    for (const [category, catItems] of byCat) {
      if (!CATEGORY_ORDER.includes(category)) {
        ordered.push({ category, items: catItems });
      }
    }
    return ordered;
  }, [items]);

  return (
    <>
      <CmsPageHero
        slug="pricing"
        fallback={{
          eyebrow: "Transparent Pricing",
          title: "Treatment|Pricing",
          content:
            "Clear, upfront pricing for all our medical aesthetic treatments. Every plan is personalized during your complimentary consultation.",
        }}
      />

      <div className="container-luxury relative z-10 -mt-2 pb-10 text-center sm:-mt-4 sm:pb-12">
        <ScrollReveal
          delay={0.15}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/booking"
            className="btn-gold rounded-sm inline-flex items-center gap-3 group font-bold"
          >
            Book Free Consultation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/services" className="btn-outline-gold rounded-sm font-bold">
            View All Services
          </Link>
        </ScrollReveal>
      </div>

      <section className="section-pad section-warm">
        <div className="container-luxury max-w-5xl">
          <div className="space-y-12">
            {groups.map((group, idx) => {
              const Icon = categoryIcons[group.category] || Sparkles;
              return (
                <ScrollReveal key={group.category} delay={idx * 0.06}>
                  <div className="space-y-4">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <Icon size={22} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-text-dark">
                        {group.category}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {group.items.map((item) => {
                        const inquiry = isInquiryCta(item);
                        const row = (
                          <div className="rounded-xl border border-gold/20 bg-ivory/95 p-5 sm:p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1">
                                <h3 className="mb-1 font-playfair text-lg sm:text-xl font-bold text-text-dark">
                                  {item.treatmentName}
                                </h3>
                                {item.duration && (
                                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gold/80">
                                    {item.duration}
                                  </p>
                                )}
                                {item.description && (
                                  <p className="text-sm font-medium leading-relaxed text-soft-taupe">
                                    {item.description}
                                  </p>
                                )}
                                {inquiry && (
                                  <Link
                                    href="/booking"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors hover:text-deep-gold"
                                  >
                                    Send inquiry or book consultation
                                    <ArrowRight size={14} />
                                  </Link>
                                )}
                              </div>
                              <span className="shrink-0 font-cormorant text-lg sm:text-xl italic font-semibold text-gold">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        );

                        return (
                          <div key={item._id || `${item.category}-${item.treatmentName}`}>
                            {row}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {loaded && !groups.length && (
              <p className="py-16 text-center font-inter text-sm text-soft-taupe">
                Pricing will appear here shortly. Please check back soon or{" "}
                <Link href="/booking" className="text-gold underline">
                  book a consultation
                </Link>
                .
              </p>
            )}

            {!loaded && (
              <p className="py-16 text-center font-inter text-sm text-soft-taupe">
                Loading pricing…
              </p>
            )}
          </div>

          <ScrollReveal delay={0.3} className="mt-14">
            <div className="relative overflow-hidden rounded-2xl border-2 border-gold/50 bg-white p-8 text-center shadow-gold-sm sm:p-10">
              <div className="relative z-10">
                <h3 className="mb-3 font-playfair text-2xl sm:text-3xl font-bold text-text-dark">
                  Flexible Financing Available
                </h3>
                <p className="mx-auto mb-7 max-w-xl font-medium text-soft-taupe">
                  Prefer to pay over time? Apply securely through Medicard by iFinance.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/financing"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-deep-gold"
                  >
                    Explore Financing
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:border-gold hover:bg-gold/5"
                  >
                    Book now
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
