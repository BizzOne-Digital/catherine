"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/components/shop/CartProvider";
import CartDrawer from "@/components/shop/CartDrawer";

export default function ShopProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
