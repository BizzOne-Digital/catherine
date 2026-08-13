"use client";
import GoldParticles from "./GoldParticles";

export default function IntroBackground() {
  return (
    <div className="intro-bg absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#FFFBF6]" />

      <div className="intro-bg-glow intro-bg-glow-tl" />
      <div className="intro-bg-glow intro-bg-glow-br" />

      <svg
        className="intro-bg-waves absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="introWaveA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4972F" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#B8893D" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#9B7838" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="introWaveB" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D4A73F" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#C4972F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#B8893D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="introRibbonGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8893D" stopOpacity="0" />
            <stop offset="25%" stopColor="#C4972F" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4A73F" stopOpacity="0.28" />
            <stop offset="75%" stopColor="#C4972F" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B8893D" stopOpacity="0" />
          </linearGradient>
          <filter id="introWaveBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="introWaveBlurSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="introRibbonGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient soft fills */}
        <g filter="url(#introWaveBlur)" className="intro-wave-drift-a">
          <path
            d="M-120 80 C 280 40, 420 320, 720 380 S 1180 520, 1560 420 L 1560 900 L -120 900 Z"
            fill="url(#introWaveA)"
          />
        </g>
        <g filter="url(#introWaveBlurSoft)" className="intro-wave-drift-b">
          <path
            d="M-80 520 C 200 380, 480 620, 760 580 S 1200 420, 1520 340 L 1520 900 L -80 900 Z"
            fill="url(#introWaveB)"
            opacity="0.85"
          />
        </g>

        {/* Smooth zig-zag ribbon band 1 — sweeps top-left to center */}
        <g className="intro-zigzag-slide intro-zigzag-slide-1">
          <g className="intro-zigzag-sway intro-zigzag-sway-1" filter="url(#introWaveBlurSoft)">
            <path
              className="intro-zigzag-fill"
              d="
                M -180 60
                C 120 20, 280 180, 480 100
                S 840 20, 1080 140
                S 1380 260, 1620 180
                L 1620 300
                C 1380 380, 1080 260, 840 280
                S 280 360, 120 280
                C -40 220, -80 140, -180 180
                Z
              "
              fill="url(#introRibbonGold)"
            />
          </g>
        </g>

        {/* Zig-zag ribbon band 2 — mid sweep */}
        <g className="intro-zigzag-slide intro-zigzag-slide-2">
          <g className="intro-zigzag-sway intro-zigzag-sway-2" filter="url(#introRibbonGlow)">
            <path
              className="intro-zigzag-fill"
              d="
                M -160 480
                C 160 360, 360 560, 560 460
                S 920 360, 1160 480
                S 1460 600, 1640 520
                L 1640 640
                C 1460 720, 1160 600, 920 620
                S 360 700, 160 620
                C -40 560, -100 580, -160 600
                Z
              "
              fill="url(#introWaveB)"
              opacity="0.55"
            />
          </g>
        </g>

        {/* Zig-zag ribbon band 3 — bottom-right sweep */}
        <g className="intro-zigzag-slide intro-zigzag-slide-3">
          <g className="intro-zigzag-sway intro-zigzag-sway-3" filter="url(#introWaveBlur)">
            <path
              className="intro-zigzag-fill"
              d="
                M 80 720
                C 320 620, 520 780, 760 700
                S 1120 620, 1360 740
                S 1580 860, 1680 800
                L 1680 900
                L 80 900
                Z
              "
              fill="url(#introWaveA)"
              opacity="0.45"
            />
          </g>
        </g>
      </svg>

      <div className="intro-bokeh intro-bokeh-1" />
      <div className="intro-bokeh intro-bokeh-2" />
      <div className="intro-bokeh intro-bokeh-3" />
      <div className="intro-bokeh intro-bokeh-4" />
      <div className="intro-bokeh intro-bokeh-5" />

      <GoldParticles count={70} className="opacity-80" />
    </div>
  );
}
