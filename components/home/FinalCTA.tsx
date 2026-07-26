"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import GoldParticles from "@/components/ui/GoldParticles";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";

const FALLBACK = {
  subtitle: "Begin Your Transformation",
  title: "Your Most Confident Self Awaits",
  content:
    "Take the first step toward results that feel effortlessly, beautifully you. Your complimentary consultation is waiting.",
  ctaLabel: "Book Free Consultation",
  ctaHref: "/booking",
  items: ["(905) 123-4567", "Lumina Medi Spa · 123 Luxury Lane, Mississauga, ON · By Appointment"],
};

export default function FinalCTA() {
  const { get } = usePageContent("home");
  const sec = get("final_cta");

  const subtitle = sec?.subtitle || FALLBACK.subtitle;
  const title = sec?.title || FALLBACK.title;
  const content = sec?.content || FALLBACK.content;
  const ctaLabel = sec?.ctaLabel || FALLBACK.ctaLabel;
  const ctaHref = sec?.ctaHref || FALLBACK.ctaHref;
  const phone = sec?.items?.[0] || FALLBACK.items[0];
  const footer = sec?.items?.[1] || FALLBACK.items[1];
  const phoneHref = `tel:+1${phone.replace(/\D/g, "")}`;

  const titleParts = title.includes("Self")
    ? title.split(/(Self)/i)
    : [title];

  return (
    <section className="section-warm-deep relative overflow-hidden py-24 md:py-32">
      <GoldParticles count={30} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(400px,60vw)] w-[min(700px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <span className="mb-6 block font-inter text-[11px] font-bold uppercase tracking-[5px] text-gold">
              {subtitle}
            </span>
            <h2 className="mb-6 font-playfair text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]}
                  <em className="not-italic text-gold">{titleParts[1]}</em>
                  {titleParts.slice(2).join("")}
                </>
              ) : (
                title
              )}
            </h2>
            <div className="mx-auto mb-7 h-px w-16 bg-gold/50" />
            <p className="mb-10 font-cormorant text-xl italic leading-relaxed text-warm-beige/70 md:text-2xl">
              {content}
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={0.2}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={ctaHref}
                className="btn-gold group inline-flex items-center gap-3 rounded-sm px-10 py-4"
              >
                {ctaLabel}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <a href={phoneHref} className="btn-outline-gold inline-flex items-center gap-3 rounded-sm">
              <Phone size={14} />
              {phone}
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-inter text-xs font-semibold tracking-wide text-soft-taupe">{footer}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
