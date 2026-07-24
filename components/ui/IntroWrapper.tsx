"use client";
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroBackground from "./IntroBackground";
import IntroLogo from "./IntroLogo";

const INTRO_DURATION_MS = 3800;

function StarDivider() {
  return (
    <div className="intro-divider flex items-center justify-center gap-0 w-[min(240px,70vw)]">
      <span className="intro-divider-line flex-1" />
      <svg viewBox="0 0 12 12" className="intro-divider-star w-[7px] h-[7px] shrink-0 mx-3" aria-hidden="true">
        <path
          d="M6 0 L6.8 4.2 L11 5 L6.8 5.8 L6 10 L5.2 5.8 L1 5 L5.2 4.2 Z"
          fill="currentColor"
        />
      </svg>
      <span className="intro-divider-line flex-1" />
    </div>
  );
}

export default function IntroWrapper() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("lumina_intro_seen", "true");
    document.documentElement.classList.remove("intro-active");
    document.body.style.overflow = "";
  }, []);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("lumina_intro_seen")) {
      setShow(false);
      document.documentElement.classList.remove("intro-active");
      document.body.style.overflow = "";
      return;
    }

    document.documentElement.classList.add("intro-active");
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (!show) return;

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / INTRO_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setProgress(eased * 100);

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(dismiss, 250);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Loading Lumina Medi Spa"
          role="dialog"
          aria-modal="true"
        >
          <IntroBackground />

          <div className="intro-content relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <IntroLogo />
            </motion.div>

            <motion.h1
              className="intro-title font-playfair font-bold tracking-[0.06em] mt-5 sm:mt-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Lumina Medi Spa
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-5"
            >
              <StarDivider />
            </motion.div>

            <motion.p
              className="intro-tagline mt-4 sm:mt-5 font-inter font-semibold tracking-[0.12em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Medical Aesthetics Designed Around{" "}
              <span className="intro-tagline-you font-great-vibes not-italic tracking-normal">
                You
              </span>
            </motion.p>
          </div>

          <motion.div
            className="intro-loader absolute left-1/2 -translate-x-1/2 bottom-[10%] sm:bottom-[11%] flex flex-col items-center gap-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <span className="intro-loader-label">LOADING</span>
            <div className="intro-loader-track">
              <div className="intro-loader-rail" />
              <motion.div
                className="intro-loader-fill"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
              >
                <span className="intro-loader-spark" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
