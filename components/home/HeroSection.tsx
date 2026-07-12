"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Cross, ScanFace, HandHeart } from "lucide-react";

const featureCards = [
  { icon: Stethoscope, title: "Registered Nurse Expertise" },
  { icon: Cross, title: "Medical Oversight" },
  { icon: ScanFace, title: "Natural-Looking Results" },
  { icon: HandHeart, title: "Personalized Care" },
];

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden lg:min-h-screen">
      {/* Full hero background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col lg:min-h-screen">
        <div className="flex-1 px-6 pb-6 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pb-48 lg:pt-40">
          <div className="max-w-xl lg:max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hero-eyebrow mb-5 font-inter text-[10px] font-light uppercase tracking-[0.32em] text-gold/80 sm:text-[11px]"
            >
              ✦ Elevated Care. Exceptional Results.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hero-heading font-playfair leading-[1.1] tracking-tight"
            >
              <span className="block text-[clamp(2.1rem,5.2vw,3.4rem)] text-warm-beige">
                Medical Aesthetics Designed
              </span>
              <span className="mt-1 block text-[clamp(2.1rem,5.2vw,3.4rem)] text-warm-beige">
                Around{" "}
                <span className="hero-heading-you font-great-vibes text-[clamp(2.8rem,6.5vw,4.2rem)] text-gold">
                  You
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hero-description mt-6 max-w-md font-inter text-sm font-light leading-relaxed text-warm-beige/75 sm:text-[15px]"
            >
              Expert injectables, advanced skin treatments, laser services, and body sculpting.
              Personalized treatments with genuine care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link href="/booking" className="hero-btn-primary group">
                Book Consultation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/services" className="hero-btn-secondary group">
                Explore Treatments
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="hero-cards relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-4 pb-8 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:absolute lg:bottom-8 lg:left-0 lg:right-0 lg:px-8 lg:pb-0 xl:grid-cols-4"
        >
          {featureCards.map(({ icon: Icon, title }) => (
            <div key={title} className="hero-card">
              <div className="hero-card-icon">
                <Icon size={22} strokeWidth={1.3} />
              </div>
              <div className="hero-card-body">
                <p className="hero-card-title">{title}</p>
                <span className="hero-card-line" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
