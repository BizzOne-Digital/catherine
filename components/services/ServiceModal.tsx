"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Service {
  _id?: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  duration?: string;
  price?: string;
  benefits?: string[];
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[300] bg-luxury-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[301] w-full max-w-lg bg-soft-black border-l border-gold/15 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gold/10 bg-soft-black/95 px-5 py-4 backdrop-blur-md sm:px-7 sm:py-5">
              <div>
                <span className="font-inter text-[10px] tracking-[3px] uppercase text-gold/60 block mb-1">
                  {service.category}
                </span>
                <h2 className="font-playfair text-2xl text-gold">{service.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold hover:border-gold transition-all duration-300 flex-shrink-0 mt-1"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-7">
              {/* Meta badges */}
              <div className="flex flex-wrap gap-3">
                {service.duration && (
                  <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-gold/5 border border-gold/15">
                    <Clock size={13} className="text-gold" />
                    <span className="font-inter text-xs text-warm-beige font-bold">{service.duration}</span>
                  </div>
                )}
                {service.price && (
                  <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-gold/5 border border-gold/15">
                    <DollarSign size={13} className="text-gold" />
                    <span className="font-cormorant text-sm italic text-gold font-bold">{service.price}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-playfair text-lg text-warm-beige mb-3 font-bold">About This Treatment</h3>
                <div className="w-8 h-px bg-gold/30 mb-4" />
                <p className="font-inter text-sm text-warm-beige leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h3 className="font-playfair text-lg text-warm-beige mb-3 font-bold">Key Benefits</h3>
                  <div className="w-8 h-px bg-gold/30 mb-4" />
                  <ul className="space-y-2.5">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={14} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-sm text-warm-beige font-semibold">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4 border-t border-gold/10 space-y-3">
                <Link
                  href="/booking"
                  className="btn-gold rounded-sm w-full flex items-center justify-center gap-3 group"
                >
                  Book This Treatment
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="btn-outline-gold rounded-sm w-full flex items-center justify-center gap-3"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
