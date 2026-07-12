import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  image: string;
  description?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
