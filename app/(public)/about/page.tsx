import { Metadata } from "next";
import { CheckCircle, Award, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Lumina Medi Spa",
  description: "Meet the team behind Lumina Medi Spa — expert medical aesthetic specialists dedicated to natural, personalized results.",
};

const values = [
  { icon: Shield, title: "Medical Safety First", desc: "All treatments are performed with rigorous medical standards and oversight by licensed professionals." },
  { icon: Heart, title: "Genuine Care", desc: "We listen. Every consultation begins with understanding your goals, concerns, and lifestyle." },
  { icon: Award, title: "Expertise & Precision", desc: "With 10+ years in medical aesthetics, our technique is refined, artistic, and evidence-based." },
  { icon: Users, title: "You-Centered Results", desc: "We believe in enhancing your natural beauty — never altering who you are, only elevating it." },
];

const credentials = [
  "Registered Nurse (RN) — Ontario College of Nurses",
  "Certified Medical Aesthetic Injector",
  "Advanced Injectable Training — Botox, Fillers, Mesotherapy",
  "IPL & Laser Therapy Certified",
  "Body Contouring & Muscle Stimulation Certified",
  "Ongoing Education in Aesthetic Medicine",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero relative min-h-0 overflow-hidden lg:min-h-[min(92vh,820px)]">
        <div className="about-hero-content relative z-10 mx-auto flex max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-28 lg:min-h-[min(92vh,820px)] lg:px-8 lg:py-32">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[520px]">
            <h1 className="about-hero-title font-playfair leading-[1.08] tracking-tight text-warm-beige">
              <span className="block">About</span>
              <span className="mt-1 block">Lumina Medi Spa</span>
            </h1>

            <div className="about-hero-divider mt-5 flex items-center justify-start gap-0">
              <span className="about-hero-divider-line w-16" />
              <svg viewBox="0 0 12 12" className="mx-3 h-[7px] w-[7px] shrink-0 text-gold/75" aria-hidden="true">
                <path d="M6 0 L6.8 4.2 L11 5 L6.8 5.8 L6 10 L5.2 5.8 L1 5 L5.2 4.2 Z" fill="currentColor" />
              </svg>
              <span className="about-hero-divider-line w-16" />
            </div>

            <p className="about-hero-tagline mt-5 font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-gold sm:text-[11px]">
              Woman-Owned. Medical-Grade. Results Driven.
            </p>

            <p className="about-hero-desc mt-6 max-w-md font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              At Lumina Medi Spa, we combine advanced medical aesthetics with personalized care to help
              you look refreshed, natural, and confident in your own skin.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="about-story-grid items-center">
            <ScrollReveal direction="left" className="about-story-profile">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] w-full bg-gradient-to-br from-[#F7EFE4] to-[#EDE3D3] flex flex-col items-center justify-center p-10 border border-gold/25 shadow-card">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold/30 to-deep-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                  <span className="font-playfair text-5xl text-gold">C</span>
                </div>
                <h3 className="font-playfair text-2xl text-text-dark mb-2">Catherine Zhang</h3>
                <p className="font-cormorant text-lg italic text-gold mb-4">RN, Founder & Lead Injector</p>
                <div className="w-12 h-px bg-gold/30 mb-5" />
                <p className="font-inter text-sm text-soft-taupe text-center leading-relaxed">
                  "My passion has always been helping people feel confident in their own skin — 
                  not by chasing perfection, but by celebrating the beauty that&apos;s already there."
                </p>
              </div>
            </ScrollReveal>

            <div className="about-story-content space-y-6">
              <ScrollReveal direction="right">
                <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 block mb-3">Our Beginning</span>
                <h2 className="font-playfair text-4xl text-warm-beige leading-tight mb-5">
                  Where Medical Science Meets <em className="text-gold not-italic">Artistry</em>
                </h2>
                <div className="w-10 h-px bg-gold/40 mb-6" />
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.1}>
                <p className="font-inter text-base text-soft-taupe leading-relaxed">
                  Lumina Medi Spa was born from a simple conviction: that every person deserves access to 
                  safe, effective, and personalized aesthetic care — delivered with warmth, honesty, and expertise.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.15}>
                <p className="font-inter text-base text-soft-taupe leading-relaxed">
                  Founded by Catherine, a Registered Nurse with over a decade of experience in medical aesthetics, 
                  Lumina has become Mississauga&apos;s trusted destination for those seeking results that look and feel authentically them.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <p className="font-inter text-base text-soft-taupe leading-relaxed">
                  Every treatment plan we create is individually designed — never copied from a template. 
                  We take the time to understand your unique anatomy, your goals, and your life before we ever pick up an instrument.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.3}>
                <Link href="/booking" className="btn-gold rounded-sm inline-flex items-center gap-3 mt-2">
                  Book a Consultation
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad section-warm-alt">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionHeading eyebrow="What We Stand For" title="Our Values" />
          </ScrollReveal>
          <div className="about-values-grid mt-12">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1} className="h-full">
                <div className="about-value-card">
                  <div className="about-value-icon">
                    <Icon size={20} className="text-gold" strokeWidth={1.4} />
                  </div>
                  <h3 className="about-value-title">{title}</h3>
                  <p className="about-value-desc">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-pad section-warm">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <SectionHeading eyebrow="Qualifications" title="Credentials & Training" />
          </ScrollReveal>
          <ul className="mt-10 space-y-3">
            {credentials.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.08}>
                <li className="flex items-center gap-4 p-4 rounded-lg border border-gold/20 bg-ivory/80">
                  <CheckCircle size={16} className="text-gold flex-shrink-0" />
                  <span className="font-inter text-sm text-warm-beige/80">{c}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-sm section-warm-deep text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl text-warm-beige mb-4">Ready to Meet Us?</h2>
            <p className="font-cormorant text-lg italic text-soft-taupe mb-7">
              Book your complimentary consultation and let&apos;s start your journey together.
            </p>
            <Link href="/booking" className="btn-gold rounded-sm">Book Free Consultation</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
