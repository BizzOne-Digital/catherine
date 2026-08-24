"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Star, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";
import {
  getTreatmentBookHref,
  getTreatmentBookLabel,
} from "@/lib/bookingConfig";

export type TreatmentCard = {
  _id?: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: string;
  hidePrice?: boolean;
  image?: string;
  popular?: boolean;
  detailPage?: string;
  bookingUrl?: string;
};

export default function CategoryTreatmentsGrid({
  categorySlug,
  fallback = [],
  listLayout = false,
}: {
  categorySlug: string;
  fallback?: TreatmentCard[];
  /** Horizontal list cards (e.g. laser hair removal) */
  listLayout?: boolean;
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

  if (listLayout || categorySlug === "laser-hair-removal") {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {treatments.map((treatment, index) => {
          const detailHref =
            treatment.detailPage || `/services/${categorySlug}/${treatment.slug}`;
          const bookHref = getTreatmentBookHref(categorySlug, treatment.slug);
          const showPrice = !treatment.hidePrice && Boolean((treatment.price || "").trim());
          return (
            <ScrollReveal key={treatment._id || treatment.slug} delay={index * 0.05}>
              <div className="flex flex-col gap-4 rounded-2xl border border-gold/20 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                <div className="min-w-0 flex-1">
                  <Link
                    href={detailHref}
                    className="font-playfair text-lg font-semibold text-text-dark transition-colors hover:text-gold sm:text-xl"
                  >
                    {treatment.name}
                  </Link>
                  {treatment.description && (
                    <p className="mt-1 font-inter text-sm leading-relaxed text-soft-taupe">
                      {treatment.description}
                    </p>
                  )}
                  {showPrice && (
                    <p className="mt-2 font-playfair text-gold">{treatment.price}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={detailHref}
                    className="font-inter text-xs font-semibold uppercase tracking-wider text-gold/80 hover:text-gold"
                  >
                    Details
                  </Link>
                  <Link
                    href={bookHref}
                    className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 font-inter text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-deep-gold"
                  >
                    {getTreatmentBookLabel(categorySlug) === "Book Consultation"
                      ? "Consult"
                      : "Book"}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        treatments.length === 1
          ? "mx-auto max-w-md"
          : treatments.length === 2
            ? "mx-auto max-w-2xl md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {treatments.map((treatment, index) => {
        const href = treatment.detailPage || `/services/${categorySlug}/${treatment.slug}`;
        const showPrice = !treatment.hidePrice && Boolean((treatment.price || "").trim());
        return (
          <ScrollReveal key={treatment._id || treatment.slug} delay={index * 0.08}>
            <Link href={href}>
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-gold/20 bg-white transition-all duration-300 hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(196,151,47,0.15)]">
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gold/5 to-gold/10">
                  {treatment.popular && (
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      <Star size={10} className="fill-white" />
                      Popular
                    </div>
                  )}
                  {treatment.image && resolveCmsImage(treatment.image, "") ? (
                    <CmsImage
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-playfair text-4xl text-gold/20">✦</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-playfair text-xl text-text-dark transition-colors group-hover:text-gold">
                    {treatment.name}
                  </h3>
                  <p className="mb-4 font-inter text-sm leading-relaxed text-soft-taupe">
                    {treatment.description || treatment.shortDescription}
                  </p>
                  <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                    {showPrice ? (
                      <span className="inline-flex items-center gap-1.5 font-playfair text-gold">
                        <DollarSign size={14} />
                        {treatment.price}
                      </span>
                    ) : (
                      <span className="font-inter text-xs text-soft-taupe">View details</span>
                    )}
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
