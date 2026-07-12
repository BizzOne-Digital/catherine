import mongoose, { Schema, Document } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  interestedService?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    interestedService: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInquiry || mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);
