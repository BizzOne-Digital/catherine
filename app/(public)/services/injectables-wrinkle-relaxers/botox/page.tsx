"use client";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, CheckCircle, ArrowRight, Shield, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export default function BotoxPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services/injectables-wrinkle-relaxers" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Injectables & Wrinkle Relaxers
          </Link>
          
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gold rounded-full">
                    <Star size={12} className="inline mr-1" fill="currentColor" />
                    Popular
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 rounded-full">
                    Injectable
                  </span>
                </div>
                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                  Botox
                </h1>
                <p className="text-xl text-text-soft leading-relaxed font-medium mb-8">
                  Smooth dynamic lines on the forehead, frown and crow's feet with the gold standard in wrinkle relaxers.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Price</p>
                      <p className="text-lg font-bold text-gold">$11–$14 / unit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Duration</p>
                      <p className="text-lg font-bold text-text-dark">15–30 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-gold" />
                    <div>
                      <p className="text-xs text-text-soft uppercase tracking-wide">Results Last</p>
                      <p className="text-lg font-bold text-text-dark">3–4 months</p>
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
                  src="/images/treatments/botox.jpg"
                  alt="Botox Treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Treatment */}
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-6">
                About This Treatment
              </h2>
              <p className="text-lg text-text-soft leading-relaxed mb-6 font-medium">
                Botox is the gold standard for smoothing dynamic wrinkles caused by repeated facial expressions. Our precise injection technique targets specific muscles to soften forehead lines, frown lines (11s), and crow's feet while maintaining your natural expressions.
              </p>
              <p className="text-lg text-text-soft leading-relaxed font-medium">
                This FDA-approved treatment temporarily relaxes the muscles that cause wrinkles, resulting in smoother, more youthful-looking skin. Results typically appear within 3-5 days and continue to improve over two weeks.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-8">
                Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Smooths forehead lines and wrinkles",
                  "Reduces crow's feet and frown lines",
                  "Prevents new wrinkles from forming",
                  "Natural-looking results",
                  "No downtime required",
                  "Results last 3-4 months",
                  "Quick, comfortable treatment",
                  "FDA-approved and safe"
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

      {/* Ideal For & Recovery */}
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Ideal For</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  Anyone looking to reduce the appearance of dynamic wrinkles and prevent future lines. Suitable for adults experiencing forehead lines, frown lines between the brows, or crow's feet around the eyes.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl border border-gold/20">
                <h3 className="font-playfair text-2xl font-bold text-gold mb-4">Recovery</h3>
                <p className="text-text-dark font-medium leading-relaxed">
                  No downtime required. Some minor redness or swelling may occur at injection sites for 1-2 hours. Avoid lying down for 4 hours post-treatment and avoid strenuous exercise for 24 hours.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad-sm bg-gradient-to-b from-[#FFFBF6] to-[#FAF4EB]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-text-soft mb-8 font-medium">
                Book your complimentary consultation and discover if Botox is right for you.
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
