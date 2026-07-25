"use client";
import Link from "next/link";
import { ArrowLeft, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

const relatedTreatments = [
  { name: "Purifying Deep Clean Facial", slug: "purifying-facial", price: "From $145", image: "/images/treatments/purifying-facial.jpg" },
  { name: "Chemical Peel", slug: "chemical-peel", price: "From $150", image: "/images/treatments/chemical-peel.jpg" },
];

export default function RelaxationFacialPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services/facials-skin-health" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Facials & Skin Health
          </Link>
          
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                Signature Relaxation Facial
              </h1>
              <p className="text-xl text-text-soft leading-relaxed font-medium mb-8">
                Expert skincare meets a soothing face and neck massage for ultimate rejuvenation.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <DollarSign size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-text-soft uppercase tracking-wide">Price</p>
                  <p className="text-lg font-bold text-gold">From $160</p>
                </div>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-deep-gold text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
              >
                Book This Treatment
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-6">
                About This Treatment
              </h2>
              <p className="text-lg text-text-soft leading-relaxed mb-6 font-medium">
                Our Signature Relaxation Facial combines medical-grade skincare with a therapeutic face and neck massage. This treatment is designed to hydrate, nourish, and restore while providing a deeply relaxing experience.
              </p>
              <p className="text-lg text-text-soft leading-relaxed font-medium">
                Perfect for all skin types, this facial addresses your specific concerns while helping you unwind and destress. Leave feeling refreshed, radiant, and rejuvenated.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-8">
                Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Deeply hydrating and nourishing",
                  "Relaxing face and neck massage",
                  "Reduces stress and tension",
                  "Improves circulation",
                  "Brightens complexion",
                  "Customized to your skin type",
                  "No downtime",
                  "Instant glow"
                ].map((benefit, i) => (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gold/10">
                      <CheckCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-text-dark font-medium">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Ideal For</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  All skin types, especially those seeking relaxation and stress relief along with skincare benefits. Perfect for maintenance and self-care.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Recovery</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  No downtime. Skin may be slightly pink for 30 minutes. Can resume all activities immediately.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-8">
              Related Treatments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {relatedTreatments.map((treatment, index) => (
                <ScrollReveal key={treatment.slug} delay={index * 0.1}>
                  <Link href={`/services/facials-skin-health/${treatment.slug}`}>
                    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(196,151,47,0.15)] cursor-pointer">
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gold/5 to-gold/10">
                        <Image
                          src={treatment.image}
                          alt={treatment.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-playfair text-xl font-bold text-text-dark mb-2 group-hover:text-gold transition-colors">
                          {treatment.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gold font-bold text-sm">
                          <DollarSign size={14} />
                          <span>{treatment.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad-sm bg-gradient-to-b from-[#FFFBF6] to-[#FAF4EB]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-text-soft mb-8 font-medium">
                Book your complimentary consultation and discover if this facial is right for you.
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
                  href="/services/facials-skin-health"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Facials
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
