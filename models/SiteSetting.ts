import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSetting extends Document {
  businessName: string;
  logoUrl?: string;
  phone: string;
  email: string;
  instagram?: string;
  address?: string;
  bookingUrl?: string;
  announcementText?: string;
  heroTitle: string;
  heroSubtitle: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    businessName: { type: String, default: "Lumina Medi Spa" },
    logoUrl: { type: String },
    phone: { type: String, default: "(647) 929-9450" },
    email: { type: String, default: "catherinezhang01@outlook.com" },
    instagram: { type: String, default: "luminamedispa" },
    address: { type: String, default: "42 Village Centre Place, Mississauga, Ontario" },
    bookingUrl: { type: String, default: "https://www.fresha.com/book-now" },
    announcementText: { type: String, default: "✦ Complimentary Skin Analysis with Every First Visit ✦ Book Your Consultation Today" },
    heroTitle: { type: String, default: "Medical Aesthetics Designed Around You" },
    heroSubtitle: { type: String, default: "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care." },
    seoTitle: { type: String, default: "Lumina Medi Spa | Medical Aesthetics in Mississauga" },
    seoDescription: { type: String, default: "Lumina Medi Spa offers expert injectables, facials, laser treatments, and body sculpting in Mississauga, Ontario. Personalized medical aesthetic care." },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);
