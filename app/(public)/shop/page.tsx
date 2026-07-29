"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsPageHero from "@/components/cms/CmsPageHero";
import { resolveCmsImage } from "@/lib/cmsImage";

type Product = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
};

function formatPrice(n: number) {
  return n % 1 === 0 ? `CA$${n.toFixed(0)}` : `CA$${n.toFixed(2)}`;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered =
    category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <CmsPageHero
        slug="shop"
        fallback={{
          eyebrow: "Retail Skincare",
          title: "Shop Our|Collection",
          content:
            "Medical-grade and clinical skincare from Cebelia, FORE Essentials, and Naturmed — curated to support your treatment results at home.",
        }}
      />

      <section className="section-pad section-warm relative overflow-hidden pb-24">
        <div className="container-luxury">
          {!loading && categories.length > 1 && (
            <ScrollReveal className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`gallery-filter-btn ${category === cat ? "gallery-filter-btn-active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-xl border border-gold/15 bg-ivory/60"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => {
                const img = resolveCmsImage(
                  product.image,
                  "/images/placeholder-product.svg"
                );
                return (
                  <ScrollReveal key={product._id} delay={(i % 6) * 0.05} className="h-full">
                    <Link href={`/shop/${product.slug}`} className="block h-full">
                      <motion.article
                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/20 bg-ivory/95 shadow-card transition-all duration-500 hover:border-gold/40"
                        whileHover={{ y: -4 }}
                      >
                        <div className="relative h-56 bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4]">
                          {img ? (
                            <Image
                              src={img}
                              alt={product.name}
                              fill
                              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ShoppingBag size={36} className="text-gold/40" />
                            </div>
                          )}
                          <span className="absolute left-3 top-3 rounded-full border border-gold/25 bg-white/90 px-2.5 py-1 font-inter text-[10px] uppercase tracking-wider text-gold">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h2 className="mb-2 font-playfair text-xl font-bold text-text-dark transition-colors group-hover:text-gold">
                            {product.name}
                          </h2>
                          <p className="mb-4 flex-1 font-inter text-sm leading-relaxed text-soft-taupe">
                            {product.shortDescription}
                          </p>
                          <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                            <span className="font-playfair text-xl text-gold">
                              {formatPrice(product.price)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-gold/80">
                              Details <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="py-16 text-center font-inter text-soft-taupe">
              No products in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
