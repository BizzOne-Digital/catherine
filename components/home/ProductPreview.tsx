"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
}

const fallbackProducts: Product[] = [
  { _id: "1", name: "Peptide Renewal Cream", shortDescription: "Advanced neuropeptide moisturizer targeting fine lines and firmness", price: 110, image: "/images/product-1.jpg", category: "Moisturizers" },
  { _id: "2", name: "Hydrating HA Serum", shortDescription: "Intense hydration with triple-weight hyaluronic acid for all skin types", price: 85, image: "/images/product-2.jpg", category: "Serums" },
  { _id: "3", name: "Vitamin C Brightening Complex", shortDescription: "20% L-Ascorbic acid serum for luminous, even-toned skin", price: 95, image: "/images/product-3.jpg", category: "Serums" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="group relative rounded-xl overflow-hidden border border-gold/20 surface-card hover:border-gold/35 transition-all duration-500"
        whileHover={{ y: -4 }}
      >
        {/* Product image area */}
        <div className="relative w-full h-56 bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <ShoppingBag size={28} className="text-gold/60" />
              </div>
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 font-inter text-[9px] tracking-[2px] uppercase bg-ivory/90 text-gold border border-gold/25 px-2 py-1 rounded-full backdrop-blur-sm z-10">
            {product.category}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-playfair text-base text-text-dark mb-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-inter text-xs text-soft-taupe leading-relaxed mb-4">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div>
              {product.salePrice ? (
                <>
                  <span className="font-playfair text-lg text-gold">${product.salePrice}</span>
                  <span className="font-inter text-xs text-soft-taupe/50 line-through ml-2">${product.price}</span>
                </>
              ) : (
                <span className="font-playfair text-lg text-gold">${product.price}</span>
              )}
            </div>
            <Link href="/shop" className="font-inter text-xs text-soft-taupe hover:text-gold transition-colors duration-300">
              View →
            </Link>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProductPreview() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data?.products?.length >= 2) setProducts(data.products.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-pad section-warm-alt relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="container-luxury">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Curated Skincare"
            title="Shop Our Collection"
            subtitle="Medical-grade skincare to extend and enhance your in-clinic results at home."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 lg:max-w-5xl lg:mx-auto">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.3} className="flex justify-center mt-10">
          <Link
            href="/shop"
            className="btn-outline-gold rounded-sm group inline-flex items-center gap-3"
          >
            Shop All Products
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
