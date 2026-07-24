"use client";
import { useId, useState } from "react";
import Image from "next/image";

interface IntroLogoProps {
  className?: string;
}

function LogoSvg({ className }: { className: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `introLogoGold-${uid}`;

  return (
    <svg
      viewBox="0 0 90 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#f8ecc8" />
          <stop offset="40%" stopColor="#d6b56d" />
          <stop offset="100%" stopColor="#a67c2d" />
        </linearGradient>
      </defs>

      <path d="M22 10 H34 V68 H58 V80 H22 V10 Z" fill={`url(#${gradId})`} />
      <path d="M18 10 H38 V14 H18 Z" fill={`url(#${gradId})`} />
      <path d="M18 80 H38 V84 H18 Z" fill={`url(#${gradId})`} />

      <path
        d="M30 24 C42 14, 60 18, 66 32 C69 42, 58 50, 46 46 C38 43, 34 36, 36 28"
        stroke={`url(#${gradId})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 28 C32 34, 26 40, 20 44"
        stroke={`url(#${gradId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M70 8 L71.5 12.5 L76 14 L71.5 15.5 L70 20 L68.5 15.5 L64 14 L68.5 12.5 Z"
        fill="#f5e1a4"
      />
      <circle cx="70" cy="14" r="1.5" fill="#fff" opacity="0.85" />
    </svg>
  );
}

export default function IntroLogo({
  className = "intro-logo w-[200px] h-[220px] sm:w-[240px] sm:h-[264px]",
}: IntroLogoProps) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <LogoSvg className={className} />;
  }

  return (
    <Image
      src="/images/logo.png"
      alt="Lumina Medi Spa"
      width={240}
      height={264}
      className={`${className} object-contain`}
      onError={() => setUseFallback(true)}
      priority
    />
  );
}
