import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : align === "right" ? "text-right items-end" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="font-inter text-xs tracking-[4px] uppercase text-gold font-bold">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl leading-tight font-bold ${light ? "text-warm-beige" : "text-text-dark"}`}>
        {title}
      </h2>
      {align === "center" && (
        <div className="w-12 h-px bg-gold/60 mx-auto mt-1" />
      )}
      {align !== "center" && (
        <div className="w-12 h-px bg-gold/60 mt-1" />
      )}
      {subtitle && (
        <p className={`font-cormorant text-xl font-semibold italic mt-2 max-w-2xl ${light ? "text-warm-beige/70" : "text-soft-taupe"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
