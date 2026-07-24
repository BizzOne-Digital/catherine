import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** Small financing CTA banner reused across home, pricing, booking, and services pages. */
export default function FinancingCallout({ className = "" }: { className?: string }) {
  return (
    <ScrollReveal className={className}>
      <div className="group relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-gold/30 bg-ivory/95 p-6 text-center shadow-card transition-all duration-500 hover:border-gold/50 hover:shadow-gold-sm sm:p-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
          <CreditCard size={19} className="text-gold" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 font-playfair text-xl text-text-dark sm:text-2xl font-bold">
          Flexible Financing <span className="text-gold">Available</span>
        </h3>
        <p className="mx-auto mb-6 max-w-md font-inter text-sm leading-relaxed text-soft-taupe font-medium">
          Interested in a treatment but prefer to pay over time? Apply securely through Beautifi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/financing"
            className="btn-outline-gold rounded-sm inline-flex items-center gap-2 text-[11px] font-semibold"
          >
            How financing works
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://www.beautifi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-sm inline-flex items-center gap-2 text-[11px] font-semibold"
          >
            Apply with Beautifi
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
