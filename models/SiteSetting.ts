import mongoose, { Schema, Document } from "mongoose";
import {
  DEFAULT_HOURS_MON_FRI,
  DEFAULT_HOURS_SAT,
  DEFAULT_HOURS_SUN,
} from "@/lib/businessHours";

export interface ISiteSetting extends Document {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  hoursMonFri: string;
  hoursSat: string;
  hoursSun: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
  metaTitle: string;
  metaDescription: string;
  /** Lead popup */
  leadOfferTitle: string;
  leadOfferSubtitle: string;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    businessName: { type: String, default: "Lumina Medi Spa" },
    tagline: {
      type: String,
      default: "Medical Aesthetics Designed Around You",
    },
    phone: { type: String, default: "(437) 888-9022" },
    email: { type: String, default: "Luminamedispa@gmail.com" },
    address: {
      type: String,
      default: "42 Village Centre Place, Unit 100, Mississauga, ON L4Z 1V9",
    },
    instagramUrl: { type: String, default: "https://instagram.com/luminamedispa" },
    facebookUrl: { type: String, default: "" },
    googleMapsUrl: { type: String, default: "" },
    hoursMonFri: { type: String, default: DEFAULT_HOURS_MON_FRI },
    hoursSat: { type: String, default: DEFAULT_HOURS_SAT },
    hoursSun: { type: String, default: DEFAULT_HOURS_SUN },
    announcementBarText: {
      type: String,
      default: "✦ Complimentary Skin Consultation — Book Today ✦",
    },
    announcementBarEnabled: { type: Boolean, default: true },
    metaTitle: {
      type: String,
      default: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
    },
    metaDescription: {
      type: String,
      default:
        "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
    },
    leadOfferTitle: { type: String, default: "Free Consultation" },
  leadOfferSubtitle: {
    type: String,
    default: "20% Off on Your First Treatment",
  },
  googleAppointmentUrl: { type: String, default: "" },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);
