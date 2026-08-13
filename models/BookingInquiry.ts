import mongoose, { Schema, Document } from "mongoose";

export interface IBookingInquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  treatmentInterest: string;
  preferredDate?: string;
  preferredTime?: string;
  clientType: "new" | "returning";
  message?: string;
  marketingConsent?: boolean;
  status: "new" | "contacted" | "booked" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const BookingInquirySchema = new Schema<IBookingInquiry>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    treatmentInterest: { type: String, required: true },
    preferredDate: { type: String },
    preferredTime: { type: String },
    clientType: { type: String, enum: ["new", "returning"], default: "new" },
    message: { type: String },
    marketingConsent: { type: Boolean, default: false },
    status: { type: String, enum: ["new", "contacted", "booked", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.BookingInquiry || mongoose.model<IBookingInquiry>("BookingInquiry", BookingInquirySchema);
