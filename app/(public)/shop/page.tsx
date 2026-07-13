"use client";
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Leaf,
  Sprout,
  Droplets,
  ShieldCheck,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProductCard from "@/components/shop/ProductCard";

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  stockStatus: string;
}

const fallbackProducts: Product[] = [
  { _id: "1", name: "Hydrating HA Serum", shortDescription: "Intense hydration with triple-weight hyaluronic acid for all skin types", price: 85, image: "/images/product-1.jpg", category: "Serums", stockStatus: "in_stock" },
  { _id: "2", name: "Vitamin C Brightening Complex", shortDescription: "20% L-Ascorbic acid serum for luminous, even-toned skin", price: 95, image: "/images/product-2.jpg", category: "Serums", stockStatus: "in_stock" },
  { _id: "3", name: "Peptide Renewal Cream", shortDescription: "Advanced neuropeptide moisturizer targeting fine lines and firmness", price: 110, image: "/images/product-3.jpg", category: "Moisturizers", stockStatus: "in_stock" },
  { _id: "4", name: "SPF 50+ Daily Shield", shortDescription: "Elegant broad-spectrum sunscreen with a sheer, non-greasy finish", price: 65, image: "/images/product-4.jpg", category: "Sun Care", stockStatus: "in_stock" },
  { _id: "5", name: "Retinol Resurfacing Serum", shortDescription: "Encapsulated retinol for overnight skin renewal and refinement", price: 90, salePrice: 75, image: "/images/product-5.jpg", category: "Serums", stockStatus: "in_stock" },
  { _id: "6", name: "Niacinamide Pore Refiner", shortDescription: "10% niacinamide concentrate minimizing pores and controlling shine", price: 70, image: "/images/product-6.jpg", category: "Treatments", stockStatus: "in_stock" },
  { _id: "7", name: "Post-Treatment Repair Balm", shortDescription: "Soothing barrier recovery cream for post-procedure skin", price: 55, image: "/images/product-7.jpg", category: "Treatments", stockStatus: "limited" },
  { _id: "8", name: "AHA/BHA Exfoliating Toner", shortDescription: "Gentle chemical exfoliant for smooth, refined skin texture", price: 60, image: "/images/product-8.jpg", category: "Toners", stockStatus: "in_stock" },
];

const categories = ["All", "Serums", "Moisturizers", "Toners", "Treatments", "Sun Care"];

const heroFeatures = [
  { icon: Leaf, label: "Premium Quality" },
  { icon: Sprout, label: "Natural Ingredients" },
  { icon: Droplets, label: "Safe & Effective" },
  { icon: ShieldCheck, label: "Trusted Care" },
];

const trustItems = [
  { icon: Truck, label: "Fast & Reliable Shipping" },
  { icon: Shield, label: "Secure Payment" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Headphones, label: "Dedicated Support" },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { if (data?.products?.length) setProducts(data.products); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const scrollToProducts = () => {
    document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="shop-hero relative flex min-h-0 flex-col overflow-hidden lg:min-h-[min(96vh,920px)]">
        <div className="relative z-10 flex-1 px-6 pb-8 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pb-36 lg:pt-32">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[520px]">
            <p className="shop-hero-eyebrow font-inter text-[10px] font-medium uppercase text-gold/85 sm:text-[11px]">
              Discover. Choose. Glow.
            </p>

            <h1 className="shop-hero-title mt-4 font-playfair text-gold">Shop</h1>

            <p className="shop-hero-subtitle mt-3 font-inter font-semibold uppercase text-warm-beige">
              Beauty & Wellness
            </p>

            <p className="mt-5 max-w-[22rem] font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              Premium products for your skin, body and everyday self-care.
            </p>

            <div className="shop-hero-features mt-8">
              {heroFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="shop-hero-feature">
                  <div className="shop-hero-feature-icon">
                    <Icon size={18} strokeWidth={1.4} />
                  </div>
                  <span className="shop-hero-feature-label">{label}</span>
                </div>
              ))}
            </div>

            <button type="button" onClick={scrollToProducts} className="shop-hero-cta mt-8">
              <ShoppingBag size={15} />
              Shop Now
            </button>
          </ScrollReveal>
        </div>

        <div className="shop-hero-trust-bar relative z-10 mt-auto w-full">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="shop-hero-trust-item">
              <Icon size={16} strokeWidth={1.4} className="shop-hero-trust-icon" />
              <span className="shop-hero-trust-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="shop-products" className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal className="mb-10 text-center">
            <span className="mb-3 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
              The Collection
            </span>
            <h2 className="font-playfair text-3xl text-warm-beige lg:text-4xl">
              Curated <span className="text-gold">Products</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 font-inter text-xs uppercase tracking-[2px] transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-gold bg-gold text-luxury-black"
                    : "border-gold/20 text-soft-taupe hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, i) => (
                <ScrollReveal key={product._id} delay={i * 0.07}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <ShoppingBag size={40} className="mx-auto mb-4 text-gold/20" />
              <p className="font-playfair text-xl text-warm-beige/50">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
