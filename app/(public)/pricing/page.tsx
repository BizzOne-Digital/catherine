"use client";
import { useEffect, useState } from "react";
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
  Info,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsPageHero from "@/components/cms/CmsPageHero";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Heart,
  Droplets,
  Zap,
  Activity,
  ScanFace,
  Flower2,
};

type Treatment = {
  name: string;
  slug: string;
  shortDescription: string;
  price: string;
  detailPage: string;
};

type CategoryGroup = {
  _id: string;
  title: string;
  slug: string;
  icon: string;
  detailPage: string;
  treatments: Treatment[];
};

export default function PricingPage() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/treatments").then((r) => r.json()),
    ])
      .then(([catData, treatData]) => {
        const categories = catData.categories || [];
        const treatments = treatData.treatments || [];
        if (!categories.length) return;

        setGroups(
          categories.map((c: { _id: string; title: string; slug: string; icon: string; detailPage: string }) => ({
            ...c,
            treatments: treatments.filter((t: Treatment & { categorySlug: string }) => t.categorySlug === c.slug),
          }))
        );
      })
      .catch(() => {});
  }, []);

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
            {groups.map((category, idx) => {
              const Icon = iconMap[category.icon] || Sparkles;
              if (!category.treatments.length) return null;
              return (
                <ScrollReveal key={category._id || category.slug} delay={idx * 0.08}>
                  <div className="space-y-4">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <Icon size={22} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-text-dark">
                        {category.title}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {category.treatments.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.detailPage || category.detailPage}
                          className="group block"
                        >
                          <div className="rounded-xl border border-gold/20 bg-ivory/95 p-5 sm:p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-0.5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1">
                                <h3 className="mb-2 font-playfair text-lg sm:text-xl font-bold text-text-dark transition-colors group-hover:text-gold">
                                  {item.name}
                                </h3>
                                {item.shortDescription && (
                                  <p className="text-sm font-medium leading-relaxed text-soft-taupe">
                                    {item.shortDescription}
                                  </p>
                                )}
                              </div>
                              <span className="shrink-0 font-cormorant text-lg sm:text-xl italic font-semibold text-gold">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {!groups.length && (
              <p className="py-16 text-center font-inter text-sm text-soft-taupe">
                Loading pricing…
              </p>
            )}
          </div>

          <ScrollReveal delay={0.3} className="mt-14">
            <div className="rounded-xl border border-gold/20 bg-[#FAF4EB] p-6">
              <div className="flex items-start gap-3">
                <Info size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                <p className="text-sm font-medium leading-relaxed text-soft-taupe">
                  Prices shown are starting estimates for guidance only. Final pricing depends on
                  your individual treatment plan and is confirmed during your consultation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-14">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-8 text-center sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,151,47,0.1)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <h3 className="mb-3 font-playfair text-2xl sm:text-3xl font-bold text-white">
                  Flexible Financing Available
                </h3>
                <p className="mx-auto mb-7 max-w-xl font-medium text-warm-beige/80">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
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
