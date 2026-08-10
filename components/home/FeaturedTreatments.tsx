"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Droplets,
  Zap,
  Star,
  Layers,
  Sun,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";

const NEW_SUBTITLE =
  "From injectables to advanced facials, laser and body sculpting - every treatment is tailored to you and delivered with medical-grade care.";

type Card = {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  href: string;
};

const iconCycle: LucideIcon[] = [Sparkles, Heart, Droplets, Layers, Sun, Zap];

const FALLBACK: Card[] = [
  {
    icon: Sparkles,
    title: "Anti-Wrinkle Injections (Botox®/Dysport®)",
    description:
      "Smooth fine lines and soften wrinkles for a refreshed, natural-looking appearance.",
    price: "From $8/unit",
    href: "/services/injectables-wrinkle-relaxers/botox-or-dysport",
  },
  {
    icon: Heart,
    title: "Lip Filler",
    description:
      "Hydrate, define, and subtly enhance your lips with premium hyaluronic acid fillers.",
    price: "From $325",
    href: "/services/dermal-fillers-skin-boosters/lip-filler",
  },
  {
    icon: Droplets,
    title: "Purifying Pore Refinement Hydrafacial",
    description:
      "Deeply cleanse, exfoliate, and hydrate the skin with customized LED light therapy for a refreshed, radiant complexion.",
    price: "From $169",
    href: "/services/facials-skin-health/purifying-facial",
  },
  {
    icon: Layers,
    title: "Microneedling",
    description:
      "Stimulate collagen production to improve skin texture, reduce acne scars, and minimize pores.",
    price: "From $199",
    href: "/services/microneedling-skin-resurfacing/microneedling",
  },
  {
    icon: Sun,
    title: "BBL/IPL Photofacial",
    description:
      "Reduce pigmentation, redness, and sun damage while stimulating collagen for a brighter, more even complexion.",
    price: "From $149",
    href: "/services/microneedling-skin-resurfacing/ipl-photofacial",
  },
  {
    icon: Zap,
    title: "Laser Hair Removal",
    description:
      "Achieve smoother, hair-free skin with our advanced diode laser hair removal, delivering safe, effective, long-term hair reduction with minimal discomfort.",
    price: "From $55",
    href: "/services/laser-hair-removal/small-area",
  },
];

export default function FeaturedTreatments() {
  const { get } = usePageContent("home");
  const sec = get("featured_treatments");
  const eyebrow = sec?.subtitle || "Most Popular";
  const title = sec?.title || "Popular Treatments";
  const subtitle = sec?.content || NEW_SUBTITLE;
  const [cards, setCards] = useState<Card[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => {
        const popular = (d.treatments || []).filter(
          (t: { popular?: boolean }) => t.popular
        );
        if (!popular.length) return;

        // Preferred homepage order: Botox/Dysport first, Lip Filler second
        const rank = (t: { slug?: string; name?: string }) => {
          const s = `${t.slug || ""} ${t.name || ""}`.toLowerCase();
          if (s.includes("botox") || s.includes("dysport")) return 0;
          if (s.includes("lip-filler") || s.includes("lip filler")) return 1;
          return 100;
        };
        popular.sort(
          (
            a: { slug?: string; name?: string },
            b: { slug?: string; name?: string }
          ) => rank(a) - rank(b)
        );

        setCards(
          popular.slice(0, 6).map(
            (
              t: {
                name: string;
                shortDescription?: string;
                price: string;
                hidePrice?: boolean;
                detailPage: string;
              },
              i: number
            ) => ({
              icon: iconCycle[i % iconCycle.length],
              title: t.name,
              description: t.shortDescription || "",
              price: t.hidePrice ? "Book for details" : t.price,
              href: t.detailPage,
            })
          )
        );
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="absolute top-20 left-0 hidden h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent sm:block" />
      <div className="absolute top-20 right-0 hidden h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent sm:block" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title: cardTitle, description, price, href }, i) => (
            <ScrollReveal key={`${cardTitle}-${i}`} delay={i * 0.06} className="h-full">
              <Link href={href} className="block h-full">
                <motion.div
                  className="group relative flex h-full min-h-[16rem] cursor-pointer flex-col rounded-xl border border-gold/25 bg-ivory/95 p-5 shadow-card transition-all duration-500 hover:border-gold/45 hover:shadow-gold-sm sm:min-h-[18rem] sm:p-6"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:right-4 sm:top-4">
                    <Star size={10} fill="currentColor" />
                    Popular
                  </div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>

                  <h3 className="mb-2 pr-16 font-playfair text-lg font-bold text-text-dark transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {cardTitle}
                  </h3>

                  <p className="mb-4 flex-1 font-inter text-sm font-medium leading-relaxed text-soft-taupe">
                    {description}
                  </p>

                  <div className="mb-4 space-y-1.5 border-t border-gold/10 pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-inter text-xs uppercase tracking-wide text-soft-taupe/70">
                        Price
                      </span>
                      <span className="font-cormorant text-sm font-semibold italic text-gold">
                        {price}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-gold/80 transition-all duration-300 group-hover:gap-3 group-hover:text-gold">
                    Learn More
                    <ArrowRight size={13} />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-10 flex justify-center sm:mt-12">
          <Link href="/services" className="btn-outline-gold group flex items-center gap-3 rounded-sm">
            View All Services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
