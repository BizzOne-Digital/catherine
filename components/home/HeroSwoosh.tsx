"use client";
import GoldParticles from "@/components/ui/GoldParticles";

export default function HeroSwoosh() {
  return (
    <div className="hero-swoosh pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroSwooshGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5e1a4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d6b56d" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a67c2d" stopOpacity="0.3" />
          </linearGradient>
          <filter id="heroSwooshGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="heroImageClip">
            <path d="M 520 0 C 460 180, 500 420, 440 620 C 400 780, 360 900, 280 900 L 1440 900 L 1440 0 Z" />
          </clipPath>
        </defs>

        {/* Soft glow along the curve */}
        <path
          className="hero-swoosh-glow"
          d="M 520 0 C 460 180, 500 420, 440 620 C 400 780, 360 900, 280 900"
          fill="none"
          stroke="url(#heroSwooshGold)"
          strokeWidth="48"
          strokeLinecap="round"
          opacity="0.18"
          filter="url(#heroSwooshGlow)"
        />

        {/* Main golden curve */}
        <path
          className="hero-swoosh-line"
          d="M 520 0 C 460 180, 500 420, 440 620 C 400 780, 360 900, 280 900"
          fill="none"
          stroke="url(#heroSwooshGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#heroSwooshGlow)"
        />
      </svg>

      <div className="hero-swoosh-particles absolute inset-0">
        <GoldParticles count={35} className="opacity-70" />
      </div>
    </div>
  );
}
