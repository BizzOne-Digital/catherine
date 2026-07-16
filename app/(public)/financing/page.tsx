import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  Home,
  Lock,
  MailCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  Wallet,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MEDICARD_APPLY_URL, FINANCING_DISCLAIMER } from "@/lib/financing";

export const metadata: Metadata = {
  title: "Patient Financing | Lumina Medi Spa",
  description:
    "Flexible patient financing through Medicard by iFinance. Divide the cost of your Lumina Medi Spa treatments into manageable payments with a secure online application.",
};

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Choose Your Treatment",
    description:
      "Meet with the Lumina Medi Spa team to discuss your goals and recommended treatment options.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Apply Online",
    description:
      "Open the secure Medicard application and complete the form using your personal information.",
  },
  {
    icon: MailCheck,
    step: "03",
    title: "Receive a Decision",
    description:
      "Medicard will review your application and communicate directly with you regarding the result.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Begin Your Treatment",
    description:
      "Once approved and arranged, contact Lumina Medi Spa to proceed with your treatment plan.",
  },
];

const benefits = [
  { icon: Lock, label: "Secure online application" },
  { icon: Wallet, label: "Convenient monthly payment options" },
  { icon: Timer, label: "Quick and easy application process" },
  { icon: Home, label: "Apply from home or while visiting the clinic" },
  { icon: ClipboardCheck, label: "Financing managed directly by Medicard/iFinance" },
  { icon: ShieldCheck, label: "No financial information stored by Lumina Medi Spa" },
];

function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`mx-auto max-w-2xl font-inter text-xs leading-relaxed text-soft-taupe ${className}`}>
      {FINANCING_DISCLAIMER}
    </p>
  );
}

export default function FinancingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 page-text-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.06)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
              Medicard by iFinance
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl text-warm-beige leading-tight mb-5 text-balance">
              Flexible Financing for Your{" "}
              <em className="text-gold not-italic">Treatment</em>
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-2xl mx-auto">
              Invest in your confidence today and pay over time. Lumina Medi Spa offers
              convenient patient financing through Medicard by iFinance, allowing eligible
              clients to divide the cost of their treatments into manageable payments.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={MEDICARD_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply for financing on the official Medicard website (opens in a new tab)"
              className="btn-gold rounded-sm inline-flex items-center gap-3 group"
            >
              Apply for Financing
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/booking" className="btn-outline-gold rounded-sm">
              Book a Consultation
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <Disclaimer className="mt-8 text-soft-taupe/80" />
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal className="text-center mb-14">
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
              Simple Process
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight mb-4">
              How It <span className="text-gold">Works</span>
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {steps.map(({ icon: Icon, step, title, description }, i) => (
              <ScrollReveal key={step} delay={i * 0.1} className="h-full">
                <div className="relative flex h-full min-h-[15rem] flex-col items-center p-6 pt-8 text-center rounded-xl border border-gold/20 surface-card transition-all duration-500 hover:border-gold/40 hover:shadow-gold-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ivory px-3">
                    <span className="font-cormorant text-sm italic text-gold/60">{step}</span>
                  </div>
                  <div className="mb-4 mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 shrink-0 font-playfair text-lg text-text-dark">{title}</h3>
                  <p className="flex-1 font-inter text-sm leading-relaxed text-soft-taupe">
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad section-warm-alt">
        <div className="container-luxury">
          <ScrollReveal className="text-center mb-14">
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
              Why Medicard
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight mb-4 text-balance">
              A Simple and Convenient Way to <span className="text-gold">Pay</span>
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, label }, i) => (
              <ScrollReveal key={label} delay={i * 0.07} className="h-full">
                <div className="flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-3 rounded-xl border border-gold/20 surface-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <p className="font-inter text-sm leading-snug text-text-dark/85">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">
                Scan &amp; Apply
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl text-text-dark leading-tight mb-4">
                Apply Using Your <span className="text-gold">Phone</span>
              </h2>
              <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
              <p className="mx-auto mb-10 max-w-xl font-inter text-sm leading-relaxed text-soft-taupe">
                Scan the Medicard QR code with your phone to open Lumina Medi Spa&apos;s secure
                financing application.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mx-auto inline-flex flex-col items-center rounded-2xl border border-gold/25 bg-ivory p-6 shadow-card sm:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <Smartphone size={14} className="text-gold" />
                  <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold/80">
                    Medicard Application
                  </span>
                </div>
                <Image
                  src="/images/medicard-qr.png"
                  alt="QR code linking to the official Medicard financing application for Lumina Medi Spa"
                  width={220}
                  height={220}
                  className="rounded-lg border border-gold/15"
                />
                <a
                  href={MEDICARD_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apply online on the official Medicard website (opens in a new tab)"
                  className="btn-gold rounded-sm mt-6 inline-flex items-center gap-2 text-[11px] group"
                >
                  Apply Online
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Disclaimer className="mt-10" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-pad-sm section-warm-deep text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="mb-4 font-playfair text-3xl text-text-dark">
              Questions About Financing?
            </h2>
            <p className="mb-7 font-cormorant text-lg italic text-soft-taupe">
              Our team is happy to walk you through the process during your complimentary
              consultation.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking" className="btn-gold rounded-sm">
                Book a Consultation
              </Link>
              <Link href="/contact" className="btn-outline-gold rounded-sm">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
