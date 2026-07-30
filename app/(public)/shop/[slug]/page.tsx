"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

type Product = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  ingredients?: string;
  howToUse?: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
};

function formatPrice(n: number) {
  return n % 1 === 0 ? `CA$${n.toFixed(0)}` : `CA$${n.toFixed(2)}`;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => {
        const list = d.products || [];
        setProduct(list[0] || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <Loader2 className="animate-spin text-gold" size={28} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxury px-4 pb-24 pt-32 text-center">
        <p className="font-inter text-soft-taupe">Product not found.</p>
        <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-gold">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
      </div>
    );
  }

  const img = resolveCmsImage(product.image, "/images/placeholder-product.svg");
  const paras = product.description.split(/\n\n+/).filter(Boolean);

  return (
    <section className="section-pad section-warm pb-24 pt-28">
      <div className="container-luxury">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 font-inter text-sm text-soft-taupe transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4]">
              {img ? (
                <CmsImage
                  src={img}
                  alt={product.name}
                  fill
                  className="object-contain p-10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ShoppingBag size={48} className="text-gold/40" />
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] text-gold">
              {product.category}
            </span>
            <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 font-playfair text-2xl text-gold">
              {product.salePrice ? (
                <>
                  {formatPrice(product.salePrice)}{" "}
                  <span className="ml-2 text-base text-soft-taupe/50 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                formatPrice(product.price)
              )}
            </p>
            <p className="mt-4 font-inter text-base leading-relaxed text-soft-taupe">
              {product.shortDescription}
            </p>

            <div className="mt-8 space-y-4 border-t border-gold/15 pt-8">
              {paras.map((p, i) => (
                <p
                  key={i}
                  className="whitespace-pre-line font-inter text-sm leading-relaxed text-text-dark/80"
                >
                  {p}
                </p>
              ))}
            </div>

            {product.ingredients && (
              <div className="mt-8">
                <h2 className="mb-2 font-playfair text-lg text-text-dark">Active Ingredients</h2>
                <p className="font-inter text-sm leading-relaxed text-soft-taupe">
                  {product.ingredients}
                </p>
              </div>
            )}

            {product.howToUse && (
              <div className="mt-6">
                <h2 className="mb-2 font-playfair text-lg text-text-dark">How to Use</h2>
                <p className="font-inter text-sm leading-relaxed text-soft-taupe">
                  {product.howToUse}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="hero-btn-primary text-center">
                Book a Consultation
              </Link>
              <Link href="/contact" className="btn-outline-gold rounded-sm text-center">
                Ask About This Product
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
