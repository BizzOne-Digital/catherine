"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePageContent } from "@/components/cms/usePageContent";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

const FALLBACK = {
  eyebrow: "✦ Lumina Medi Spa · Mississauga",
  title: "Reveal Your Best Skin",
  content: "Personalized Medical Aesthetics for Natural, Beautiful Results",
  image: "/images/hero-bg.png",
  ctaLabel: "Book Consultation",
  ctaHref: "/booking",
};

export default function HeroSection() {
  const { get } = usePageContent("home");
  const hero = get("hero");

  const eyebrow = hero?.subtitle || FALLBACK.eyebrow;
  const title = hero?.title || FALLBACK.title;
  const content = hero?.content || FALLBACK.content;
  const image = resolveCmsImage(hero?.image, FALLBACK.image);
  const ctaLabel = hero?.ctaLabel || FALLBACK.ctaLabel;
  const ctaHref = hero?.ctaHref || FALLBACK.ctaHref;

  return (
    <section className="hero-section relative overflow-hidden lg:min-h-screen">
      <CmsImage
        src={image}
        fallback={FALLBACK.image}
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "35% center" }}
        sizes="100vw"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:min-h-screen">
        <div className="flex flex-1 items-center px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-36">
          <div className="max-w-xl lg:max-w-[600px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hero-eyebrow mb-5 font-inter text-[10px] font-bold uppercase tracking-[0.32em] text-gold sm:text-[11px]"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hero-heading font-playfair leading-[1.12] tracking-tight text-[clamp(2.35rem,5.5vw,3.75rem)] text-warm-beige"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hero-description mt-6 max-w-lg font-inter text-base font-semibold leading-relaxed text-warm-beige sm:text-[17px]"
            >
              {content}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link href={ctaHref} className="hero-btn-primary group">
                {ctaLabel}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
