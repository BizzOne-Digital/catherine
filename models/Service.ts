import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  duration?: string;
  price?: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    duration: { type: String },
    price: { type: String },
    image: { type: String, default: "/images/placeholder-service.jpg" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
