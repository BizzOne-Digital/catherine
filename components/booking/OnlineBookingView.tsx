"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Loader2,
  Sparkles,
  Syringe,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BOOKING_CATEGORY_LABELS } from "@/lib/bookingConfig";
import { BOOKING_DEPOSIT_CAD, type BookableService } from "@/lib/bookableServices";
import { phoneToTel, useSiteSettings } from "@/components/cms/useSiteSettings";
import { formatSlotLabel, formatSlotTimeLabel } from "@/lib/bookingSlots";

type Step = "service" | "datetime" | "details";

function groupServices(services: BookableService[]) {
  const map: Record<string, BookableService[]> = {};
  for (const s of services) {
    if (!map[s.categorySlug]) map[s.categorySlug] = [];
    map[s.categorySlug].push(s);
  }
  return map;
}

export default function OnlineBookingView() {
  const searchParams = useSearchParams();
  const preCategory = searchParams.get("category") || "";
  const preTreatment = searchParams.get("treatment") || "";
  const { settings } = useSiteSettings();
  const telHref = phoneToTel(settings.phone);

  const [step, setStep] = useState<Step>("service");
  const [services, setServices] = useState<BookableService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/booking/services")
      .then((r) => r.json())
      .then((d) => setServices(d.services || []))
      .catch(() => setError("Could not load bookable treatments."))
      .finally(() => setLoadingServices(false));
  }, []);

  useEffect(() => {
    if (!services.length || !preCategory || !preTreatment) return;
    const match = services.find(
      (s) => s.categorySlug === preCategory && s.treatmentSlug === preTreatment
    );
    if (match) {
      setSelectedServiceId(match.id);
      setStep("datetime");
    }
  }, [services, preCategory, preTreatment]);

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const grouped = useMemo(() => groupServices(services), [services]);

  const dateOptions = useMemo(() => {
    const out: string[] = [];
    const now = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(d);
      const y = parts.find((p) => p.type === "year")?.value;
      const m = parts.find((p) => p.type === "month")?.value;
      const day = parts.find((p) => p.type === "day")?.value;
      if (y && m && day) out.push(`${y}-${m}-${day}`);
    }
    return out;
  }, []);

  useEffect(() => {
    if (!selectedServiceId || !selectedDate) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    setSelectedSlot("");
    fetch(
      `/api/booking/availability?serviceId=${encodeURIComponent(selectedServiceId)}&date=${encodeURIComponent(selectedDate)}`
    )
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Could not load times");
        setSlots(d.slots || []);
      })
      .catch((err) => {
        setSlots([]);
        setError(err instanceof Error ? err.message : "Could not load times");
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedServiceId, selectedDate]);

  const goToCheckout = async () => {
    setError("");
    if (!selectedServiceId || !selectedSlot || !customerName || !email || !phone) {
      setError("Please complete all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          startLocal: selectedSlot,
          customerName,
          email,
          phone,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden page-text-hero pb-10 pt-24 sm:pb-14 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.06)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="mb-4 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
              Book with Lumina
            </span>
            <h1 className="mb-5 font-playfair text-3xl leading-tight text-text-dark sm:text-4xl lg:text-5xl">
              Book <em className="not-italic text-gold">Online</em>
            </h1>
            <div className="mx-auto mb-5 h-px w-12 bg-gold/50" />
            <p className="mx-auto max-w-2xl font-inter text-base leading-relaxed text-soft-taupe">
              Choose your treatment, pick a date and time, and pay a ${BOOKING_DEPOSIT_CAD}{" "}
              CAD deposit to confirm. Your appointment is added to our clinic calendar
              automatically.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad section-warm">
        <div className="container-luxury max-w-3xl">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm text-red-800">
              {error}
            </div>
          )}

          {step === "service" && (
            <ScrollReveal>
              <h2 className="mb-6 font-playfair text-2xl font-bold text-text-dark">
                1. Select your treatment
              </h2>
              {loadingServices ? (
                <div className="flex items-center gap-2 py-12 font-inter text-sm text-soft-taupe">
                  <Loader2 size={18} className="animate-spin text-gold" />
                  Loading treatments…
                </div>
              ) : (
                <div className="space-y-10">
                  {Object.entries(grouped).map(([slug, list]) => (
                    <div key={slug}>
                      <h3 className="mb-4 font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                        {BOOKING_CATEGORY_LABELS[slug] || slug}
                      </h3>
                      <ul className="space-y-2">
                        {list.map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedServiceId(s.id);
                                setStep("datetime");
                                setError("");
                              }}
                              className={`flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left transition hover:border-gold/40 sm:p-5 ${
                                selectedServiceId === s.id
                                  ? "border-gold/50 shadow-gold-sm"
                                  : "border-gold/15"
                              }`}
                            >
                              <span className="font-playfair text-lg font-semibold text-text-dark">
                                {s.name}
                              </span>
                              <span className="font-inter text-xs text-soft-taupe">
                                {s.durationMinutes} min
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>
          )}

          {step === "datetime" && selectedService && (
            <ScrollReveal>
              <button
                type="button"
                onClick={() => setStep("service")}
                className="mb-4 inline-flex items-center gap-1 font-inter text-sm text-gold hover:text-deep-gold"
              >
                <ArrowLeft size={14} />
                Change treatment
              </button>
              <h2 className="mb-2 font-playfair text-2xl font-bold text-text-dark">
                2. Choose date &amp; time
              </h2>
              <p className="mb-6 font-inter text-sm text-soft-taupe">
                {selectedService.name} · {selectedService.durationMinutes} minutes
              </p>

              <label className="mb-2 block font-inter text-xs font-bold uppercase tracking-wider text-gold">
                Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mb-6 w-full rounded-lg border border-gold/25 bg-white px-4 py-3 font-inter text-sm text-text-dark"
              >
                <option value="">Select a date…</option>
                {dateOptions.map((d) => (
                  <option key={d} value={d}>
                    {new Intl.DateTimeFormat("en-CA", {
                      timeZone: "America/Toronto",
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(`${d}T12:00:00Z`))}
                  </option>
                ))}
              </select>

              {selectedDate && (
                <>
                  <label className="mb-2 block font-inter text-xs font-bold uppercase tracking-wider text-gold">
                    Available times (Eastern)
                  </label>
                  {loadingSlots ? (
                    <div className="flex items-center gap-2 py-8 font-inter text-sm text-soft-taupe">
                      <Loader2 size={16} className="animate-spin text-gold" />
                      Checking availability…
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="font-inter text-sm text-soft-taupe">
                      No times available this day. Try another date or call{" "}
                      <a href={telHref} className="font-semibold text-gold">
                        {settings.phone}
                      </a>.
                    </p>
                  ) : (
                    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedSlot(slot);
                            setStep("details");
                            setError("");
                          }}
                          className={`rounded-lg border px-3 py-2 font-inter text-sm transition ${
                            selectedSlot === slot
                              ? "border-gold bg-gold/10 text-text-dark"
                              : "border-gold/20 bg-white text-text-dark hover:border-gold/40"
                          }`}
                        >
                          {formatSlotTimeLabel(slot)}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </ScrollReveal>
          )}

          {step === "details" && selectedService && selectedSlot && (
            <ScrollReveal>
              <button
                type="button"
                onClick={() => setStep("datetime")}
                className="mb-4 inline-flex items-center gap-1 font-inter text-sm text-gold hover:text-deep-gold"
              >
                <ArrowLeft size={14} />
                Change time
              </button>
              <h2 className="mb-2 font-playfair text-2xl font-bold text-text-dark">
                3. Your details &amp; deposit
              </h2>
              <div className="mb-6 rounded-xl border border-gold/20 bg-white p-4 font-inter text-sm text-soft-taupe">
                <p className="font-semibold text-text-dark">{selectedService.name}</p>
                <p className="mt-1 flex items-center gap-2">
                  <Calendar size={14} className="text-gold" />
                  {formatSlotLabel(selectedSlot)}
                </p>
                <p className="mt-2 text-xs">
                  ${BOOKING_DEPOSIT_CAD} CAD deposit required. Cancellations with less than 12
                  hours notice may be charged 100% of the service fee.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border border-gold/25 bg-white px-4 py-3 font-inter text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gold/25 bg-white px-4 py-3 font-inter text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gold/25 bg-white px-4 py-3 font-inter text-sm"
                />
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={goToCheckout}
                className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Redirecting to payment…
                  </>
                ) : (
                  <>
                    Pay ${BOOKING_DEPOSIT_CAD} deposit &amp; confirm
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2} className="mt-12">
            <div className="rounded-2xl border border-gold/20 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Syringe size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-dark">
                    Injectables &amp; fillers
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-soft-taupe">
                    Botox, fillers, mesotherapy, and similar treatments require a{" "}
                    <strong className="font-medium text-text-dark">complimentary consultation</strong>{" "}
                    with our nurse — not online booking.
                  </p>
                  <Link
                    href="/booking"
                    className="mt-4 inline-flex items-center gap-2 font-inter text-sm font-semibold text-gold hover:text-deep-gold"
                  >
                    <Sparkles size={14} />
                    Book a free consultation
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
