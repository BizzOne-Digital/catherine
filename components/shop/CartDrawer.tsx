"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart, count } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Unable to start checkout. Please try again.");
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[400] bg-luxury-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[401] w-full max-w-md bg-soft-black border-l border-gold/15 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <span className="font-playfair text-xl text-warm-beige">Your Cart</span>
                {count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gold text-luxury-black text-[10px] font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold hover:border-gold transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={40} className="text-gold/20 mb-4" />
                  <p className="font-playfair text-lg text-warm-beige/60 mb-2">Your cart is empty</p>
                  <p className="font-inter text-sm text-soft-taupe/50">Add some products to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border border-gold/10 bg-luxury-black/40"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg bg-soft-black border border-gold/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover" />
                      ) : (
                        <ShoppingBag size={18} className="text-gold/30" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-sm text-warm-beige font-medium truncate">{item.name}</p>
                      <p className="font-playfair text-base text-gold mt-0.5">${item.price}</p>
                      {/* Qty */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold hover:border-gold transition-all"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-inter text-sm text-warm-beige w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold hover:border-gold transition-all"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-soft-taupe/40 hover:text-red-400 transition-colors self-start"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gold/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-soft-taupe">Subtotal</span>
                  <span className="font-playfair text-xl text-gold">${total.toFixed(2)}</span>
                </div>
                <p className="font-inter text-xs text-soft-taupe/50">Taxes and shipping calculated at checkout</p>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-gold rounded-sm w-full flex items-center justify-center gap-3 group disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                  {!loading && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full font-inter text-xs text-soft-taupe/50 hover:text-soft-taupe transition-colors text-center py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
