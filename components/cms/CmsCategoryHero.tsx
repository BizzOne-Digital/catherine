"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";

export default function CmsCategoryHero({
  categorySlug,
  fallback,
}: {
  categorySlug: string;
  fallback: {
    eyebrow?: string;
    title: string;
    content: string;
  };
}) {
  const { get } = usePageContent(`category-${categorySlug}`);
  const hero = get("hero");

  const eyebrow = hero?.subtitle || fallback.eyebrow || "Category";
  const title = hero?.title || fallback.title;
  const content = hero?.content || fallback.content;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
      <div className="container-luxury">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-deep-gold"
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
              {eyebrow}
            </span>
            <h1 className="mb-6 font-playfair text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-lg font-medium leading-relaxed text-text-soft sm:text-xl">
              {content}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
