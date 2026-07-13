"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Droplets, FlaskConical, Sun, Zap, Waves, Dumbbell, ArrowRight, Leaf } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    icon: Sparkles,
    title: "Injectables & Botox",
    description: "Smooth fine lines and dynamic wrinkles with precise, natural-looking Botox treatments tailored to your facial anatomy.",
    startingPrice: "$10/unit",
    slug: "injectables-botox",
  },
  {
    icon: Droplets,
    title: "Dermal Fillers",
    description: "Restore volume, define contours, and rejuvenate your appearance with premium hyaluronic acid fillers.",
    startingPrice: "From $500",
    slug: "dermal-fillers",
  },
  {
    icon: FlaskConical,
    title: "Mesotherapy",
    description: "Revitalize your skin with customized microinjections delivering vitamins, minerals, and hyaluronic acid deep into the dermis.",
    startingPrice: "From $350",
    slug: "mesotherapy",
  },
  {
    icon: Leaf,
    title: "Customized Facials",
    description: "Medical-grade facial treatments customized to your skin type and concerns for a radiant, healthy complexion.",
    startingPrice: "From $150",
    slug: "customized-facials",
  },
  {
    icon: Sun,
    title: "IPL Photofacials",
    description: "Target pigmentation, redness, and sun damage with Intense Pulsed Light therapy for an even, luminous skin tone.",
    startingPrice: "From $250",
    slug: "ipl-photofacials",
  },
  {
    icon: Zap,
    title: "Laser Hair Removal",
    description: "Achieve smooth, hair-free skin permanently with advanced laser technology safe for all skin types.",
    startingPrice: "From $80",
    slug: "laser-hair-removal",
  },
  {
    icon: Dumbbell,
    title: "Muscle Toning",
    description: "Non-invasive electromagnetic muscle stimulation to tone, strengthen, and sculpt your body effortlessly.",
    startingPrice: "From $300",
    slug: "muscle-toning",
  },
  {
    icon: Waves,
    title: "Body Sculpting",
    description: "Contour and slim targeted areas with advanced body sculpting technology — no surgery, no downtime.",
    startingPrice: "From $400",
    slug: "body-sculpting",
  },
];

export default function FeaturedTreatments() {
  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-20 left-0 w-px h-64 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-0 w-px h-64 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Expertise"
            title={<>Premium<br />Treatment Menu</>}
            subtitle="From subtle refinement to full transformation — every treatment is performed with medical precision and artistic care."
          />
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {treatments.map(({ icon: Icon, title, description, startingPrice, slug }, i) => (
            <ScrollReveal key={slug} delay={i * 0.07}>
              <motion.div
                className="group relative p-6 rounded-lg border border-gold/20 surface-card transition-all duration-500 hover:border-gold/40 hover:shadow-gold-sm flex flex-col h-full"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={19} className="text-gold" />
                </div>

                {/* Title */}
                <h3 className="font-playfair text-lg text-text-dark mb-2 group-hover:text-gold transition-colors duration-300">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-4 flex-1">
                  {description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                  <span className="font-cormorant text-base italic text-gold">{startingPrice}</span>
                  <Link
                    href={`/services#${slug}`}
                    className="text-soft-taupe/60 hover:text-gold transition-colors duration-300"
                    aria-label={`Learn more about ${title}`}
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-px h-full bg-gold/40" />
                  <div className="absolute top-0 right-0 h-px w-full bg-gold/40" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="flex justify-center mt-12">
          <Link href="/services" className="btn-outline-gold rounded-sm group flex items-center gap-3">
            View All Services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
