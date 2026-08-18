"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check } from "lucide-react";
import { useSiteSettings } from "@/components/cms/useSiteSettings";

const STORAGE_KEY = "lumina_lead_popup_seen";
const SHOW_DELAY_MS = 1000;

const inputClass =
  "w-full rounded-sm border border-black/15 bg-white px-3.5 py-3 font-inter text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/40";

const labelClass =
  "mb-1.5 block font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-black/70";

export default function LeadCaptureModal() {
  const { settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    marketingConsent: false,
  });

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (localStorage.getItem(STORAGE_KEY)) return;

      const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
      return () => window.clearTimeout(timer);
    } catch {
      /* private browsing */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const setField = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in name, email, and phone number.");
      return;
    }
    if (!form.marketingConsent) {
      setError("Please agree to receive email and SMS communications.");
      return;
    }

    setSubmitting(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Something went wrong");

      setDone(true);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      window.setTimeout(() => setOpen(false), 2400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-capture-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-sm bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[3px] w-full bg-black" aria-hidden="true" />

            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3.5 top-3.5 z-10 rounded-full p-1.5 text-black/40 transition-colors hover:bg-black/5 hover:text-black"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="max-h-[min(88vh,680px)] overflow-y-auto overscroll-contain px-7 pb-7 pt-9 sm:px-9 sm:pb-8 sm:pt-10">
              {done ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                    <Check size={24} strokeWidth={2} />
                  </div>
                  <h2 className="font-playfair text-[28px] text-black">Thank you!</h2>
                  <p className="mx-auto mt-3 max-w-xs font-inter text-sm leading-relaxed text-black/65">
                    We&apos;ve received your request. Our team will reach out shortly about your
                    free consultation.
                  </p>
                </div>
              ) : (
                <>
                  <header className="mb-7 text-center">
                    <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
                      Exclusive Offer
                    </p>
                    <h2
                      id="lead-capture-title"
                      className="mt-2 font-playfair text-[30px] leading-tight text-black sm:text-[34px]"
                    >
                      {settings.leadOfferTitle || "Free Consultation"}
                    </h2>
                    <p className="mt-2 font-playfair text-lg leading-snug text-black sm:text-xl">
                      {settings.leadOfferSubtitle || "20% Off Your First Treatment"}
                    </p>
                    <p className="mx-auto mt-3 max-w-[320px] font-inter text-xs leading-relaxed text-black/55">
                      Excludes injectables and other select services.
                    </p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass} htmlFor="lead-name">
                        Name
                      </label>
                      <input
                        id="lead-name"
                        required
                        className={inputClass}
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="lead-email">
                        Email
                      </label>
                      <input
                        id="lead-email"
                        required
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@email.com"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="lead-phone">
                        Phone Number
                      </label>
                      <input
                        id="lead-phone"
                        required
                        type="tel"
                        className={inputClass}
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="(905) 555-0123"
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="lead-message">
                        Message
                      </label>
                      <textarea
                        id="lead-message"
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={form.message}
                        onChange={(e) => setField("message", e.target.value)}
                        placeholder="Tell us what you're interested in (optional)"
                      />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 pt-1">
                      <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                          checked={form.marketingConsent}
                          onChange={(e) => setField("marketingConsent", e.target.checked)}
                        />
                        <span className="h-4 w-4 rounded-sm border border-black/30 bg-white transition-colors peer-checked:border-black peer-checked:bg-black" />
                        <Check
                          size={10}
                          strokeWidth={3}
                          className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
                        />
                      </span>
                      <span className="font-inter text-[11px] leading-relaxed text-black/75">
                        By clicking Submit, you agree to receive email and SMS communications from
                        Lumina Medi Spa.
                      </span>
                    </label>

                    {error && (
                      <p className="font-inter text-xs text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-1 flex w-full items-center justify-center gap-2 rounded-sm bg-black px-4 py-3.5 font-inter text-sm font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
