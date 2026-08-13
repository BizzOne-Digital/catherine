"use client";
import { ClipboardList, Cpu, Sparkles, UserRoundCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const reasons = [
  {
    icon: ClipboardList,
    title: "Personalized Treatment Plan",
    description: "Every recommendation is tailored to your skin, goals, and lifestyle — never a one-size-fits-all approach.",
  },
  {
    icon: Cpu,
    title: "Medical Grade Technology",
    description: "Advanced, clinic-grade tools and techniques deliver results you can see and feel with confidence.",
  },
  {
    icon: Sparkles,
    title: "Natural-Looking Results",
    description: "Subtle refinement that enhances your features while preserving what makes you uniquely you.",
  },
  {
    icon: UserRoundCheck,
    title: "Experienced Professionals",
    description: "Care from trained medical aesthetic specialists focused on safety, precision, and genuine results.",
  },
];

export default function WhyLumina() {
  return (
    <section className="section-pad section-warm relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.07)_0%,transparent_55%)] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Lumina Difference"
            title="Why Lumina"
            subtitle="Thoughtful care, medical precision, and results that feel effortlessly you."
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <ScrollReveal key={title} delay={i * 0.08} className="h-full">
              <div className="group relative flex h-full min-h-[15.5rem] flex-col rounded-xl border border-gold/25 bg-ivory/95 p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/15">
                  <Icon size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="mb-3 flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[11px] font-semibold text-gold">
                    ✓
                  </span>
                  <h3 className="font-playfair text-lg leading-snug text-text-dark transition-colors duration-300 group-hover:text-gold">
                    {title}
                  </h3>
                </div>
                <p className="flex-1 font-inter text-sm leading-relaxed text-soft-taupe">
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
