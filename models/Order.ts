import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder extends Document {
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: IOrderItem[];
  subtotal: number;
  tax?: number;
  total: number;
  stripeSessionId?: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "new" | "processing" | "completed" | "cancelled";
  emailSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    shippingAddress: { type: String },
    billingAddress: { type: String },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    stripeSessionId: { type: String, unique: true, sparse: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["new", "processing", "completed", "cancelled"], default: "new" },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
