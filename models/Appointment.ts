import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  categorySlug: string;
  treatmentSlug: string;
  customerName: string;
  email: string;
  phone: string;
  startLocal: string;
  endLocal: string;
  depositAmount: number;
  stripeSessionId?: string;
  googleEventId?: string;
  googleEventLink?: string;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "confirmed" | "cancelled";
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    categorySlug: { type: String, required: true },
    treatmentSlug: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    startLocal: { type: String, required: true },
    endLocal: { type: String, required: true },
    depositAmount: { type: Number, default: 30 },
    stripeSessionId: { type: String, unique: true, sparse: true },
    googleEventId: { type: String },
    googleEventLink: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
