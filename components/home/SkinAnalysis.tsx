"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Scan, ClipboardList, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    icon: Scan,
    step: "01",
    title: "Skin Assessment",
    description: "We analyze your skin type, concerns, and goals using a comprehensive questionnaire and visual consultation.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Personalized Plan",
    description: "Our specialist creates a tailored treatment roadmap addressing your specific concerns with realistic expectations.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Your Transformation",
    description: "Begin your aesthetic journey with ongoing support, follow-ups, and adjustments as your skin evolves.",
  },
];

export default function SkinAnalysis() {
  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      {/* Diagonal clip top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* BG glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,181,109,0.04)_0%,transparent_70%)]" />

      <div className="container-luxury">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
              Complimentary
            </span>
            <h2 className="font-playfair text-4xl lg:text-5xl text-warm-beige leading-tight mb-4">
              Your Free Skin <em className="text-gold not-italic">Analysis</em>
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-2xl mx-auto">
              Every great result starts with truly understanding your skin. 
              Book your complimentary consultation and let&apos;s build your personalized plan together.
            </p>
          </ScrollReveal>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 relative items-stretch">
            {/* Connector lines on desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gold/20" />

            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <ScrollReveal key={step} delay={i * 0.15} className="h-full">
                <div className="relative flex h-full min-h-[17rem] flex-col items-center text-center p-6 pt-8 rounded-xl border border-gold/20 surface-card">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ivory px-3">
                    <span className="font-cormorant text-sm italic text-gold/60">{step}</span>
                  </div>
                  {/* Icon */}
                  <div className="w-14 h-14 shrink-0 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 mt-3">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-playfair text-lg text-text-dark mb-2 shrink-0">{title}</h3>
                  <p className="font-inter text-sm text-soft-taupe leading-relaxed flex-1">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Box */}
          <ScrollReveal delay={0.3}>
            <div className="text-center p-10 rounded-2xl border border-gold/25 bg-ivory/90 relative overflow-hidden shadow-card">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <p className="font-playfair text-2xl text-text-dark mb-3">
                Ready to Start Your Journey?
              </p>
              <p className="font-inter text-sm text-soft-taupe mb-7 max-w-md mx-auto">
                Book your complimentary skin consultation today — no obligation, just honest advice 
                and a personalized plan crafted for you.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/booking"
                  className="btn-gold rounded-sm inline-flex items-center gap-3 group"
                >
                  Book Free Consultation
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
