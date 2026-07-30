import mongoose, { Schema, Document } from "mongoose";

export const UPLOAD_FOLDERS = ["pages", "products", "gallery", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export interface IStoredUpload extends Document {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: {
      type: String,
      enum: UPLOAD_FOLDERS,
      required: true,
      index: true,
    },
    filename: { type: String, required: true, index: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    // Binary image bytes — lives in MongoDB (works on Vercel; no local disk)
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export default mongoose.models.StoredUpload ||
  mongoose.model<IStoredUpload>("StoredUpload", StoredUploadSchema);
