"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Star, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

export type TreatmentCard = {
  _id?: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: string;
  image?: string;
  popular?: boolean;
  detailPage?: string;
};

export default function CategoryTreatmentsGrid({
  categorySlug,
  fallback = [],
}: {
  categorySlug: string;
  fallback?: TreatmentCard[];
}) {
  const [treatments, setTreatments] = useState<TreatmentCard[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch(
        `/api/treatments?category=${encodeURIComponent(categorySlug)}&_=${Date.now()}`,
        { cache: "no-store" }
      )
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          if (data?.treatments?.length) {
            setTreatments(
              data.treatments.map((t: TreatmentCard & { shortDescription?: string }) => ({
                ...t,
                description: t.shortDescription || t.description,
              }))
            );
          }
        })
        .catch(() => {});
    };
    load();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, [categorySlug]);

  if (!treatments.length) {
    return (
      <p className="py-16 text-center font-inter text-sm text-soft-taupe">
        Treatments coming soon.
      </p>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        treatments.length === 1
          ? "max-w-md mx-auto"
          : treatments.length === 2
            ? "md:grid-cols-2 max-w-2xl mx-auto"
            : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {treatments.map((treatment, index) => {
        const href =
          treatment.detailPage || `/services/${categorySlug}/${treatment.slug}`;
        return (
          <ScrollReveal key={treatment._id || treatment.slug} delay={index * 0.08}>
            <Link href={href}>
              <div className="group relative bg-white rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(196,151,47,0.15)] cursor-pointer h-full">
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gold/5 to-gold/10">
                  {treatment.popular && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gold rounded-full">
                      <Star size={10} className="fill-white" />
                      Popular
                    </div>
                  )}
                  {treatment.image && resolveCmsImage(treatment.image, "") ? (
                    <CmsImage
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-playfair text-4xl text-gold/20">✦</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-text-dark mb-2 group-hover:text-gold transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-4">
                    {treatment.description || treatment.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                    <span className="inline-flex items-center gap-1.5 font-playfair text-gold">
                      <DollarSign size={14} />
                      {treatment.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-gold/70 group-hover:text-gold">
                      Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
