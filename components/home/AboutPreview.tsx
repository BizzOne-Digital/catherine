"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

const FALLBACK = {
  subtitle: "Meet Your Specialist",
  title: "Care That Goes Beyond the Surface",
  content:
    "At Lumina Medi Spa, every treatment begins with a conversation. We believe beautiful results come from truly understanding your goals, your anatomy, and your lifestyle — not from a one-size-fits-all approach.\n\n\"My goal is never to change who you are — it's to help you look like the best version of yourself.\"",
  image: "/images/about-clinic.jpg",
  items: [
    "Registered Nurse with 10+ years of aesthetic expertise",
    "Medical oversight ensuring the highest safety standards",
    "Customized treatment plans — never cookie-cutter",
    "Premium medical-grade products and technology",
    "Natural, balanced results that enhance your features",
  ],
  ctaLabel: "Learn More About Us",
  ctaHref: "/about",
};

export default function AboutPreview() {
  const { get } = usePageContent("home");
  const sec = get("about_preview");

  const subtitle = sec?.subtitle || FALLBACK.subtitle;
  const title = sec?.title || FALLBACK.title;
  const content = sec?.content || FALLBACK.content;
  const image = resolveCmsImage(sec?.image, FALLBACK.image);
  const items = sec?.items?.length ? sec.items : FALLBACK.items;
  const ctaLabel = sec?.ctaLabel || FALLBACK.ctaLabel;
  const ctaHref = sec?.ctaHref || FALLBACK.ctaHref;
  const paras = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <section className="section-pad section-warm relative overflow-hidden">
      <div className="absolute left-0 top-1/2 h-48 w-1 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-20 right-20 h-64 w-64 rounded-full bg-gold/4 blur-[100px]" />

      <div className="container-luxury">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <div className="relative overflow-x-clip px-2 sm:px-0">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl lg:mx-0">
                <CmsImage
                  src={image}
                  fallback={FALLBACK.image}
                  alt="Lumina Medi Spa clinic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl border border-gold/15" />
              </div>
              <motion.div
                className="glass-card absolute right-0 top-8 px-5 py-3 shadow-gold-sm sm:-right-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-playfair text-2xl text-gold">10+</p>
                <p className="font-inter text-xs tracking-wide text-soft-taupe">Years Expertise</p>
              </motion.div>
              <motion.div
                className="glass-card absolute bottom-12 left-0 px-5 py-3 shadow-gold-sm sm:-left-4"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <p className="font-playfair text-2xl text-gold">500+</p>
                <p className="font-inter text-xs tracking-wide text-soft-taupe">Happy Clients</p>
              </motion.div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal direction="right">
              <span className="mb-4 block font-inter text-[11px] font-bold uppercase tracking-[4px] text-gold">
                {subtitle}
              </span>
              <h2 className="mb-5 font-playfair text-3xl font-bold leading-tight text-text-dark sm:text-4xl lg:text-5xl">
                {title.includes("Beyond") ? (
                  <>
                    {title.split(/Beyond/i)[0]}
                    <em className="not-italic text-gold">Beyond{title.split(/Beyond/i)[1] || ""}</em>
                  </>
                ) : (
                  title
                )}
              </h2>
              <div className="mb-6 h-px w-12 bg-gold/40" />
              {paras.map((p, i) =>
                p.startsWith('"') || p.startsWith("'") || p.startsWith("“") ? (
                  <p key={i} className="mb-8 font-cormorant text-xl italic text-warm-beige/80">
                    {p}
                  </p>
                ) : (
                  <p key={i} className="mb-6 font-inter text-base leading-relaxed text-soft-taupe">
                    {p}
                  </p>
                )
              )}
            </ScrollReveal>

            <ul className="mb-10 space-y-3">
              {items.map((item, i) => (
                <ScrollReveal key={item} delay={0.1 * i} direction="right">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="font-inter text-sm text-warm-beige/80">{item}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal direction="right" delay={0.4}>
              <Link
                href={ctaHref}
                className="btn-outline-gold group inline-flex items-center gap-3 rounded-sm"
              >
                {ctaLabel}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
