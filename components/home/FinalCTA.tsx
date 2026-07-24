"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import GoldParticles from "@/components/ui/GoldParticles";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 section-warm-deep overflow-hidden">
      {/* Particles */}
      <GoldParticles count={30} />

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,100vw)] h-[min(400px,60vw)] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[5px] uppercase text-gold font-bold mb-6 block">
              Begin Your Transformation
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-warm-beige leading-tight mb-6">
              Your Most Confident{" "}
              <em className="text-gold not-italic">Self</em> Awaits
            </h2>
            <div className="w-16 h-px bg-gold/50 mx-auto mb-7" />
            <p className="font-cormorant text-xl md:text-2xl italic text-warm-beige/70 mb-10 leading-relaxed">
              Take the first step toward results that feel effortlessly, beautifully you. 
              Your complimentary consultation is waiting.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/booking"
                className="btn-gold rounded-sm inline-flex items-center gap-3 group px-10 py-4"
              >
                Book Free Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <a
              href="tel:+19051234567"
              className="btn-outline-gold rounded-sm inline-flex items-center gap-3"
            >
              <Phone size={14} />
              (905) 123-4567
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-inter text-xs font-semibold text-soft-taupe tracking-wide">
              Lumina Medi Spa · 123 Luxury Lane, Mississauga, ON · By Appointment
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
