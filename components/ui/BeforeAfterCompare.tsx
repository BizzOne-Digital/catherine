"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type BeforeAfterCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  title,
  subtitle,
  className = "",
}: BeforeAfterCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [beforeErr, setBeforeErr] = useState(false);
  const [afterErr, setAfterErr] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(95, Math.max(5, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="mb-4 text-center">
          {title && (
            <h3 className="font-playfair text-xl font-bold text-text-dark sm:text-2xl">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 font-inter text-sm text-soft-taupe">{subtitle}</p>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-gold/20 bg-ivory shadow-card touch-none"
        onPointerDown={(e) => {
          e.preventDefault();
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
        role="slider"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(pos)}
        aria-label="Before and after comparison"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(5, p - 3));
          if (e.key === "ArrowRight") setPos((p) => Math.min(95, p + 3));
        }}
      >
        <div className="absolute inset-0">
          {!afterErr ? (
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 900px"
              draggable={false}
              onError={() => setAfterErr(true)}
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-warm-beige/40 to-gold/10">
              <span className="font-inter text-sm text-soft-taupe">After</span>
            </div>
          )}
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            After
          </span>
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {!beforeErr ? (
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 900px"
              draggable={false}
              onError={() => setBeforeErr(true)}
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-soft-taupe/20 to-ivory">
              <span className="font-inter text-sm text-soft-taupe">Before</span>
            </div>
          )}
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            Before
          </span>
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-gold text-white shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M8 12H4M4 12L7 9M4 12L7 15M16 12H20M20 12L17 9M20 12L17 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
