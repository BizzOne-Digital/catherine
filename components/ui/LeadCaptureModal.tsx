"use client";
import { useEffect, useState } from "react";
import { X, Loader2, Check, ChevronDown } from "lucide-react";
import { useSiteSettings } from "@/components/cms/useSiteSettings";

const STORAGE_KEY = "lumina_lead_popup_seen";

const LOCATIONS = ["Mississauga, Ontario"];

const inputClass =
  "w-full border border-gold/50 bg-white/80 px-3 py-2.5 font-inter text-sm text-black outline-none placeholder:text-black/40 focus:border-gold";

const labelClass =
  "mb-1.5 block font-inter text-[11px] font-medium uppercase tracking-[0.08em] text-black";

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
    location: "",
    message: "",
    marketingConsent: false,
  });

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (localStorage.getItem(STORAGE_KEY)) return;
      const t = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(t);
    } catch {
      /* private mode */
    }
  }, []);

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
      setError("Please fill in name, email, and phone.");
      return;
    }
    if (!form.location) {
      setError("Please select your location.");
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
      window.setTimeout(() => setOpen(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/45 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="relative my-auto flex w-full max-h-[min(92vh,720px)] max-w-[420px] flex-col overflow-hidden shadow-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #f5ebd4 0%, #faf4eb 40%, #fffdf8 75%, #ffffff 100%)",
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 p-1.5 text-black/45 transition-colors hover:text-black"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-8 sm:px-9 sm:pb-7 sm:pt-9">
          {done ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Check size={22} />
              </div>
              <h2 className="font-playfair text-2xl text-black">Thank you!</h2>
              <p className="mt-2 font-inter text-sm text-black/65">
                We&apos;ll be in touch soon about your free consultation.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-center sm:mb-6">
                <h2
                  id="lead-capture-title"
                  className="font-playfair text-[24px] leading-tight text-black sm:text-[32px]"
                >
                  {settings.leadOfferTitle || "Free Consultation"}
                </h2>
                <p className="mt-1 font-playfair text-base leading-snug text-black sm:mt-1.5 sm:text-xl">
                  {settings.leadOfferSubtitle || "20% Off on Your First Treatment"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className={labelClass}>Name</label>
                  <input
                    required
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    required
                    type="tel"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className={labelClass}>Choose Your Location</label>
                  <div className="relative">
                    <select
                      required
                      className={`${inputClass} appearance-none pr-9 ${
                        form.location ? "text-black" : "text-black/40"
                      }`}
                      value={form.location}
                      onChange={(e) => setField("location", e.target.value)}
                    >
                      <option value="" disabled>
                        Select your location
                      </option>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} className="text-black">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    rows={2}
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder="Messages"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-2.5 pt-0.5">
                  <span className="relative mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                      checked={form.marketingConsent}
                      onChange={(e) => setField("marketingConsent", e.target.checked)}
                    />
                    <span className="h-[14px] w-[14px] rounded-full border border-black/70 bg-white peer-checked:border-black peer-checked:bg-black" />
                  </span>
                  <span className="font-inter text-[10px] uppercase leading-relaxed tracking-[0.04em] text-black/80">
                    By clicking Submit, you agree to receive email and SMS from Lumina Medi Spa.
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
                  className="mt-1 flex w-full items-center justify-center gap-2 bg-black px-4 py-3.5 font-inter text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
