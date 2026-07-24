"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = ["All", "Botox", "Fillers", "Facials", "Body", "Skin"] as const;
type Category = (typeof categories)[number];

type GalleryItem = {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  subtitle: string;
  /** Place your image at this path under public/ — e.g. public/images/gallery/skin-renewal.jpg */
  image: string;
  area: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "skin-renewal",
    category: "Skin",
    title: "SKIN RENEWAL",
    subtitle: "Glow. Refined. You.",
    image: "/images/gallery/gallery-1.jpg",
    area: "gallery-area-skin",
  },
  {
    id: "signature-facial",
    category: "Facials",
    title: "SIGNATURE FACIAL",
    subtitle: "Deep cleanse. Deep glow.",
    image: "/images/gallery/gallery-2.jpg",
    area: "gallery-area-facial",
  },
  {
    id: "injectables",
    category: "Fillers",
    title: "INJECTABLES",
    subtitle: "Refine. Restore. Refresh.",
    image: "/images/gallery/gallery-3.jpg",
    area: "gallery-area-injectables",
  },
  {
    id: "body-sculpting",
    category: "Body",
    title: "BODY SCULPTING",
    subtitle: "Sculpt confidence.",
    image: "/images/gallery/gallery-4.jpg",
    area: "gallery-area-body",
  },
  {
    id: "luxury-experience",
    category: "Facials",
    title: "LUXURY EXPERIENCE",
    subtitle: "Designed around you.",
    image: "/images/gallery/gallery-5.jpg",
    area: "gallery-area-luxury",
  },
  {
    id: "medical-skincare",
    category: "Skin",
    title: "MEDICAL GRADE SKINCARE",
    subtitle: "Results you can feel.",
    image: "/images/gallery/gallery-6.jpg",
    area: "gallery-area-skincare",
  },
];

function GalleryBentoCard({
  item,
  dimmed,
}: {
  item: GalleryItem;
  dimmed: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      className={`gallery-bento-card ${item.area} ${dimmed ? "gallery-bento-card-dimmed" : ""}`}
      whileHover={dimmed ? undefined : { scale: 1.008 }}
      transition={{ duration: 0.35 }}
    >
      <div className="gallery-bento-card-inner group">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="gallery-bento-placeholder" aria-hidden="true" />
        )}

        <div className="gallery-bento-overlay" />
        <div className="gallery-bento-caption">
          <h3 className="gallery-bento-title">{item.title}</h3>
          <p className="gallery-bento-subtitle">{item.subtitle}</p>
          <span className="gallery-bento-line" />
        </div>
      </div>
    </motion.article>
  );
}

export default function GalleryPreview() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const isVisible = (category: GalleryItem["category"]) =>
    activeFilter === "All" || activeFilter === category;

  return (
    <section className="gallery-section section-pad relative overflow-hidden section-warm">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-medium uppercase tracking-[0.35em] text-gold/80">
              Before &amp; After
            </span>
            <h2 className="mt-3 font-playfair text-3xl text-text-dark md:text-4xl lg:text-[2.75rem] font-bold">
              Real Results
            </h2>
            <p className="mt-4 max-w-2xl font-cormorant text-lg italic text-soft-taupe md:text-xl">
              Every transformation tells a story. See the natural, beautiful results our clients
              experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`gallery-filter-btn ${activeFilter === cat ? "gallery-filter-btn-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-10">
          <div className="gallery-bento-grid">
            {galleryItems.map((item) => (
              <GalleryBentoCard
                key={item.id}
                item={item}
                dimmed={!isVisible(item.category)}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35} className="mt-12 flex justify-center">
          <Link href="/gallery" className="gallery-view-btn group inline-flex items-center gap-3">
            View Full Gallery
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
