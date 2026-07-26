"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ScanFace, Zap, Flower2, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";

const iconCycle: LucideIcon[] = [Sparkles, ScanFace, Zap, Flower2];

const FALLBACK_ITEMS = [
  "Injectables|Botox and dermal fillers for smooth lines, restored volume, and naturally refined contours.|/services/injectables-wrinkle-relaxers",
  "Skin Tightening|Advanced treatments that firm, lift, and revitalize skin for a smoother, more youthful look.|/services/facials-skin-health",
  "Laser Rejuvenation|Laser and light-based care to improve tone, texture, pigmentation, and overall radiance.|/services/laser-hair-removal",
  "Medical Facials|Medical-grade facials customized to your skin type for clearer, healthier, glowing skin.|/services/facials-skin-health",
];

function parseCard(item: string) {
  const [title, description, href] = item.split("|").map((s) => s.trim());
  return {
    title: title || "Treatment",
    description: description || "",
    href: href || "/services",
  };
}

export default function SignatureCare() {
  const { get } = usePageContent("home");
  const sec = get("signature_care");

  const eyebrow = sec?.subtitle || "Treatments";
  const title = sec?.title || "Treatments We Offer";
  const subtitle =
    sec?.content ||
    "Four pillars of medical aesthetics — tailored with precision, safety, and natural-looking results.";
  const items = (sec?.items?.length ? sec.items : FALLBACK_ITEMS).map(parseCard);
  const ctaLabel = sec?.ctaLabel || "View All Services";
  const ctaHref = sec?.ctaHref || "/services";

  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="absolute left-0 top-20 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
      <div className="absolute right-0 top-20 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title: t, description, href }, i) => {
            const Icon = iconCycle[i % iconCycle.length];
            return (
              <ScrollReveal key={t} delay={i * 0.08} className="h-full">
                <Link href={href}>
                  <motion.div
                    className="group relative flex h-full min-h-[16rem] cursor-pointer flex-col rounded-xl border border-gold/25 bg-ivory/95 p-6 shadow-card transition-all duration-500 hover:border-gold/45 hover:shadow-gold-sm"
                    whileHover={{ y: -4 }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                      <Icon size={20} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-2 font-playfair text-xl font-bold text-text-dark transition-colors duration-300 group-hover:text-gold">
                      {t}
                    </h3>
                    <p className="mb-6 flex-1 font-inter text-sm font-medium leading-relaxed text-soft-taupe">
                      {description}
                    </p>
                    <div className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-gold/80 transition-all duration-300 group-hover:gap-3 group-hover:text-gold">
                      Learn More
                      <ArrowRight size={13} />
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.25} className="mt-12 flex justify-center">
          <Link href={ctaHref} className="btn-outline-gold group flex items-center gap-3 rounded-sm">
            {ctaLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
