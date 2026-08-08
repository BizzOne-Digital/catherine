"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartStockStatus = "in_stock" | "out_of_stock" | "limited";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  slug: string;
  quantity: number;
  stockStatus: CartStockStatus;
};

type AddItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: AddItemInput) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "lumina_shop_cart";
const MAX_QTY = 20;

const CartContext = createContext<CartContextValue | null>(null);

function unitPrice(item: Pick<CartItem, "price" | "salePrice">) {
  return item.salePrice ?? item.price;
}

function clampQty(n: number) {
  return Math.max(1, Math.min(MAX_QTY, Math.floor(n) || 1));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter((i) => i?.productId && i.quantity > 0)
              .map((i) => ({ ...i, quantity: clampQty(i.quantity) }))
          );
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((item: AddItemInput) => {
    if (item.stockStatus === "out_of_stock") return;
    const qty = clampQty(item.quantity ?? 1);
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: clampQty(i.quantity + qty) }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: item.productId,
          name: item.name,
          price: item.price,
          salePrice: item.salePrice,
          image: item.image,
          slug: item.slug,
          stockStatus: item.stockStatus,
          quantity: qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: clampQty(quantity) } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + unitPrice(i) * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      hydrated,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      hydrated,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export function formatCartPrice(n: number) {
  return n % 1 === 0 ? `CA$${n.toFixed(0)}` : `CA$${n.toFixed(2)}`;
}

export { unitPrice as cartUnitPrice };
