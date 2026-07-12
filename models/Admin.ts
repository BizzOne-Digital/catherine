import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
