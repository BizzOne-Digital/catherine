"use client";
import Link from "next/link";
import { ArrowLeft, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const relatedTreatments = [
  { name: "Laser Hair Removal — Large Area", slug: "large-area", price: "From $230–$330" },
  { name: "Full Body Laser Hair Removal", slug: "full-body", price: "From $550" },
];

export default function LaserSmallAreaPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services/laser-hair-removal" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Laser Hair Removal
          </Link>
          
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                Laser Hair Removal — Small Area
              </h1>
              <p className="text-xl text-text-soft leading-relaxed font-medium mb-8">
                Lip, chin, underarms and other small areas.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <DollarSign size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-text-soft uppercase tracking-wide">Price</p>
                  <p className="text-lg font-bold text-gold">$60–$130 / session</p>
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
                Medical-grade laser hair removal targets small treatment areas including upper lip, chin, underarms, bikini line, and more. Our advanced technology safely and effectively reduces unwanted hair with long-lasting results.
              </p>
              <p className="text-lg text-text-soft leading-relaxed font-medium">
                Most clients see significant hair reduction after 6-8 sessions. Quick, comfortable treatments with minimal downtime.
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
                  "Permanent hair reduction",
                  "Quick treatment sessions",
                  "Minimal discomfort",
                  "No ingrown hairs",
                  "Smooth, hair-free skin",
                  "Safe for all skin types",
                  "Cost-effective long-term",
                  "No daily shaving needed"
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
                  Anyone tired of daily shaving, waxing, or dealing with ingrown hairs in small treatment areas. Suitable for all skin types and tones.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Recovery</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  No downtime. Slight redness for 1-2 hours. Can return to normal activities immediately. Avoid sun exposure.
                </p>
              </div>
            </ScrollReveal>
          </div>
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
                Book your complimentary consultation and discover if laser hair removal is right for you.
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
                  href="/services/laser-hair-removal"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Options
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
