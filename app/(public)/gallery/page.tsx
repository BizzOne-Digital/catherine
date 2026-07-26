"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

const categories = ["All", "Treatments", "Transformations", "Clinic", "Events"];

const fallbackItems: GalleryItem[] = [
  { _id: "1", title: "Treatment Room", category: "Clinic", image: "/images/gallery/gallery-1.jpg", description: "Our serene treatment suite" },
  { _id: "2", title: "Skincare Collection", category: "Clinic", image: "/images/gallery/gallery-2.jpg", description: "Medical-grade skincare products" },
  { _id: "3", title: "Facial Treatment", category: "Treatments", image: "/images/gallery/gallery-3.jpg", description: "Signature facial experience" },
  { _id: "4", title: "Skin Analysis", category: "Treatments", image: "/images/gallery/gallery-4.jpg", description: "Personalized skin assessment" },
  { _id: "5", title: "Body Contouring", category: "Treatments", image: "/images/gallery/gallery-5.jpg", description: "Advanced body sculpting session" },
  { _id: "6", title: "Natural Enhancement", category: "Transformations", image: "/images/gallery/gallery-6.jpg", description: "Subtle, natural-looking results" },
  { _id: "7", title: "Glow Restoration", category: "Transformations", image: "/images/gallery/gallery-7.jpg", description: "Radiant skin transformation" },
  { _id: "8", title: "Clinic Interior", category: "Clinic", image: "/images/gallery/gallery-8.jpg", description: "Luxury med spa environment" },
  { _id: "9", title: "Wellness Event", category: "Events", image: "/images/gallery/gallery-9.jpg", description: "Community wellness gathering" },
];

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      type="button"
      className="gallery-page-card w-full text-left"
      whileHover={{ scale: 1.008 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
    >
      {!imgError && resolveCmsImage(item.image, "") ? (
        <CmsImage
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="gallery-page-card-placeholder">
          <ImageIcon size={28} className="text-gold/35" />
        </div>
      )}
      <div className="gallery-page-card-overlay" />
      <div className="gallery-page-card-caption">
        <span className="block font-inter text-[9px] uppercase tracking-[0.18em] text-gold/70">
          {item.category}
        </span>
        <span className="mt-1 block font-playfair text-sm text-warm-beige">{item.title}</span>
      </div>
    </motion.button>
  );
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { get } = usePageContent("gallery");
  const hero = get("hero");

  const eyebrow =
    hero?.subtitle || "Moments of Beauty. Stories of Confidence.";
  const title = hero?.title || "Gallery";
  const content =
    hero?.content ||
    "Explore real moments from our clinic — treatments, transformations, and the luxury experience that defines Lumina Medi Spa.";

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => { if (data?.items?.length >= 4) setItems(data.items); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="gallery-hero relative overflow-hidden pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pt-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[520px]">
            <p className="gallery-hero-eyebrow font-inter text-[10px] font-medium uppercase text-gold/85 sm:text-[11px]">
              {eyebrow}
            </p>

            <h1 className="gallery-hero-title mt-4 font-playfair text-gold">{title}</h1>

            <p className="gallery-hero-tagline mt-4 font-inter font-light text-warm-beige/90">
              See the glow. Feel the difference.
            </p>

            <p className="mt-5 max-w-[24rem] font-inter text-sm font-light leading-relaxed text-warm-beige/75 sm:text-[15px]">
              {content}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="gallery-page-filters mt-10 lg:mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`gallery-page-filter-btn ${activeCategory === cat ? "gallery-page-filter-btn-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid + CTA */}
      <section className="gallery-page-body pb-8">
        <div className="container-luxury">
          <ScrollReveal delay={0.1}>
            <div className="gallery-page-grid">
              {filtered.map((item) => (
                <GalleryCard
                  key={item._id}
                  item={item}
                  onClick={() => setLightboxItem(item)}
                />
              ))}
            </div>
          </ScrollReveal>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <ImageIcon size={40} className="mx-auto mb-4 text-gold/20" />
              <p className="font-playfair text-xl text-warm-beige/50">No images in this category yet.</p>
            </div>
          )}

          <ScrollReveal delay={0.2} className="gallery-page-cta">
            <div className="gallery-page-cta-icon">
              <ImageIcon size={28} strokeWidth={1.2} />
            </div>
            <h2 className="gallery-page-cta-title">Every image tells a story</h2>
            <p className="gallery-page-cta-subtitle">and every story is unique.</p>
            <Link href="/booking" className="gallery-page-cta-btn group">
              Book Your Experience
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-luxury-black/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-gold/20 bg-soft-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1a1410] to-luxury-black">
                {resolveCmsImage(lightboxItem.image, "") ? (
                  <CmsImage
                    src={lightboxItem.image}
                    alt={lightboxItem.title}
                    fill
                    className="object-cover"
                    sizes="512px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon size={24} className="text-gold/40" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="font-inter text-[10px] uppercase tracking-[2px] text-gold/60">
                  {lightboxItem.category}
                </span>
                <h3 className="mt-1 mb-2 font-playfair text-xl text-warm-beige">{lightboxItem.title}</h3>
                {lightboxItem.description && (
                  <p className="font-inter text-sm text-soft-taupe">{lightboxItem.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-luxury-black/80 text-soft-taupe transition-colors hover:text-gold"
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
