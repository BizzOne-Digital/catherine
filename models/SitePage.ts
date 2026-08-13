import mongoose, { Schema, Document } from "mongoose";

export type SiteSectionType =
  | "hero"
  | "text"
  | "image_text"
  | "cards"
  | "cta"
  | "custom";

export interface ISiteSection {
  id: string;
  key: string;
  type: SiteSectionType;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
}

export interface ISitePage extends Document {
  slug: string;
  title: string;
  path: string;
  sections: ISiteSection[];
  createdAt: Date;
  updatedAt: Date;
}

const SiteSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    key: { type: String, required: true },
    type: {
      type: String,
      enum: ["hero", "text", "image_text", "cards", "cta", "custom"],
      default: "custom",
    },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    items: [{ type: String }],
    ctaLabel: { type: String, default: "" },
    ctaHref: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const SitePageSchema = new Schema<ISitePage>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    path: { type: String, required: true },
    sections: { type: [SiteSectionSchema], default: [] },
  },
  { timestamps: true }
);

if (mongoose.models.SitePage) {
  delete mongoose.models.SitePage;
}

export default mongoose.model<ISitePage>("SitePage", SitePageSchema);
