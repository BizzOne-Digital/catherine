"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ScanFace, Zap, Flower2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    icon: Sparkles,
    title: "Injectables",
    description:
      "Botox and dermal fillers for smooth lines, restored volume, and naturally refined contours.",
    href: "/services/injectables-wrinkle-relaxers",
  },
  {
    icon: ScanFace,
    title: "Skin Tightening",
    description:
      "Advanced treatments that firm, lift, and revitalize skin for a smoother, more youthful look.",
    href: "/services/facials-skin-health",
  },
  {
    icon: Zap,
    title: "Laser Rejuvenation",
    description:
      "Laser and light-based care to improve tone, texture, pigmentation, and overall radiance.",
    href: "/services/laser-hair-removal",
  },
  {
    icon: Flower2,
    title: "Medical Facials",
    description:
      "Medical-grade facials customized to your skin type for clearer, healthier, glowing skin.",
    href: "/services/facials-skin-health",
  },
];

export default function SignatureCare() {
  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="absolute top-20 left-0 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
      <div className="absolute top-20 right-0 h-64 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Treatments"
            title="Treatments We Offer"
            subtitle="Four pillars of medical aesthetics — tailored with precision, safety, and natural-looking results."
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {treatments.map(({ icon: Icon, title, description, href }, i) => (
            <ScrollReveal key={title} delay={i * 0.08} className="h-full">
              <Link href={href}>
                <motion.div
                  className="group relative flex h-full min-h-[16rem] flex-col rounded-xl border border-gold/25 bg-ivory/95 p-6 shadow-card transition-all duration-500 hover:border-gold/45 hover:shadow-gold-sm cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>

                  <h3 className="mb-2 font-playfair text-xl text-text-dark transition-colors duration-300 group-hover:text-gold font-bold">
                    {title}
                  </h3>

                  <p className="mb-6 flex-1 font-inter text-sm leading-relaxed text-soft-taupe font-medium">
                    {description}
                  </p>

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
