"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingBag, Loader2, Minus, Plus } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { formatCartPrice } from "@/components/shop/CartProvider";

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
  stockStatus?: "in_stock" | "out_of_stock" | "limited";
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
  const outOfStock = product.stockStatus === "out_of_stock";
  const cartProduct = {
    productId: product._id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    slug: product.slug,
    stockStatus: product.stockStatus,
  };

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
              {outOfStock && (
                <span className="absolute left-4 top-4 rounded-full border border-soft-taupe/30 bg-white/95 px-3 py-1 font-inter text-[10px] uppercase tracking-wider text-soft-taupe">
                  Sold out
                </span>
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
                  {formatCartPrice(product.salePrice)}{" "}
                  <span className="ml-2 text-base text-soft-taupe/50 line-through">
                    {formatCartPrice(product.price)}
                  </span>
                </>
              ) : (
                formatCartPrice(product.price)
              )}
            </p>
            {product.stockStatus === "limited" && (
              <p className="mt-2 font-inter text-xs uppercase tracking-wider text-amber-700/80">
                Limited stock
              </p>
            )}
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

            <div className="mt-10 space-y-4">
              {!outOfStock && (
                <div className="flex items-center gap-3">
                  <span className="font-inter text-sm text-soft-taupe">Quantity</span>
                  <div className="inline-flex items-center rounded-full border border-gold/25 bg-white/70">
                    <button
                      type="button"
                      className="p-2 text-text-dark hover:text-gold"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[2rem] text-center font-inter text-sm">{quantity}</span>
                    <button
                      type="button"
                      className="p-2 text-text-dark hover:text-gold"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  product={cartProduct}
                  quantity={quantity}
                  mode="add"
                  className="hero-btn-primary flex-1"
                />
                <AddToCartButton
                  product={cartProduct}
                  quantity={quantity}
                  mode="buyNow"
                  className="btn-outline-gold flex-1 rounded-sm"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/booking" className="btn-outline-gold flex-1 rounded-sm text-center">
                  Book a Consultation
                </Link>
                <Link href="/contact" className="text-center font-inter text-sm text-soft-taupe underline-offset-4 hover:text-gold hover:underline sm:py-3">
                  Ask About This Product
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
