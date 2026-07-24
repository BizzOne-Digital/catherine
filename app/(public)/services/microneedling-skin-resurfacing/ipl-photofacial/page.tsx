"use client";
import Link from "next/link";
import { ArrowLeft, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

const relatedTreatments = [
  { name: "Microneedling", slug: "microneedling", price: "From $250", image: "/images/treatments/microneedling.jpg" },
];

export default function IPLPhotofacialPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services/microneedling-skin-resurfacing" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Microneedling & Skin Resurfacing
          </Link>
          
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                IPL Photofacial
              </h1>
              <p className="text-xl text-text-soft leading-relaxed font-medium mb-8">
                Target sun damage, redness and uneven pigmentation.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <DollarSign size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-text-soft uppercase tracking-wide">Price</p>
                  <p className="text-lg font-bold text-gold">From $250</p>
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
                IPL (Intense Pulsed Light) Photofacial uses broad-spectrum light to target pigmentation, sun damage, redness, and uneven skin tone. The light energy is absorbed by pigmented areas and blood vessels, breaking them down so your body can naturally eliminate them.
              </p>
              <p className="text-lg text-text-soft leading-relaxed font-medium">
                This non-invasive treatment effectively treats various skin concerns including age spots, freckles, rosacea, broken capillaries, and overall skin texture. Results improve progressively over several weeks as your skin heals and regenerates.
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
                  "Reduces sun damage and age spots",
                  "Minimizes redness and rosacea",
                  "Evens out skin tone",
                  "Reduces appearance of broken capillaries",
                  "Improves overall skin texture",
                  "No downtime required",
                  "Quick treatment sessions",
                  "Long-lasting results"
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
                  Sun damage, age spots, rosacea, broken capillaries, uneven pigmentation, or anyone seeking to improve overall skin clarity and tone.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Recovery</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  Minimal downtime. Some redness for 2-4 hours post-treatment. Treated pigmentation may darken before flaking off over 1-2 weeks. Avoid sun exposure.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-8">
              Related Treatments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {relatedTreatments.map((treatment, index) => (
                <ScrollReveal key={treatment.slug} delay={index * 0.1}>
                  <Link href={`/services/microneedling-skin-resurfacing/${treatment.slug}`}>
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
                Book your complimentary consultation and discover if IPL Photofacial is right for you.
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
                  href="/services/microneedling-skin-resurfacing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Treatments
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
