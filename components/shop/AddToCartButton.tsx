"use client";

import { useRouter } from "next/navigation";
import { type MouseEvent } from "react";
import { ShoppingBag } from "lucide-react";
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
  const router = useRouter();
  const { addItem } = useCart();
  const outOfStock = product.stockStatus === "out_of_stock";

  const handleClick = (e: MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (outOfStock) return;

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

    addItem(payload, { openDrawer: false });
    toast.success("Ready for checkout");
    router.push("/shop/checkout");
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
      disabled={outOfStock}
      className={`${className} inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {mode === "add" ? <ShoppingBag size={15} /> : null}
      {label || defaultLabel}
    </button>
  );
}
