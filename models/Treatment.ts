import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Treatment || mongoose.model("Treatment", TreatmentSchema);
