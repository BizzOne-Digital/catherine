"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Loader2,
  Sparkles,
  Syringe,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  BOOKING_CATEGORY_LABELS,
  isOnlineBookableCategory,
} from "@/lib/bookingConfig";
import { phoneToTel, useSiteSettings } from "@/components/cms/useSiteSettings";
import { resolveGoogleAppointmentUrl } from "@/lib/siteSettings";

type TreatmentRow = {
  _id?: string;
  name: string;
  slug: string;
  categorySlug: string;
  price?: string;
  hidePrice?: boolean;
};

export default function OnlineBookingView() {
  const searchParams = useSearchParams();
  const preCategory = searchParams.get("category") || "";
  const preTreatment = searchParams.get("treatment") || "";
  const { settings } = useSiteSettings();
  const googleUrl = resolveGoogleAppointmentUrl(settings);
  const telHref = phoneToTel(settings.phone);

  const [loading, setLoading] = useState(true);
  const [byCategory, setByCategory] = useState<Record<string, TreatmentRow[]>>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/api/categories")
      .then((r) => r.json())
      .then(async (data) => {
        const categories = (data.categories || []).filter((c: { slug: string }) =>
          isOnlineBookableCategory(c.slug)
        );
        const entries = await Promise.all(
          categories.map(async (cat: { slug: string; title: string }) => {
            const r = await fetch(
              `/api/treatments?category=${encodeURIComponent(cat.slug)}`
            );
            const d = await r.json();
            const treatments = (d.treatments || []).map(
              (t: TreatmentRow & { shortDescription?: string }) => ({
                _id: t._id,
                name: t.name,
                slug: t.slug,
                categorySlug: cat.slug,
                price: t.price,
                hidePrice: t.hidePrice,
              })
            );
            return [cat.slug, treatments] as const;
          })
        );
        if (cancelled) return;
        const map: Record<string, TreatmentRow[]> = {};
        for (const [slug, list] of entries) {
          if (list.length) map[slug] = list;
        }
        setByCategory(map);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(() => {
    if (!preCategory || !preTreatment) return null;
    const list = byCategory[preCategory] || [];
    return list.find((t) => t.slug === preTreatment) || null;
  }, [byCategory, preCategory, preTreatment]);

  const openGoogleBooking = (treatmentName?: string) => {
    if (!googleUrl) return;
    const url = new URL(googleUrl);
    if (treatmentName) {
      url.searchParams.set("treatment", treatmentName.slice(0, 120));
    }
    window.open(url.toString(), "_blank", "noopener,noreferrer");
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
              Schedule facials, laser, muscle toning, microneedling, and IPL directly with
              Lumina Medi Spa. Your appointment syncs with our clinic calendar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad section-warm">
        <div className="container-luxury max-w-3xl">
          {selected && (
            <ScrollReveal className="mb-8">
              <div className="rounded-2xl border border-gold/30 bg-white p-6 shadow-card sm:p-8">
                <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Selected treatment
                </p>
                <h2 className="mt-2 font-playfair text-2xl font-bold text-text-dark">
                  {selected.name}
                </h2>
                {selected.price && !selected.hidePrice && (
                  <p className="mt-1 font-playfair text-gold">{selected.price}</p>
                )}
                {googleUrl ? (
                  <button
                    type="button"
                    onClick={() => openGoogleBooking(selected.name)}
                    className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm sm:w-auto"
                  >
                    <Calendar size={16} />
                    Choose date &amp; time
                    <ExternalLink size={14} />
                  </button>
                ) : (
                  <p className="mt-4 font-inter text-sm text-soft-taupe">
                    Online scheduling is being finalized. Please call{" "}
                    <a href={telHref} className="font-semibold text-gold hover:underline">
                      {settings.phone}
                    </a>{" "}
                    or{" "}
                    <Link href="/contact" className="font-semibold text-gold hover:underline">
                      contact us
                    </Link>{" "}
                    to book.
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}

          {!selected && googleUrl && (
            <ScrollReveal className="mb-10">
              <div className="rounded-2xl border border-gold/25 bg-white p-6 text-center shadow-card sm:p-8">
                <Calendar className="mx-auto mb-4 text-gold" size={32} />
                <h2 className="font-playfair text-xl font-bold text-text-dark sm:text-2xl">
                  Ready to schedule?
                </h2>
                <p className="mx-auto mt-2 max-w-md font-inter text-sm text-soft-taupe">
                  Pick a time that works for you. Appointments are added to our clinic
                  calendar automatically.
                </p>
                <button
                  type="button"
                  onClick={() => openGoogleBooking()}
                  className="btn-gold mt-6 inline-flex items-center gap-2 rounded-sm"
                >
                  Open scheduling calendar
                  <ExternalLink size={14} />
                </button>
              </div>
            </ScrollReveal>
          )}

          {!googleUrl && !selected && (
            <ScrollReveal className="mb-10">
              <div className="rounded-2xl border border-gold/20 bg-[#FAF4EB] p-6 text-center">
                <p className="font-inter text-sm text-soft-taupe">
                  Select a treatment below, or call{" "}
                  <a href={telHref} className="font-semibold text-gold">
                    {settings.phone}
                  </a>{" "}
                  to book.
                </p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <h2 className="mb-6 font-playfair text-2xl font-bold text-text-dark">
              Treatments you can book online
            </h2>
          </ScrollReveal>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 font-inter text-sm text-soft-taupe">
              <Loader2 size={18} className="animate-spin text-gold" />
              Loading treatments…
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(byCategory).map(([slug, treatments], idx) => (
                <ScrollReveal key={slug} delay={idx * 0.05}>
                  <div>
                    <h3 className="mb-4 font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                      {BOOKING_CATEGORY_LABELS[slug] || slug}
                    </h3>
                    <ul className="space-y-3">
                      {treatments.map((t) => {
                        const isSelected =
                          preCategory === slug && preTreatment === t.slug;
                        const href = `/book?category=${encodeURIComponent(slug)}&treatment=${encodeURIComponent(t.slug)}`;
                        return (
                          <li key={t._id || t.slug}>
                            <div
                              className={`flex flex-col gap-3 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
                                isSelected
                                  ? "border-gold/50 shadow-gold-sm"
                                  : "border-gold/15"
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="font-playfair text-lg font-semibold text-text-dark">
                                  {t.name}
                                </p>
                                {t.price && !t.hidePrice && (
                                  <p className="mt-0.5 font-inter text-sm text-gold">
                                    {t.price}
                                  </p>
                                )}
                              </div>
                              <div className="flex shrink-0 gap-2">
                                <Link
                                  href={`/services/${slug}/${t.slug}`}
                                  className="inline-flex items-center rounded-sm border border-gold/30 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold/5"
                                >
                                  Details
                                </Link>
                                {googleUrl ? (
                                  <button
                                    type="button"
                                    onClick={() => openGoogleBooking(t.name)}
                                    className="inline-flex items-center gap-1 rounded-sm bg-gold px-4 py-2 font-inter text-xs font-bold uppercase tracking-wider text-white hover:bg-deep-gold"
                                  >
                                    Book
                                    <ArrowRight size={12} />
                                  </button>
                                ) : (
                                  <Link
                                    href={href}
                                    className="inline-flex items-center gap-1 rounded-sm bg-gold px-4 py-2 font-inter text-xs font-bold uppercase tracking-wider text-white hover:bg-deep-gold"
                                  >
                                    Select
                                    <ArrowRight size={12} />
                                  </Link>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
