import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "/images/placeholder-blog.jpg" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
