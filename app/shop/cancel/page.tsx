import Link from "next/link";
import { XCircle, ArrowRight, ShoppingBag } from "lucide-react";

export default function ShopCancelPage() {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center mx-auto mb-7">
          <XCircle size={36} className="text-red-400" />
        </div>
        <h1 className="font-playfair text-4xl text-warm-beige mb-4">Order Cancelled</h1>
        <div className="w-12 h-px bg-gold/40 mx-auto mb-5" />
        <p className="font-cormorant text-xl italic text-soft-taupe mb-4">
          Your order was not completed. No charges were made.
        </p>
        <p className="font-inter text-sm text-soft-taupe/70 mb-8">
          If you experienced an issue, please contact us and we&apos;ll be happy to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-gold rounded-sm inline-flex items-center gap-2 group">
            <ShoppingBag size={14} />
            Return to Shop
          </Link>
          <Link href="/contact" className="btn-outline-gold rounded-sm inline-flex items-center gap-2">
            Contact Us
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
