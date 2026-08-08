"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

export default function ShopCancelPage() {
  const { openCart, itemCount } = useCart();

  return (
    <section className="section-pad section-warm pb-24 pt-32">
      <div className="container-luxury mx-auto max-w-xl text-center">
        <XCircle className="mx-auto mb-6 text-soft-taupe" size={48} />
        <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
          Checkout cancelled
        </h1>
        <p className="mt-4 font-inter text-base leading-relaxed text-soft-taupe">
          Your payment was not completed. Your cart is still saved if you want to try again.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {itemCount > 0 ? (
            <button type="button" onClick={openCart} className="hero-btn-primary">
              Return to Cart
            </button>
          ) : (
            <Link href="/shop" className="hero-btn-primary">
              Back to Shop
            </Link>
          )}
          <Link href="/shop" className="btn-outline-gold rounded-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
