"use client";
import { motion } from "framer-motion";
import { Clock, DollarSign, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    _id?: string;
    title: string;
    shortDescription: string;
    category: string;
    duration?: string;
    price?: string;
    benefits?: string[];
  };
  onClick?: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative p-6 rounded-xl border border-gold/10 bg-soft-black hover:border-gold/40 transition-all duration-500 cursor-pointer flex flex-col h-full"
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(214,181,109,0.12)" }}
      onClick={onClick}
    >
      {/* Category badge */}
      <span className="font-inter text-[10px] tracking-[2px] uppercase text-gold/70 border border-gold/20 bg-gold/5 rounded-full px-3 py-1 mb-4 self-start">
        {service.category}
      </span>

      <h3 className="font-playfair text-xl text-warm-beige mb-3 group-hover:text-gold transition-colors duration-300">
        {service.title}
      </h3>

      <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-5 flex-1">
        {service.shortDescription}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-5 pt-4 border-t border-gold/10">
        {service.duration && (
          <div className="flex items-center gap-1.5 text-soft-taupe/70">
            <Clock size={12} />
            <span className="font-inter text-xs">{service.duration}</span>
          </div>
        )}
        {service.price && (
          <div className="flex items-center gap-1.5 text-gold">
            <DollarSign size={12} />
            <span className="font-cormorant text-sm italic">{service.price}</span>
          </div>
        )}
      </div>

      {/* Benefits preview */}
      {service.benefits && service.benefits.length > 0 && (
        <ul className="space-y-1 mb-5">
          {service.benefits.slice(0, 3).map((b, i) => (
            <li key={i} className="flex items-center gap-2 text-soft-taupe/70">
              <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
              <span className="font-inter text-xs">{b}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        className="flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors duration-300 text-sm font-inter mt-auto"
        onClick={onClick}
      >
        Learn More <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
      </button>

      {/* Gold corner accent */}
      <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 right-0 w-px h-full bg-gold/30" />
        <div className="absolute bottom-0 right-0 h-px w-full bg-gold/30" />
      </div>
    </motion.div>
  );
}
