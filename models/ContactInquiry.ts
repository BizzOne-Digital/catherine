import mongoose, { Schema, Document } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  interestedService?: string;
  location?: string;
  message: string;
  source?: string;
  marketingConsent?: boolean;
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
    location: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: "contact" },
    marketingConsent: { type: Boolean, default: false },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInquiry || mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);
