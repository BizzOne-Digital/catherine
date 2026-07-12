import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  ingredients?: string;
  howToUse?: string;
  price: number;
  salePrice?: number;
  image: string;
  galleryImages: string[];
  stockStatus: "in_stock" | "out_of_stock" | "limited";
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    ingredients: { type: String },
    howToUse: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: { type: String, default: "/images/placeholder-product.jpg" },
    galleryImages: [{ type: String }],
    stockStatus: { type: String, enum: ["in_stock", "out_of_stock", "limited"], default: "in_stock" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
