import mongoose, { Schema, Document } from "mongoose";

export interface IPricing extends Document {
  treatmentName: string;
  category: string;
  price: string;
  duration?: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PricingSchema = new Schema<IPricing>(
  {
    treatmentName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, default: "Consultation Required" },
    duration: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Pricing || mongoose.model<IPricing>("Pricing", PricingSchema);
