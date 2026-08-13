import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  FileCheck,
  PenLine,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsPageHero from "@/components/cms/CmsPageHero";
import { FINANCING_DISCLAIMER, MEDICARD_APPLY_URL } from "@/lib/financing";

export const metadata: Metadata = {
  title: "Flexible Financing | Lumina Medi Spa",
  description:
    "Care today, pay over time with Medicard by iFinance. Spread the cost of eligible Lumina Medi Spa treatments over manageable monthly payments.",
};

const howItWorks = [
  "Financing available for eligible treatments.",
  "Loan amounts from $500 to $50,000.",
  "Flexible repayment terms from 12 to 84 months (subject to approval).",
  "Competitive interest rates starting from 7.95%, based on the applicant's creditworthiness and income.",
  "Simple online application with a quick approval process.",
];

const applySteps = [
  {
    step: "01",
    icon: FileCheck,
    title: "Complete the online Medicard application",
    description: "Apply securely online through Medicard by iFinance in just a few minutes.",
  },
  {
    step: "02",
    icon: ThumbsUp,
    title: "Receive a financing decision",
    description: "Get a quick decision so you can move forward with confidence.",
  },
  {
    step: "03",
    icon: PenLine,
    title: "Sign your loan agreement electronically",
    description: "If approved, review and sign your agreement online — no paperwork hassle.",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Begin your treatment",
    description: "Start your Lumina treatment while making convenient monthly payments.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <CmsPageHero
        slug="financing"
        fallback={{
          eyebrow: "Medicard by iFinance",
          title: "Care Today, Pay Over Time|with Medicard by iFinance",
          content:
            "We believe aesthetic treatments should be accessible. Lumina Medi Spa offers financing through Medicard by iFinance, so eligible clients can spread the cost of treatment over manageable monthly payments.",
        }}
      />

      <div className="container-luxury relative z-10 -mt-2 pb-10 text-center sm:-mt-4 sm:pb-12">
        <ScrollReveal
          delay={0.15}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={MEDICARD_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply with Medicard by iFinance (opens in a new tab)"
            className="btn-gold rounded-sm inline-flex items-center gap-3 group font-bold"
          >
            Apply with Medicard
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link href="/booking" className="btn-outline-gold rounded-sm font-bold">
            Book a Consultation
          </Link>
        </ScrollReveal>
      </div>

      {/* Intro + QR */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <ScrollReveal>
              <span className="mb-4 block font-inter text-[11px] font-semibold uppercase tracking-[4px] text-gold/80">
                Care today, pay over time with Medicard by iFinance
              </span>
              <h2 className="mb-5 font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl">
                Flexible financing for your{" "}
                <span className="text-gold">aesthetic goals</span>
              </h2>
              <div className="mb-6 h-px w-12 bg-gold/50" />
              <p className="mb-6 font-inter text-base font-medium leading-relaxed text-soft-taupe">
                We believe aesthetic treatments should be accessible. That&apos;s why Lumina Medi
                Spa proudly offers financing through Medicard, allowing eligible clients to spread
                the cost of their treatment over manageable monthly payments.
              </p>
              <div className="mb-8 flex items-start gap-3 rounded-xl border border-gold/20 bg-ivory/95 p-4">
                <CreditCard size={20} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="font-inter text-sm font-medium leading-relaxed text-soft-taupe">
                  Apply online at{" "}
                  <a
                    href={MEDICARD_APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold underline-offset-2 hover:underline"
                  >
                    apply.medicard.com/25759
                  </a>{" "}
                  or scan the QR code to get started.
                </p>
              </div>
              <a
                href={MEDICARD_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-3 rounded-sm font-bold group"
              >
                Start Your Application
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <a
                href={MEDICARD_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mx-auto block max-w-md overflow-hidden rounded-2xl border border-gold/25 shadow-gold-sm transition-all duration-500 hover:border-gold/45 hover:shadow-gold lg:mx-0"
                aria-label="Scan QR code or click to apply with Medicard"
              >
                <Image
                  src="/images/financing/medicard-qr.png"
                  alt="Medicard by iFinance — Care today, pay over time. Scan the QR code to apply for financing."
                  width={900}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                />
              </a>
              <p className="mt-4 text-center font-cormorant text-base italic text-soft-taupe lg:text-left">
                Scan to apply · Medicard by iFinance
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad section-warm-alt">
        <div className="container-luxury max-w-4xl">
          <ScrollReveal className="mb-12 text-center">
            <span className="mb-4 block font-inter text-[11px] font-semibold uppercase tracking-[4px] text-gold/80">
              At a Glance
            </span>
            <h2 className="mb-4 font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl lg:text-5xl">
              How It <span className="text-gold">Works</span>
            </h2>
            <div className="mx-auto mb-5 h-px w-12 bg-gold/50" />
          </ScrollReveal>

          <ul className="space-y-4">
            {howItWorks.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.06}>
                <li className="flex items-start gap-4 rounded-xl border border-gold/20 bg-ivory/95 p-5 transition-all duration-300 hover:border-gold/40">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                    <Check size={14} className="text-gold" strokeWidth={2.5} />
                  </span>
                  <p className="font-inter text-sm font-medium leading-relaxed text-text-dark sm:text-base">
                    {item}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Applying Is Easy */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal className="mb-14 text-center">
            <span className="mb-4 block font-inter text-[11px] font-semibold uppercase tracking-[4px] text-gold/80">
              Simple Process
            </span>
            <h2 className="mb-4 font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl lg:text-5xl">
              Applying Is <span className="text-gold">Easy</span>
            </h2>
            <div className="mx-auto mb-5 h-px w-12 bg-gold/50" />
            <p className="mx-auto max-w-2xl font-inter text-base font-medium text-soft-taupe">
              Four simple steps from application to treatment
            </p>
          </ScrollReveal>

          <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {applySteps.map(({ step, icon: Icon, title, description }, i) => (
              <ScrollReveal key={step} delay={i * 0.08} className="h-full">
                <div className="relative flex h-full min-h-[15rem] flex-col items-center rounded-xl border border-gold/20 surface-card p-6 pt-8 text-center transition-all duration-500 hover:border-gold/40 hover:shadow-gold-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ivory px-3">
                    <span className="font-cormorant text-sm italic font-semibold text-gold/60">
                      {step}
                    </span>
                  </div>
                  <div className="mb-4 mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 shrink-0 font-playfair text-lg font-bold text-text-dark">
                    {title}
                  </h3>
                  <p className="flex-1 font-inter text-sm font-medium leading-relaxed text-soft-taupe">
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal
            delay={0.3}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={MEDICARD_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 rounded-sm font-bold group"
            >
              Apply with Medicard
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/booking" className="btn-outline-gold rounded-sm font-bold">
              Book a Consultation
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-10 text-center">
            <p className="mx-auto max-w-2xl font-inter text-xs italic leading-relaxed text-soft-taupe">
              {FINANCING_DISCLAIMER}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-pad-sm section-warm-deep text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="mb-4 font-playfair text-3xl font-bold text-text-dark">
              Questions About Financing?
            </h2>
            <p className="mb-7 font-cormorant text-lg italic font-medium text-soft-taupe">
              Our team is happy to walk you through the process during your complimentary
              consultation.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking" className="btn-gold rounded-sm font-bold">
                Book a Consultation
              </Link>
              <Link href="/contact" className="btn-outline-gold rounded-sm font-bold">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
