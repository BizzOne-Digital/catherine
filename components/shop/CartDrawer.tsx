"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  cartUnitPrice,
  formatCartPrice,
  useCart,
} from "@/components/shop/CartProvider";
import CmsImage from "@/components/cms/CmsImage";
import { calcHst, HST_PERCENT } from "@/lib/shopTax";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
  } = useCart();
  const estimatedTax = calcHst(subtotal);
  const estimatedTotal = Math.round((subtotal + estimatedTax) * 100) / 100;

  const goToCheckout = () => {
    if (items.length === 0) return;
    closeCart();
    router.push("/shop/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[210] bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[220] flex h-full w-full max-w-md flex-col border-l border-gold/20 bg-[#FAF4EB] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
              <div>
                <p className="font-playfair text-xl text-text-dark">Your Cart</p>
                <p className="font-inter text-xs text-soft-taupe">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 text-text-dark transition-colors hover:bg-gold/10 hover:text-gold"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="text-gold/40" size={36} />
                  <p className="font-inter text-sm text-soft-taupe">
                    Your cart is empty.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="hero-btn-primary mt-2 text-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const price = cartUnitPrice(item);
                    return (
                      <li
                        key={item.productId}
                        className="flex gap-3 rounded-xl border border-gold/15 bg-white/70 p-3"
                      >
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeCart}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4]"
                        >
                          <CmsImage
                            src={item.image}
                            fallback="/images/placeholder-product.svg"
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={closeCart}
                            className="line-clamp-2 font-playfair text-sm font-semibold text-text-dark hover:text-gold"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 font-playfair text-gold">
                            {formatCartPrice(price)}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-full border border-gold/25 bg-ivory/80">
                              <button
                                type="button"
                                className="p-1.5 text-text-dark hover:text-gold disabled:opacity-40"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                disabled={checkingOut}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-[1.5rem] text-center font-inter text-sm">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="p-1.5 text-text-dark hover:text-gold disabled:opacity-40"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                disabled={checkingOut}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              className="p-1.5 text-soft-taupe transition-colors hover:text-red-500"
                              aria-label={`Remove ${item.name}`}
                              disabled={checkingOut}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gold/15 bg-white/50 px-5 py-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-inter text-sm text-soft-taupe">Subtotal</span>
                  <span className="font-inter text-sm text-text-dark">
                    {formatCartPrice(subtotal)}
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-inter text-sm text-soft-taupe">
                    HST ({HST_PERCENT}%)
                  </span>
                  <span className="font-inter text-sm text-text-dark">
                    {formatCartPrice(estimatedTax)}
                  </span>
                </div>
                <div className="mb-4 flex items-center justify-between border-t border-gold/10 pt-3">
                  <span className="font-inter text-sm font-medium text-text-dark">Estimated total</span>
                  <span className="font-playfair text-xl text-gold">
                    {formatCartPrice(estimatedTotal)}
                  </span>
                </div>
                <p className="mb-4 font-inter text-[11px] leading-relaxed text-soft-taupe">
                  Next: enter your details, then pay securely with Stripe (13% HST included).
                </p>
                <button
                  type="button"
                  onClick={goToCheckout}
                  className="hero-btn-primary flex w-full items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-3 w-full font-inter text-sm text-soft-taupe transition-colors hover:text-gold"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
