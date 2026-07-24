"use client";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, Star, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    id: 1,
    name: "Dermal Fillers",
    popular: false,
    description: "Restore volume and contour cheeks, jawline and chin.",
    detailedDescription: "Premium hyaluronic acid dermal fillers restore lost volume, enhance facial contours, and create beautifully balanced proportions. We use advanced techniques to sculpt and define your cheeks, jawline, chin, and other areas for natural, elegant results.",
    price: "From $700–$1,200 / syringe",
    duration: "45–60 min",
    benefits: [
      "Restores youthful volume and contours",
      "Enhances cheekbones and jawline definition",
      "Smooths deep folds and wrinkles",
      "Immediate visible results",
      "Long-lasting (12-18 months)",
      "Reversible if needed"
    ],
    ideal: "Anyone experiencing volume loss in the face or seeking enhanced facial contours",
    recovery: "Minimal downtime. Some swelling or bruising may occur for 3-7 days."
  },
  {
    id: 2,
    name: "Lip Filler",
    popular: true,
    description: "Hydrate, define and gently enhance the lips.",
    detailedDescription: "Our lip enhancement technique focuses on creating natural, beautifully balanced lips with improved hydration, definition, and subtle volume. We prioritize proportions that complement your unique facial features.",
    price: "From $650–$900 / syringe",
    duration: "45 min",
    benefits: [
      "Natural-looking volume and shape",
      "Enhanced lip definition and symmetry",
      "Improved hydration and smoothness",
      "Customizable to your aesthetic goals",
      "Immediate results",
      "Long-lasting (9-12 months)"
    ],
    ideal: "Those seeking fuller, more defined lips or to correct asymmetry",
    recovery: "Expect swelling for 2-5 days. Ice and avoiding strenuous activity helps minimize."
  },
  {
    id: 3,
    name: "Skin Booster Injections",
    popular: false,
    description: "Profhilo & Juvéderm SkinVive for deep hydration and glow.",
    detailedDescription: "Skin boosters like Profhilo and Juvéderm SkinVive deliver pure hyaluronic acid into the skin for deep hydration, improved elasticity, and a luminous glow. Unlike traditional fillers, these treatments enhance overall skin quality rather than adding volume.",
    price: "From $450–$650 / session",
    duration: "30–45 min",
    benefits: [
      "Deep, lasting hydration",
      "Improved skin elasticity and firmness",
      "Natural radiant glow",
      "Smooths fine lines and crepiness",
      "Suitable for face, neck, and hands",
      "Results improve over time"
    ],
    ideal: "Anyone seeking improved skin texture, hydration, and overall radiance",
    recovery: "Minimal. Small bumps at injection sites may be visible for 1-2 days."
  }
];

export default function DermalFillersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Services
          </Link>
          
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 rounded-full mb-4">
                Category
              </span>
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                Dermal Fillers & Skin Boosters
              </h1>
              <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-medium">
                Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="grid gap-8 lg:gap-12">
            {treatments.map((treatment, index) => (
              <ScrollReveal key={treatment.id} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-white to-[#FFFBF6] border-2 border-gold/20 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(196,151,47,0.15)]">
                  {/* Treatment Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gold">
                          {treatment.name}
                        </h2>
                        {treatment.popular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gold rounded-full">
                            <Star size={12} fill="currentColor" />
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-text-soft font-medium">{treatment.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-gold font-semibold">
                        <DollarSign size={18} />
                        <span className="text-lg">{treatment.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-soft text-sm">
                        <Clock size={16} />
                        <span>{treatment.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-base text-text-dark leading-relaxed mb-6 font-medium">
                    {treatment.detailedDescription}
                  </p>

                  {/* Benefits Grid */}
                  <div className="mb-8">
                    <h3 className="font-playfair text-xl font-bold text-gold mb-4">Benefits</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {treatment.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-text-dark font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6 p-6 bg-white/60 rounded-xl border border-gold/10">
                    <div>
                      <h4 className="font-semibold text-gold mb-2 text-sm uppercase tracking-wide">Ideal For</h4>
                      <p className="text-sm text-text-dark font-medium">{treatment.ideal}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold mb-2 text-sm uppercase tracking-wide">Recovery</h4>
                      <p className="text-sm text-text-dark font-medium">{treatment.recovery}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-deep-gold text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(196,151,47,0.3)] hover:-translate-y-0.5"
                  >
                    Book This Treatment
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad-sm bg-gradient-to-b from-[#FFFBF6] to-[#FAF4EB]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4">
                Ready to Reveal Your Best Self?
              </h2>
              <p className="text-lg text-text-soft mb-8 font-medium">
                Book your complimentary consultation and discover which treatment is right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-deep-gold text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
