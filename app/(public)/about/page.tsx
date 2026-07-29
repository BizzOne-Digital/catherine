import { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Lumina Medi Spa",
  description:
    "Meet the team at Lumina Medi Spa — Registered Nurse Catherine and Medical Aesthetician Wendy, delivering evidence-based, personalized aesthetic care in Mississauga.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
