import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/shop/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
