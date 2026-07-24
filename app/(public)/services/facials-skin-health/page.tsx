"use client";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, Star, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const treatments = [
  {
    id: 1,
    name: "Purifying Deep Clean Facial",
    popular: true,
    description: "Deep cleanse with custom LED light therapy for radiant skin.",
    detailedDescription: "Our signature deep cleansing facial combines medical-grade extraction, exfoliation, and customized LED light therapy to purify pores, calm inflammation, and reveal clearer, more radiant skin. Each treatment is tailored to your skin's unique needs.",
    price: "From $145",
    duration: "60 min",
    benefits: [
      "Deep pore cleansing and extraction",
      "Custom LED therapy (blue, red, or combination)",
      "Reduces acne and breakouts",
      "Calms redness and inflammation",
      "Improves overall skin texture",
      "Instant radiant glow"
    ],
    ideal: "Congested skin, acne-prone skin, or anyone seeking a deep cleanse and glow",
    recovery: "None. You may experience slight redness for 1-2 hours post-treatment."
  },
  {
    id: 2,
    name: "Signature Relaxation Facial",
    popular: false,
    description: "Expert skincare meets a soothing face and neck massage.",
    detailedDescription: "Indulge in our most luxurious facial experience. This treatment combines medical-grade products with a deeply relaxing face, neck, and shoulder massage. Perfect for stress relief while achieving beautiful, glowing skin.",
    price: "From $160",
    duration: "60 min",
    benefits: [
      "Deep relaxation and stress relief",
      "Customized to your skin type",
      "Soothing face and neck massage",
      "Hydration and nourishment",
      "Improves circulation",
      "Leaves skin soft and glowing"
    ],
    ideal: "Anyone seeking relaxation with skin rejuvenation, all skin types",
    recovery: "None. You'll leave feeling refreshed and glowing."
  },
  {
    id: 3,
    name: "Chemical Peel",
    popular: false,
    description: "Resurface for brighter, clearer, more even-toned skin.",
    detailedDescription: "Medical-grade chemical peels use carefully selected acids to exfoliate the top layers of skin, revealing fresh, bright, even-toned skin beneath. Effective for treating hyperpigmentation, acne scars, fine lines, and dullness.",
    price: "From $150",
    duration: "30–45 min",
    benefits: [
      "Reduces hyperpigmentation and dark spots",
      "Smooths fine lines and wrinkles",
      "Improves acne scars and texture",
      "Brightens overall complexion",
      "Stimulates collagen production",
      "Results improve with repeat treatments"
    ],
    ideal: "Hyperpigmentation, acne scarring, sun damage, uneven tone, or aging skin",
    recovery: "Expect light peeling for 3-7 days. Avoid sun exposure and use SPF."
  }
];

export default function FacialsPage() {
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
                Facials & Skin Health
              </h1>
              <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-medium">
                Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.
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
