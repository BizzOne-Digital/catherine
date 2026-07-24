"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Droplets, Zap, Activity, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FinancingCallout from "@/components/ui/FinancingCallout";

const serviceCategories = [
  {
    id: "injectables",
    icon: Sparkles,
    title: "Injectables & Wrinkle Relaxers",
    description: "Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.",
    treatmentCount: 2,
    detailPage: "/services/injectables-wrinkle-relaxers",
    treatments: [
      { name: "Botox", description: "Smooth dynamic lines on the forehead, frown and crow's feet.", price: "From $11–$14 / unit", duration: "15–30 min", popular: true },
      { name: "Dysport & Nuceiva", description: "Alternative neuromodulators for fast-acting, natural smoothing.", price: "From $11–$14 / unit", duration: "15–30 min", popular: false },
    ],
  },
  {
    id: "fillers",
    icon: Heart,
    title: "Dermal Fillers & Skin Boosters",
    description: "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
    treatmentCount: 3,
    detailPage: "/services/dermal-fillers-skin-boosters",
    treatments: [
      { name: "Dermal Fillers", description: "Restore volume and contour cheeks, jawline and chin.", price: "From $700–$1,200 / syringe", duration: "45–60 min", popular: false },
      { name: "Lip Filler", description: "Hydrate, define and gently enhance the lips.", price: "From $650–$900 / syringe", duration: "45 min", popular: true },
      { name: "Skin Booster Injections", description: "Profhilo & Juvéderm SkinVive for deep hydration and glow.", price: "From $450–$650 / session", duration: "30–45 min", popular: false },
    ],
  },
  {
    id: "facials",
    icon: Droplets,
    title: "Facials & Skin Health",
    description: "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
    treatmentCount: 3,
    detailPage: "/services/facials-skin-health",
    treatments: [
      { name: "Purifying Deep Clean Facial", description: "Deep cleanse with custom LED light therapy for radiant skin.", price: "From $145", duration: "60 min", popular: true },
      { name: "Signature Relaxation Facial", description: "Expert skincare meets a soothing face and neck massage.", price: "From $160", duration: "60 min", popular: false },
      { name: "Chemical Peel", description: "Resurface for brighter, clearer, more even-toned skin.", price: "From $150", duration: "30–45 min", popular: false },
    ],
  },
  {
    id: "microneedling",
    icon: Activity,
    title: "Microneedling & Skin Resurfacing",
    description: "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
    treatmentCount: 2,
    detailPage: "/services/microneedling-skin-resurfacing",
    treatments: [
      { name: "Microneedling", description: "Collagen-stimulating treatment for texture, pores and scars.", price: "From $250", duration: "60 min", popular: true },
      { name: "IPL Photofacial", description: "Target sun damage, redness and uneven pigmentation.", price: "From $250", duration: "30–40 min", popular: false },
    ],
  },
  {
    id: "laser",
    icon: Zap,
    title: "Laser Hair Removal",
    description: "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
    treatmentCount: 3,
    detailPage: "/services/laser-hair-removal",
    treatments: [
      { name: "Laser Hair Removal — Small Area", description: "Lip, chin, underarms and other small areas.", price: "From $60–$130 / session", duration: "15–20 min", popular: false },
      { name: "Laser Hair Removal — Large Area", description: "Full legs, full arms, back or Brazilian.", price: "From $230–$330 / session", duration: "30–60 min", popular: true },
      { name: "Full Body Laser Hair Removal", description: "All major body areas in one session (excludes back).", price: "From $550 / session", duration: "75–90 min", popular: false },
    ],
  },
  {
    id: "body",
    icon: Activity,
    title: "Body Sculpting & Contouring",
    description: "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
    treatmentCount: 1,
    detailPage: "/services/body-sculpting-contouring",
    treatments: [
      { name: "Body Sculpting with HIFEM", description: "Build muscle and tone a target area — no downtime.", price: "From $300 / session", duration: "30 min", popular: true },
    ],
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof serviceCategories[0] | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="services-hero relative min-h-0 overflow-hidden lg:min-h-[min(94vh,880px)]">
        <div className="services-hero-inner relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <ScrollReveal direction="right" className="services-hero-copy max-w-xl lg:max-w-[480px]">
            <p className="services-hero-eyebrow font-inter text-[10px] font-medium uppercase tracking-[0.32em] text-gold/85 sm:text-[11px]">
              Luxury Treatments
            </p>
            <h1 className="services-hero-title mt-3 font-playfair text-gold">Our Services</h1>
            <p className="services-hero-desc mt-4 max-w-[22rem] font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              Expert injectables, advanced skin treatments, facials, laser services, and body sculpting
              — tailored with precision, safety, and genuine care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section id="services-grid" className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <ScrollReveal key={category.id} delay={i * 0.07}>
                  <div
                    onClick={() => setSelectedCategory(category)}
                    className="group relative flex flex-col h-full min-h-[16rem] p-6 rounded-xl border border-gold/20 bg-ivory/95 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-6 right-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-white">
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-playfair text-xl text-text-dark mb-3 group-hover:text-gold transition-colors duration-300 font-bold pr-10">
                      {category.title}
                    </h3>

                    <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-5 flex-1 font-medium">
                      {category.description}
                    </p>

                    {/* Treatment Count */}
                    <div className="pt-4 border-t border-gold/10">
                      <p className="font-inter text-xs uppercase tracking-wider text-gold/70 font-semibold">
                        {category.treatmentCount} {category.treatmentCount === 1 ? 'Treatment' : 'Treatments'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <FinancingCallout className="mt-14" />

          {/* Book CTA */}
          <ScrollReveal delay={0.2} className="text-center mt-14">
            <p className="font-cormorant text-xl italic text-soft-taupe mb-5 font-medium">
              Not sure which treatment is right for you?
            </p>
            <Link href="/booking" className="btn-gold rounded-sm inline-flex items-center gap-3 group">
              Book a Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatments Sidebar */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[300] bg-luxury-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-[301] w-full max-w-lg bg-soft-black border-l border-gold/15 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gold/10 bg-soft-black/95 px-5 py-4 backdrop-blur-md sm:px-7 sm:py-5">
                <div>
                  <span className="font-inter text-[10px] tracking-[3px] uppercase text-gold/60 block mb-1 font-semibold">
                    {selectedCategory.treatmentCount} {selectedCategory.treatmentCount === 1 ? 'Treatment' : 'Treatments'}
                  </span>
                  <h2 className="font-playfair text-2xl text-gold font-bold">{selectedCategory.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold hover:border-gold transition-all duration-300 flex-shrink-0 mt-1"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Treatments List */}
              <div className="px-5 py-6 sm:px-7 sm:py-7 space-y-5">
                {selectedCategory.treatments.map((treatment, idx) => (
                  <Link
                    key={idx}
                    href={selectedCategory.detailPage}
                    className="block p-5 rounded-xl border border-gold/20 bg-ivory/5 hover:border-gold/40 hover:bg-ivory/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-playfair text-lg text-warm-beige font-bold hover:text-gold transition-colors">
                        {treatment.name}
                      </h3>
                      {treatment.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gold rounded-full flex-shrink-0 ml-2">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-soft-taupe leading-relaxed mb-4 font-medium">
                      {treatment.description}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-gold/10">
                      <span className="text-warm-beige font-bold">{treatment.duration}</span>
                      <span className="text-gold font-bold">{treatment.price}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="sticky bottom-0 p-5 sm:p-7 border-t border-gold/10 bg-soft-black/95 backdrop-blur-md space-y-3">
                <Link
                  href={selectedCategory.detailPage}
                  className="btn-gold rounded-sm w-full flex items-center justify-center gap-3 group"
                >
                  View All Details
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/booking"
                  className="btn-outline-gold rounded-sm w-full flex items-center justify-center gap-3"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
