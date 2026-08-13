"use client";

import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useSiteSettings } from "@/components/cms/useSiteSettings";
import {
  getGoogleMapEmbedUrl,
  getGoogleMapLinkUrl,
} from "@/lib/homeGalleryData";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ClinicMap({
  title = "Visit Our Clinic",
  subtitle = "42 Village Centre Place, Unit 100 · Mississauga, Ontario",
  className = "",
}: Props) {
  const { settings } = useSiteSettings();
  const embedUrl = getGoogleMapEmbedUrl(settings.address, settings.googleMapsUrl);
  const linkUrl = getGoogleMapLinkUrl(settings.address, settings.googleMapsUrl);

  return (
    <section className={`section-pad-sm section-warm ${className}`}>
      <div className="container-luxury">
        <ScrollReveal className="mb-8 text-center">
          <span className="mb-3 block font-inter text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
            Location
          </span>
          <h2 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm leading-relaxed text-soft-taupe">
            {subtitle}
          </p>
          <p className="mx-auto mt-2 flex items-center justify-center gap-2 font-inter text-sm text-warm-beige">
            <MapPin size={15} className="text-gold" />
            {settings.address}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-gold/25 bg-ivory shadow-card">
            <iframe
              title="Lumina Medi Spa location on Google Maps"
              src={embedUrl}
              className="h-[min(70vh,520px)] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-5 flex justify-center">
            <Link
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center gap-2 rounded-sm"
            >
              Open in Google Maps
              <ExternalLink size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
