"use client";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, CheckCircle, ArrowRight, Shield } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export default function DaxxifyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services/injectables-wrinkle-relaxers" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Injectables & Wrinkle Relaxers
          </Link>
          
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                  Daxxify
                </h1>
                <p className="text-xl text-text-soft leading-relaxed font-medium mb-8">
                  Long-lasting neuromodulator with results up to 6 months.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Price</p>
                      <p className="text-lg font-bold text-gold">$16–$18 / unit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Duration</p>
                      <p className="text-lg font-bold text-text-dark">20–30 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Results Last</p>
                      <p className="text-lg font-bold text-text-dark">6+ months</p>
                    </div>
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
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/treatments/daxxify.jpg"
                  alt="Daxxify Treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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
                Daxxify is the newest FDA-approved neuromodulator that offers longer-lasting results than traditional options. With peptide technology, it provides smooth, natural results that can last up to 6 months or more.
              </p>
              <p className="text-lg text-text-soft leading-relaxed font-medium">
                This innovative treatment uses a unique peptide formulation that helps the active ingredient work longer, meaning you can enjoy your results for twice as long as traditional neuromodulators.
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
                  "Longer-lasting results (6+ months)",
                  "Peptide-enhanced formula",
                  "Natural-looking smoothing",
                  "Fewer treatments per year",
                  "Fast-acting results",
                  "FDA-approved safety",
                  "Reduces maintenance visits",
                  "Cost-effective over time"
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
                  Those seeking longer-lasting results with fewer maintenance appointments. Perfect for busy individuals who want to minimize treatment frequency while maintaining smooth, youthful skin.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Recovery</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  No downtime. Avoid strenuous exercise for 24 hours. Minor redness or swelling at injection sites may occur for 1-2 hours.
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
                Book your complimentary consultation and discover if Daxxify is right for you.
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
                  href="/services/injectables-wrinkle-relaxers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Injectables
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
