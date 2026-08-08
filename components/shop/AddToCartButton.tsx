"use client";

import { useState, type MouseEvent } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import {
  type CartStockStatus,
  useCart,
} from "@/components/shop/CartProvider";

export type ProductCartInput = {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  slug: string;
  stockStatus?: CartStockStatus;
};

type Props = {
  product: ProductCartInput;
  quantity?: number;
  mode?: "add" | "buyNow";
  className?: string;
  label?: string;
  stopPropagation?: boolean;
};

export default function AddToCartButton({
  product,
  quantity = 1,
  mode = "add",
  className = "",
  label,
  stopPropagation = false,
}: Props) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);
  const outOfStock = product.stockStatus === "out_of_stock";

  const handleClick = async (e: MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (outOfStock || loading) return;

    const payload = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      slug: product.slug,
      stockStatus: product.stockStatus || ("in_stock" as const),
      quantity,
    };

    if (mode === "add") {
      addItem(payload);
      toast.success("Added to cart");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ productId: product.productId, quantity }],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      toast.error(message);
      setLoading(false);
    }
  };

  const defaultLabel =
    mode === "buyNow"
      ? outOfStock
        ? "Out of Stock"
        : "Buy Now"
      : outOfStock
        ? "Out of Stock"
        : "Add to Cart";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock || loading}
      className={`${className} inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : mode === "add" ? (
        <ShoppingBag size={15} />
      ) : null}
      {label || defaultLabel}
    </button>
  );
}
