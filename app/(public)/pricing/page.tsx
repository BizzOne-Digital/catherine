"use client";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Heart, Droplets, Zap, Activity, Info } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    category: "Injectables & Wrinkle Relaxers",
    icon: Sparkles,
    detailPage: "/services/injectables-wrinkle-relaxers",
    items: [
      {
        name: "Botox",
        description: "Smooth dynamic lines on the forehead, frown and crow's feet.",
        duration: "15–30 min",
        price: "From $11–$14 / unit",
      },
      {
        name: "Dysport & Nuceiva",
        description: "Alternative neuromodulators for fast-acting, natural smoothing.",
        duration: "15–30 min",
        price: "From $11–$14 / unit",
      },
    ],
  },
  {
    category: "Dermal Fillers & Skin Boosters",
    icon: Heart,
    detailPage: "/services/dermal-fillers-skin-boosters",
    items: [
      {
        name: "Dermal Fillers",
        description: "Restore volume and contour cheeks, jawline and chin.",
        duration: "45–60 min",
        price: "From $700–$1,200 / syringe",
      },
      {
        name: "Lip Filler",
        description: "Hydrate, define and gently enhance the lips.",
        duration: "45 min",
        price: "From $650–$900 / syringe",
      },
      {
        name: "Skin Booster Injections",
        description: "Profhilo & Juvéderm SkinVive for deep hydration and glow.",
        duration: "30–45 min",
        price: "From $450–$650 / session",
      },
    ],
  },
  {
    category: "Facials & Skin Health",
    icon: Droplets,
    detailPage: "/services/facials-skin-health",
    items: [
      {
        name: "Purifying Deep Clean Facial",
        description: "Deep cleanse with custom LED light therapy for radiant skin.",
        duration: "60 min",
        price: "From $145",
      },
      {
        name: "Signature Relaxation Facial",
        description: "Expert skincare meets a soothing face and neck massage.",
        duration: "60 min",
        price: "From $160",
      },
      {
        name: "Chemical Peel",
        description: "Resurface for brighter, clearer, more even-toned skin.",
        duration: "30–45 min",
        price: "From $150",
      },
    ],
  },
  {
    category: "Microneedling & Skin Resurfacing",
    icon: Activity,
    detailPage: "/services/microneedling-skin-resurfacing",
    items: [
      {
        name: "Microneedling",
        description: "Collagen-stimulating treatment for texture, pores and scars.",
        duration: "60 min",
        price: "From $250",
      },
      {
        name: "IPL Photofacial",
        description: "Target sun damage, redness and uneven pigmentation.",
        duration: "30–40 min",
        price: "From $250",
      },
    ],
  },
  {
    category: "Laser Hair Removal",
    icon: Zap,
    detailPage: "/services/laser-hair-removal",
    items: [
      {
        name: "Laser Hair Removal — Small Area",
        description: "Lip, chin, underarms and other small areas.",
        duration: "15–20 min",
        price: "From $60–$130 / session",
      },
      {
        name: "Laser Hair Removal — Large Area",
        description: "Full legs, full arms, back or Brazilian.",
        duration: "30–60 min",
        price: "From $230–$330 / session",
      },
      {
        name: "Full Body Laser Hair Removal",
        description: "All major body areas in one session (excludes back).",
        duration: "75–90 min",
        price: "From $550 / session",
      },
    ],
  },
  {
    category: "Body Sculpting & Contouring",
    icon: Activity,
    detailPage: "/services/body-sculpting-contouring",
    items: [
      {
        name: "Body Sculpting with HIFEM",
        description: "Build muscle and tone a target area — no downtime.",
        duration: "30 min",
        price: "From $300 / session",
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 page-text-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.06)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block font-semibold">
              Transparent Pricing
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl text-warm-beige leading-tight mb-5 text-balance font-bold">
              Treatment <em className="text-gold not-italic">Pricing</em>
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-2xl mx-auto font-medium">
              Clear, upfront pricing for all our medical aesthetic treatments. Every plan is personalized during your complimentary consultation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="btn-gold rounded-sm inline-flex items-center gap-3 group font-bold"
            >
              Book Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn-outline-gold rounded-sm font-bold">
              View All Services
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="section-pad section-warm">
        <div className="container-luxury max-w-5xl">
          <div className="space-y-12">
            {treatments.map((category, idx) => {
              const Icon = category.icon;
              return (
                <ScrollReveal key={category.category} delay={idx * 0.1}>
                  <div className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <Icon size={22} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <h2 className="font-playfair text-2xl sm:text-3xl text-text-dark font-bold">
                        {category.category}
                      </h2>
                    </div>

                    {/* Treatment Items */}
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          href={category.detailPage}
                          className="block group"
                        >
                          <div className="rounded-xl border border-gold/20 bg-ivory/95 p-5 sm:p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-playfair text-lg sm:text-xl text-text-dark font-bold mb-2 group-hover:text-gold transition-colors">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-soft-taupe font-medium leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                                <div className="flex items-center gap-1.5 text-soft-taupe/70 order-2 sm:order-1">
                                  <Clock size={14} />
                                  <span className="text-xs font-medium">{item.duration}</span>
                                </div>
                                <span className="font-cormorant text-lg sm:text-xl text-gold italic font-semibold order-1 sm:order-2">
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Disclaimer */}
          <ScrollReveal delay={0.4} className="mt-14">
            <div className="rounded-xl border border-gold/20 bg-[#FAF4EB] p-6">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-soft-taupe font-medium leading-relaxed">
                  Prices shown are estimates based on average Toronto rates and are for guidance only. 
                  Final pricing depends on your individual treatment plan and is confirmed during your consultation. 
                  Packages and seasonal promotions may offer better value.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Financing CTA */}
          <ScrollReveal delay={0.5} className="mt-14">
            <div className="rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,151,47,0.1)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <h3 className="font-playfair text-2xl sm:text-3xl text-white font-bold mb-3">
                  Spread the cost with Beautifi
                </h3>
                <p className="text-warm-beige/80 font-medium mb-7 max-w-xl mx-auto">
                  Turn any treatment into easy monthly payments — no financial strain.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/financing"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-deep-gold text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                  >
                    Explore financing
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                  >
                    Book now
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
