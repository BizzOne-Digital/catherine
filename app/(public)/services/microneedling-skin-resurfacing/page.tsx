"use client";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, Star, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    id: "microneedling",
    name: "Microneedling",
    slug: "microneedling",
    popular: true,
    description: "Stimulate collagen for smoother, firmer, more even skin.",
    detailedDescription: "Microneedling uses fine needles to create controlled micro-injuries in the skin, triggering your body's natural healing response and collagen production. This treatment improves texture, reduces scarring, minimizes pores, and creates overall skin renewal.",
    price: "From $250–$400",
    duration: "60–75 min",
    benefits: [
      "Stimulates natural collagen production",
      "Reduces acne scars and hyperpigmentation",
      "Minimizes pore size",
      "Smooths fine lines and wrinkles",
      "Improves skin texture and tone",
      "Enhances product absorption"
    ],
    ideal: "Acne scars, large pores, uneven texture, fine lines, or hyperpigmentation",
    recovery: "2-3 days of redness and sensitivity. Avoid sun exposure and follow aftercare protocol."
  },
  {
    id: "rf-microneedling",
    name: "RF Microneedling",
    slug: "rf-microneedling",
    popular: true,
    description: "Advanced microneedling with radiofrequency for skin tightening.",
    detailedDescription: "RF Microneedling combines traditional microneedling with radiofrequency energy to penetrate deeper layers of skin. This advanced treatment tightens skin, reduces wrinkles more effectively, and provides dramatic results for aging or lax skin.",
    price: "From $450–$700",
    duration: "60–90 min",
    benefits: [
      "Tightens and lifts sagging skin",
      "Reduces deep wrinkles and fine lines",
      "Improves skin elasticity and firmness",
      "Treats acne scars more effectively",
      "Refines texture and pore size",
      "Long-lasting collagen stimulation"
    ],
    ideal: "Skin laxity, deep wrinkles, severe acne scarring, or those seeking dramatic tightening",
    recovery: "3-5 days of redness and mild swelling. Avoid makeup and sun exposure during healing."
  },
  {
    id: "prp-microneedling",
    name: "Microneedling with PRP",
    slug: "prp-microneedling",
    popular: false,
    description: "Microneedling enhanced with your own platelet-rich plasma.",
    detailedDescription: "Combining microneedling with PRP (platelet-rich plasma) from your own blood creates a powerful regenerative treatment. PRP contains growth factors that accelerate healing, enhance collagen production, and amplify results for maximum skin rejuvenation.",
    price: "From $500–$750",
    duration: "90 min",
    benefits: [
      "Accelerates healing and results",
      "Enhanced collagen production",
      "Natural growth factors boost skin renewal",
      "Treats stubborn scars more effectively",
      "Improves overall skin quality",
      "Uses your body's own healing properties"
    ],
    ideal: "Severe scarring, advanced aging, or those seeking maximum regenerative results",
    recovery: "3-5 days of redness. PRP may cause additional swelling for 24-48 hours."
  },
  {
    id: "nano-needling",
    name: "Nano Needling",
    slug: "nano-needling",
    popular: false,
    description: "Gentle surface exfoliation for sensitive skin.",
    detailedDescription: "Nano needling is a gentler alternative to traditional microneedling, using ultra-fine nano tips to exfoliate the top layer of skin without penetrating deeply. Perfect for sensitive skin or those new to needling treatments.",
    price: "From $150–$200",
    duration: "45 min",
    benefits: [
      "Gentle surface exfoliation",
      "Enhances product penetration",
      "Brightens and smooths skin",
      "No downtime",
      "Safe for sensitive skin",
      "Improves overall radiance"
    ],
    ideal: "Sensitive skin, first-time clients, or those seeking gentle exfoliation",
    recovery: "None to minimal. Slight redness may occur for 1-2 hours."
  }
];

export default function MicroneedlingPage() {
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
                Microneedling & Skin Resurfacing
              </h1>
              <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-medium">
                Stimulate collagen, smooth texture, and reduce scarring with advanced needling and resurfacing treatments.
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
