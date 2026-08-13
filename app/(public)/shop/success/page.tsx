"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) return;

    fetch("/api/shop/confirm-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch((err) => {
      console.error("Order confirmation backup failed:", err);
    });
  }, [sessionId]);

  return (
    <section className="section-pad section-warm pb-24 pt-32">
      <div className="container-luxury mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto mb-6 text-gold" size={48} />
        <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mt-4 font-inter text-base leading-relaxed text-soft-taupe">
          Your payment was successful. A confirmation email is on its way with your order details.
        </p>
        {sessionId && (
          <p className="mt-4 break-all font-inter text-xs text-soft-taupe/70">
            Reference: {sessionId}
          </p>
        )}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="hero-btn-primary">
            Continue Shopping
          </Link>
          <Link href="/contact" className="btn-outline-gold rounded-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ShopSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center pt-28 font-inter text-soft-taupe">
          Loading…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
