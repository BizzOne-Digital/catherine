"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Droplets, SparklesIcon, Zap, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";

const treatments = [
  {
    icon: Sparkles,
    title: "Botox",
    description:
      "Smooth dynamic lines on the forehead, frown and crow's feet. Fast, precise, natural-looking results.",
    price: "From $11–$14 / unit",
    duration: "15–30 min",
    href: "/services/injectables-wrinkle-relaxers",
  },
  {
    icon: Heart,
    title: "Lip Filler",
    description:
      "Hydrate, define and gently enhance the lips with premium hyaluronic acid for beautiful, natural volume.",
    price: "From $650–$900",
    duration: "45 min",
    href: "/services/dermal-fillers-skin-boosters",
  },
  {
    icon: Droplets,
    title: "Purifying Deep Clean Facial",
    description:
      "Deep cleanse with custom LED light therapy for radiant, healthy, glowing skin.",
    price: "From $145",
    duration: "60 min",
    href: "/services/facials-skin-health",
  },
  {
    icon: Zap,
    title: "Laser Hair Removal",
    description:
      "Permanent hair reduction on large areas — full legs, arms, back or Brazilian. Smooth, lasting results.",
    price: "From $230–$330",
    duration: "30–60 min",
    href: "/services/laser-hair-removal",
  },
];

export default function FeaturedTreatments() {
  const { get } = usePageContent("home");
  const sec = get("featured_treatments");
  const eyebrow = sec?.subtitle || "Most Popular";
  const title = sec?.title || "Popular Treatments";
  const subtitle =
    sec?.content ||
    "Our most-loved treatments — expertly delivered with precision, safety, and results you'll love.";

  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="absolute top-20 left-0 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
      <div className="absolute top-20 right-0 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {treatments.map(({ icon: Icon, title, description, price, duration, href }, i) => (
            <ScrollReveal key={title} delay={i * 0.08} className="h-full">
              <Link href={href}>
                <motion.div
                  className="group relative flex h-full min-h-[20rem] flex-col rounded-xl border border-gold/25 bg-ivory/95 p-6 shadow-card transition-all duration-500 hover:border-gold/45 hover:shadow-gold-sm cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  {/* Popular Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gold rounded-full">
                    <Star size={10} fill="currentColor" />
                    Popular
                  </div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>

                  <h3 className="mb-2 font-playfair text-xl font-bold text-text-dark transition-colors duration-300 group-hover:text-gold">
                    {title}
                  </h3>

                  <p className="mb-4 flex-1 font-inter text-sm leading-relaxed text-soft-taupe font-medium">
                    {description}
                  </p>

                  {/* Pricing and Duration */}
                  <div className="mb-4 space-y-1.5 pt-3 border-t border-gold/10">
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-xs text-soft-taupe/70 uppercase tracking-wide">Price</span>
                      <span className="font-cormorant text-sm text-gold italic font-semibold">{price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-xs text-soft-taupe/70 uppercase tracking-wide">Duration</span>
                      <span className="font-inter text-xs text-text-dark font-medium">{duration}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-[0.14em] text-gold/80 transition-all duration-300 group-hover:gap-3 group-hover:text-gold font-semibold">
                    Learn More
                    <ArrowRight size={13} />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-12 flex justify-center">
          <Link href="/services" className="btn-outline-gold group flex items-center gap-3 rounded-sm">
            View All Services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
