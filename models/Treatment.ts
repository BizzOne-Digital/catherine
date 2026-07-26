import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPageSection {
  id: string;
  type: "hero" | "about" | "benefits" | "ideal_for" | "recovery" | "custom";
  title: string;
  content: string;
  image: string;
  items: string[];
  order: number;
}

export interface ITreatment extends Document {
  name: string;
  slug: string;
  categoryId: Types.ObjectId;
  categorySlug: string;
  shortDescription: string;
  price: string;
  image: string;
  popular: boolean;
  isActive: boolean;
  order: number;
  sections: IPageSection[];
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["hero", "about", "benefits", "ideal_for", "recovery", "custom"],
      default: "custom",
    },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    items: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const TreatmentSchema = new Schema<ITreatment>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true },
    categorySlug: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    price: { type: String, required: true },
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true }
);

TreatmentSchema.index({ categoryId: 1, slug: 1 }, { unique: true });

if (mongoose.models.Treatment) {
  delete mongoose.models.Treatment;
}

export default mongoose.model<ITreatment>("Treatment", TreatmentSchema);
