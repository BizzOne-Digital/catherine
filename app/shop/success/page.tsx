import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";

export default function ShopSuccessPage() {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-7">
          <CheckCircle size={36} className="text-gold" />
        </div>
        <h1 className="font-playfair text-4xl text-warm-beige mb-4">Order Confirmed!</h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />
        <p className="font-cormorant text-xl italic text-soft-taupe mb-4">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <p className="font-inter text-sm text-soft-taupe/70 mb-8 leading-relaxed">
          You&apos;ll receive an email confirmation with your order details shortly. 
          We ship all products within 2-3 business days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-outline-gold rounded-sm inline-flex items-center gap-2">
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
          <Link href="/" className="btn-gold rounded-sm inline-flex items-center gap-2 group">
            Back to Home
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
