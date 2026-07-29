import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MEDICARD_APPLY_URL } from "@/lib/financing";

/** Small financing CTA banner reused across home, pricing, booking, and services pages. */
export default function FinancingCallout({ className = "" }: { className?: string }) {
  return (
    <ScrollReveal className={className}>
      <div className="group relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-gold/30 bg-ivory/95 p-6 text-center shadow-card transition-all duration-500 hover:border-gold/50 hover:shadow-gold-sm sm:p-8">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
          <CreditCard size={19} className="text-gold" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 font-playfair text-xl font-bold text-text-dark sm:text-2xl">
          Flexible Financing Available
        </h3>
        <p className="mx-auto mb-6 max-w-md font-inter text-sm font-medium leading-relaxed text-soft-taupe">
          Prefer to pay over time? Apply securely through Medicard by iFinance. Learn more on our
          financing page.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/financing"
            className="btn-outline-gold inline-flex items-center gap-2 rounded-sm text-[11px] font-semibold"
          >
            More information
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={MEDICARD_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded-sm text-[11px] font-semibold"
          >
            Apply with iFinance
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
