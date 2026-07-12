"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  _id?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`border-b border-gold/10 transition-colors duration-300 ${isOpen ? "border-gold/20" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-playfair text-base sm:text-lg leading-snug transition-colors duration-300 pr-4 ${
            isOpen ? "text-gold" : "text-warm-beige group-hover:text-gold"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-gold bg-gold/10 text-gold"
              : "border-gold/30 text-soft-taupe group-hover:border-gold group-hover:text-gold"
          }`}
        >
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="font-inter text-sm text-soft-taupe leading-relaxed pb-5 px-1">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="divide-y-0">
      {items.map((item, i) => (
        <FAQItem
          key={item._id || i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
