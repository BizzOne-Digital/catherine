"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Droplets, Zap, Activity } from "lucide-react";
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
  },
  {
    id: "fillers",
    icon: Heart,
    title: "Dermal Fillers & Skin Boosters",
    description: "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
    treatmentCount: 3,
    detailPage: "/services/dermal-fillers-skin-boosters",
  },
  {
    id: "facials",
    icon: Droplets,
    title: "Facials & Skin Health",
    description: "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
    treatmentCount: 3,
    detailPage: "/services/facials-skin-health",
  },
  {
    id: "microneedling",
    icon: Activity,
    title: "Microneedling & Skin Resurfacing",
    description: "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
    treatmentCount: 2,
    detailPage: "/services/microneedling-skin-resurfacing",
  },
  {
    id: "laser",
    icon: Zap,
    title: "Laser Hair Removal",
    description: "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
    treatmentCount: 3,
    detailPage: "/services/laser-hair-removal",
  },
  {
    id: "body",
    icon: Activity,
    title: "Body Sculpting & Contouring",
    description: "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
    treatmentCount: 1,
    detailPage: "/services/body-sculpting-contouring",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="text-center mx-auto max-w-3xl">
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.32em] text-gold/85 sm:text-[11px] mb-4">
              Luxury Treatments
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-medium">
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
                  <Link href={category.detailPage}>
                    <div className="group relative flex flex-col h-full min-h-[16rem] p-6 rounded-xl border border-gold/20 bg-ivory/95 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-1 cursor-pointer">
                  
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
                  </Link>
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
    </>
  );
}
