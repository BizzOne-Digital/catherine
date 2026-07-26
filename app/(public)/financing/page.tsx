import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  FileCheck,
  Sparkles,
  ThumbsUp,
  ChevronDown,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsPageHero from "@/components/cms/CmsPageHero";

export const metadata: Metadata = {
  title: "Flexible Financing | Lumina Medi Spa",
  description:
    "Flexible payment plans through Beautifi. Split the cost of your treatments into manageable monthly payments with fast approvals designed for medical aesthetics.",
};

const benefits = [
  {
    icon: CreditCard,
    title: "Budget-friendly plans",
    description:
      "Split the cost of your treatment into manageable monthly payments instead of paying everything upfront.",
  },
  {
    icon: Sparkles,
    title: "Built for aesthetics",
    description:
      "Beautifi is purpose-built for cosmetic and medical aesthetic treatments — not a generic loan.",
  },
  {
    icon: ThumbsUp,
    title: "Access more of what you want",
    description:
      "Combine treatments or choose a package now and pay over time, without compromising on your goals.",
  },
];

const steps = [
  {
    step: "01",
    icon: FileCheck,
    title: "Apply online in minutes",
    description:
      "Complete Beautifi's quick, secure online application. Checking your options is fast and simple.",
  },
  {
    step: "02",
    icon: ThumbsUp,
    title: "Get a fast decision",
    description:
      "Beautifi specialises in medical aesthetics financing, so decisions are quick and tailored to treatments like ours.",
  },
  {
    step: "03",
    icon: Check,
    title: "Book your treatment",
    description:
      "Once approved, choose a monthly plan that fits your budget and book your Lumina appointment with confidence.",
  },
];

const faqs = [
  {
    question: "What is Beautifi?",
    answer:
      "Beautifi is a financing partner that specialises in medical aesthetic and cosmetic treatments. It lets you spread the cost of your care into affordable monthly payments.",
  },
  {
    question: "How do I apply?",
    answer:
      "You can apply directly through Beautifi's secure online application. It only takes a few minutes, and decisions are typically fast.",
  },
  {
    question: "Which treatments can I finance?",
    answer:
      "Most of our treatments are eligible, including injectables, fillers, laser packages and body sculpting. Ask our team and we'll help you plan.",
  },
  {
    question: "Will financing affect my treatment options?",
    answer:
      "Not at all. Financing simply gives you more flexibility in how you pay, so you can choose the plan that's right for your skin and goals.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <CmsPageHero
        slug="financing"
        fallback={{
          eyebrow: "Flexible Payments",
          title: "Care today, paid your way with|Beautifi",
          content:
            "At Lumina, we believe great care shouldn't come with financial strain. Our partnership with Beautifi lets you access the treatments you want with flexible, affordable monthly payments.",
        }}
      />

      <div className="container-luxury relative z-10 -mt-2 pb-10 text-center sm:-mt-4 sm:pb-12">
        <ScrollReveal delay={0.15} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://www.beautifi.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply with Beautifi (opens in a new tab)"
            className="btn-gold rounded-sm inline-flex items-center gap-3 group font-bold"
          >
            Apply with Beautifi
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link href="/booking" className="btn-outline-gold rounded-sm font-bold">
            Book a Consultation
          </Link>
        </ScrollReveal>
      </div>

      {/* Benefits */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <ScrollReveal key={title} delay={i * 0.1} className="h-full">
                <div className="relative flex h-full min-h-[16rem] flex-col items-center p-6 pt-8 text-center rounded-xl border border-gold/20 surface-card transition-all duration-500 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-1">
                  <div className="mb-4 mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Icon size={24} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 shrink-0 font-playfair text-xl text-gold font-bold">
                    {title}
                  </h3>
                  <p className="flex-1 font-inter text-sm leading-relaxed text-soft-taupe font-medium">
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad section-warm-alt">
        <div className="container-luxury">
          <ScrollReveal className="text-center mb-14">
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block font-semibold">
              Simple Process
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight mb-4 font-bold">
              How It <span className="text-gold">Works</span>
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-inter text-base text-soft-taupe max-w-2xl mx-auto font-medium">
              Three simple steps to flexible care
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch max-w-5xl mx-auto">
            {steps.map(({ step, icon: Icon, title, description }, i) => (
              <ScrollReveal key={step} delay={i * 0.1} className="h-full">
                <div className="relative flex h-full min-h-[15rem] flex-col items-center p-6 pt-8 text-center rounded-xl border border-gold/20 surface-card transition-all duration-500 hover:border-gold/40 hover:shadow-gold-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ivory px-3">
                    <span className="font-cormorant text-sm italic text-gold/60 font-semibold">{step}</span>
                  </div>
                  <div className="mb-4 mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 shrink-0 font-playfair text-lg text-text-dark font-bold">
                    {title}
                  </h3>
                  <p className="flex-1 font-inter text-sm leading-relaxed text-soft-taupe font-medium">
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.beautifi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-sm inline-flex items-center gap-3 group font-bold"
            >
              Apply with Beautifi
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/booking" className="btn-outline-gold rounded-sm font-bold">
              Book a Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal className="text-center mb-14">
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block font-semibold">
              Good to Know
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight mb-4 font-bold">
              Financing <span className="text-gold">FAQs</span>
            </h2>
            <div className="w-12 h-px bg-gold/50 mx-auto" />
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map(({ question, answer }, i) => (
              <ScrollReveal key={question} delay={i * 0.08}>
                <details className="group rounded-xl border border-gold/20 bg-ivory/95 transition-all duration-300 hover:border-gold/40">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-playfair text-lg text-text-dark font-bold">
                    {question}
                    <ChevronDown
                      size={20}
                      className="text-gold transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-6 pb-6 pt-2">
                    <p className="font-inter text-sm leading-relaxed text-soft-taupe font-medium">
                      {answer}
                    </p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="mt-10 text-center">
            <p className="mx-auto max-w-2xl font-inter text-xs leading-relaxed text-soft-taupe italic">
              Financing is provided by Beautifi, subject to their terms and approval. Lumina Medi
              Spa is a partner clinic and does not make lending decisions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-pad-sm section-warm-deep text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="mb-4 font-playfair text-3xl text-text-dark font-bold">
              Questions About Financing?
            </h2>
            <p className="mb-7 font-cormorant text-lg italic text-soft-taupe font-medium">
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
