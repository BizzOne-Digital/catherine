"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  stockStatus: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    if (product.stockStatus === "out_of_stock") {
      toast.error("This product is currently out of stock.");
      return;
    }
    addItem({
      id: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  const displayPrice = product.salePrice || product.price;
  const isOnSale = !!product.salePrice && product.salePrice < product.price;
  const isOutOfStock = product.stockStatus === "out_of_stock";

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden border border-gold/20 surface-card hover:border-gold/35 transition-all duration-500 flex flex-col"
      whileHover={{ y: -4 }}
    >
      {/* Image area */}
      <div className="relative aspect-square bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4] flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag size={24} className="text-gold/50" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="font-inter text-[9px] tracking-[1px] uppercase bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          {isOnSale && (
            <span className="font-inter text-[9px] uppercase bg-red-900/80 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full">
              Sale
            </span>
          )}
          {isOutOfStock && (
            <span className="font-inter text-[9px] uppercase bg-gray-900/80 text-gray-400 border border-gray-600/30 px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Add to cart hover overlay — desktop only */}
        <motion.div
          className="absolute inset-0 hidden items-center justify-center bg-luxury-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex"
        >
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className="w-12 h-12 rounded-full bg-gold text-luxury-black flex items-center justify-center hover:bg-deep-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
          >
            <Plus size={18} />
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair text-base text-text-dark mb-1.5 group-hover:text-gold transition-colors duration-300 leading-snug">
          {product.name}
        </h3>
        <p className="font-inter text-xs text-soft-taupe leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-playfair text-lg text-gold">${displayPrice}</span>
            {isOnSale && (
              <span className="font-inter text-xs text-soft-taupe/50 line-through">${product.price}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className="btn-gold py-1.5 px-3 text-[10px] rounded-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={11} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
