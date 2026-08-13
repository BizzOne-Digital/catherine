"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BeforeAfterCompare from "@/components/ui/BeforeAfterCompare";
import { HOME_BEFORE_AFTER, HOME_CLINIC_PHOTOS } from "@/lib/homeGalleryData";

export default function HomeGallery() {
  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-gold/4 blur-[100px]" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Gallery"
            title="Real Results & Our Clinic"
            subtitle="Explore before-and-after transformations by treatment, then step inside our Mississauga clinic."
          />
        </ScrollReveal>

        <div className="mt-12">
          <ScrollReveal>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-inter text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                  Before & After
                </p>
                <h3 className="mt-2 font-playfair text-2xl font-bold text-text-dark sm:text-3xl">
                  Treatment Results
                </h3>
              </div>
              <p className="hidden max-w-xs font-inter text-sm text-soft-taupe sm:block">
                Drag the slider to compare. Each result is labeled by service.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {HOME_BEFORE_AFTER.map((item, i) => (
              <ScrollReveal key={item.service} delay={i * 0.06}>
                <BeforeAfterCompare
                  beforeSrc={item.beforeSrc}
                  afterSrc={item.afterSrc}
                  title={item.service}
                  subtitle="Before & after"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-gold/15 pt-14">
          <ScrollReveal>
            <div className="mb-8">
              <p className="font-inter text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                Our Space
              </p>
              <h3 className="mt-2 font-playfair text-2xl font-bold text-text-dark sm:text-3xl">
                Inside Lumina Medi Spa
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_CLINIC_PHOTOS.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 0.05}>
                <figure className="group overflow-hidden rounded-xl border border-gold/20 bg-ivory/95 shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/55 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3">
                      <span className="font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-gold/90">
                        {photo.category}
                      </span>
                      <p className="font-playfair text-lg text-white">{photo.label}</p>
                    </figcaption>
                  </div>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
