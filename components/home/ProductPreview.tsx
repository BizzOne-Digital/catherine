"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { usePageContent } from "@/components/cms/usePageContent";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  slug?: string;
}

const fallbackProducts: Product[] = [
  {
    _id: "1",
    name: "Cebelia L.C.E. Balm (15ml)",
    shortDescription:
      "Repairing, decongesting and soothing 3-in-1 balm for wounds, bruises and post-procedure care.",
    price: 27,
    image: "/images/placeholder-product.svg",
    category: "Cebelia",
  },
  {
    _id: "2",
    name: "Cebelia Extreme Care (75ml)",
    shortDescription:
      "Complete soothing and anti-redness repair treatment for face and body after aesthetic procedures.",
    price: 49,
    image: "/images/placeholder-product.svg",
    category: "Cebelia",
  },
  {
    _id: "3",
    name: "Cebelia Anti-Hair Loss Lotion (60ml)",
    shortDescription:
      "CEBELINE® lotion that strengthens hair bulb anchoring and stimulates growth for men and women.",
    price: 54,
    image: "/images/placeholder-product.svg",
    category: "Cebelia",
  },
  {
    _id: "4",
    name: "FORE Essentials Mint Lip Oil",
    shortDescription:
      "All-natural lip oil with castor, jojoba and peppermint oils for soft, smooth, refreshed lips.",
    price: 30,
    image: "/images/placeholder-product.svg",
    category: "FORE Essentials",
  },
];

function formatPrice(n: number) {
  return n % 1 === 0 ? `CA$${n.toFixed(0)}` : `CA$${n.toFixed(2)}`;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const href = product.slug ? `/shop/${product.slug}` : "/shop";
  const img = resolveCmsImage(product.image, "/images/placeholder-product.svg");

  return (
    <ScrollReveal delay={index * 0.08} className="h-full">
      <Link href={href} className="block h-full">
        <motion.div
          className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/20 surface-card transition-all duration-500 hover:border-gold/35"
          whileHover={{ y: -4 }}
        >
          <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4]">
            {img ? (
              <CmsImage
                src={img}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                  <ShoppingBag size={28} className="text-gold/60" />
                </div>
              </div>
            )}
            <span className="absolute left-3 top-3 z-10 rounded-full border border-gold/25 bg-ivory/90 px-2 py-1 font-inter text-[9px] uppercase tracking-[2px] text-gold backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-1 font-playfair text-base font-semibold text-text-dark transition-colors duration-300 group-hover:text-gold">
              {product.name}
            </h3>
            <p className="mb-4 flex-1 font-inter text-xs leading-relaxed text-soft-taupe">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between">
              <div>
                {product.salePrice ? (
                  <>
                    <span className="font-playfair text-lg text-gold">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="ml-2 font-inter text-xs text-soft-taupe/50 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-playfair text-lg text-gold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <span className="font-inter text-xs text-soft-taupe transition-colors duration-300 group-hover:text-gold">
                View →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

export default function ProductPreview() {
  const { get } = usePageContent("home");
  const sec = get("shop_collection");
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data?.products?.length) setProducts(data.products.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold/3 blur-[120px]" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow={sec?.subtitle || "Skincare"}
            title={sec?.title || "Shop Our Collection"}
            subtitle={
              sec?.content ||
              "Medical-grade skincare to extend and enhance your in-clinic results at home."
            }
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="btn-outline-gold group inline-flex items-center gap-3 rounded-sm"
          >
            {sec?.ctaLabel || "View All Products"}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
