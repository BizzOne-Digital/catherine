"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const highlights = [
  "Registered Nurse with 10+ years of aesthetic expertise",
  "Medical oversight ensuring the highest safety standards",
  "Customized treatment plans — never cookie-cutter",
  "Premium medical-grade products and technology",
  "Natural, balanced results that enhance your features",
];

export default function AboutPreview() {
  return (
    <section className="section-pad section-warm relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-20 right-20 w-64 h-64 rounded-full bg-gold/4 blur-[100px]" />

      <div className="container-luxury">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual side */}
          <ScrollReveal direction="left">
            <div className="relative overflow-x-clip px-2 sm:px-0">
              {/* Main card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/about-clinic.jpg"
                  alt="Lumina Medi Spa clinic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
                {/* Border overlay */}
                <div className="absolute inset-0 border border-gold/15 rounded-2xl" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                className="absolute right-0 top-8 glass-card py-3 px-5 shadow-gold-sm sm:-right-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-playfair text-2xl text-gold">10+</p>
                <p className="font-inter text-xs text-soft-taupe tracking-wide">Years Expertise</p>
              </motion.div>
              <motion.div
                className="absolute left-0 bottom-12 glass-card py-3 px-5 shadow-gold-sm sm:-left-4"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <p className="font-playfair text-2xl text-gold">500+</p>
                <p className="font-inter text-xs text-soft-taupe tracking-wide">Happy Clients</p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Content side */}
          <div>
            <ScrollReveal direction="right">
              <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold font-bold mb-4 block">
                Meet Your Specialist
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-warm-beige leading-tight mb-5">
                Care That Goes{" "}
                <em className="text-gold not-italic">Beyond the Surface</em>
              </h2>
              <div className="w-12 h-px bg-gold/40 mb-6" />
              <p className="font-inter text-base text-soft-taupe leading-relaxed mb-6">
                At Lumina Medi Spa, every treatment begins with a conversation. We believe beautiful results come from truly
                understanding your goals, your anatomy, and your lifestyle — not from a one-size-fits-all approach.
              </p>
              <p className="font-cormorant text-xl italic text-warm-beige/80 mb-8">
                "My goal is never to change who you are — it&apos;s to help you look like the best version of yourself."
              </p>
            </ScrollReveal>

            {/* Highlights */}
            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <ScrollReveal key={item} delay={0.1 * i} direction="right">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="font-inter text-sm text-warm-beige/80">{item}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal direction="right" delay={0.4}>
              <Link
                href="/about"
                className="btn-outline-gold rounded-sm group inline-flex items-center gap-3"
              >
                Learn More About Us
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
