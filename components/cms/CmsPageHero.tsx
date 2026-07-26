"use client";
import { usePageContent } from "@/components/cms/usePageContent";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Fallback = {
  eyebrow?: string;
  title: string;
  titleEmphasized?: string;
  content: string;
};

/** Shared text-hero for Contact, Booking, Pricing, FAQ, etc. */
export default function CmsPageHero({
  slug,
  fallback,
}: {
  slug: string;
  fallback: Fallback;
}) {
  const { get } = usePageContent(slug);
  const hero = get("hero");

  const eyebrow = hero?.subtitle || fallback.eyebrow || "";
  const title = hero?.title || fallback.title;
  const content = hero?.content || fallback.content;
  // Optional: title with last word emphasized via | separator "Get in|Touch"
  const parts = title.includes("|") ? title.split("|") : null;

  return (
    <section className="relative overflow-hidden page-text-hero pb-12 pt-24 sm:pb-16 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.05)_0%,transparent_60%)]" />
      <div className="container-luxury relative z-10 text-center">
        <ScrollReveal>
          {eyebrow && (
            <span className="mb-4 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
              {eyebrow}
            </span>
          )}
          <h1 className="mb-5 text-balance font-playfair text-3xl leading-tight text-warm-beige sm:text-4xl lg:text-6xl">
            {parts ? (
              <>
                {parts[0].trim()}{" "}
                <em className="not-italic text-gold">{parts[1]?.trim()}</em>
              </>
            ) : (
              title
            )}
          </h1>
          <div className="mx-auto mb-5 h-px w-12 bg-gold/50" />
          <p className="mx-auto max-w-xl font-cormorant text-xl italic text-soft-taupe">
            {content}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
