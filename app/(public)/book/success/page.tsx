"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

type AppointmentReceipt = {
  id: string;
  serviceName: string;
  customerName: string;
  email: string;
  phone: string;
  startLocal: string;
  endLocal: string;
  depositAmount: number;
  status: string;
  emailSent: boolean;
};

function formatWhen(startLocal: string) {
  const [datePart, timePart] = startLocal.split("T");
  const [h, m] = timePart.split(":").map(Number);
  const utc = new Date(`${datePart}T12:00:00Z`);
  const dateLabel = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(utc);
  const timeLabel = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  return `${dateLabel} at ${timeLabel} (Eastern Time)`;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [receipt, setReceipt] = useState<AppointmentReceipt | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/booking/receipt?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "Could not load confirmation");
        setReceipt(data.appointment);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not load confirmation");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <section className="section-pad section-warm pb-24 pt-32">
      <div className="container-luxury mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-6 text-gold" size={48} />
          <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
            Appointment confirmed
          </h1>
          {loading && (
            <div className="mt-6 flex items-center justify-center gap-2 font-inter text-sm text-soft-taupe">
              <Loader2 size={18} className="animate-spin text-gold" />
              Loading your confirmation…
            </div>
          )}
          {error && (
            <p className="mt-4 font-inter text-sm text-red-700">{error}</p>
          )}
          {receipt && (
            <>
              <p className="mt-4 font-inter text-base leading-relaxed text-soft-taupe">
                Thank you, {receipt.customerName}.{" "}
                {receipt.emailSent
                  ? `A confirmation email has been sent to ${receipt.email}.`
                  : "Your payment was received — confirmation email will arrive shortly."}
              </p>
              <div className="mt-8 rounded-2xl border border-gold/25 bg-white p-6 text-left shadow-card sm:p-8">
                <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Appointment details
                </p>
                <p className="mt-3 font-playfair text-xl font-bold text-text-dark">
                  {receipt.serviceName}
                </p>
                <p className="mt-2 font-inter text-sm text-soft-taupe">
                  {formatWhen(receipt.startLocal)}
                </p>
                <p className="mt-4 font-inter text-sm text-soft-taupe">
                  Deposit paid:{" "}
                  <span className="font-semibold text-text-dark">
                    ${receipt.depositAmount.toFixed(2)} CAD
                  </span>
                </p>
                <p className="mt-2 flex items-center gap-2 font-inter text-xs text-soft-taupe">
                  <Mail size={14} className="text-gold" />
                  Reference: {receipt.id}
                </p>
              </div>
            </>
          )}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-gold inline-flex rounded-sm px-6 py-3">
              Back to home
            </Link>
            <Link
              href="/book"
              className="inline-flex rounded-sm border border-gold/30 px-6 py-3 font-inter text-sm font-semibold text-gold hover:bg-gold/5"
            >
              Book another appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center pt-28 font-inter text-soft-taupe">
          Loading…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
