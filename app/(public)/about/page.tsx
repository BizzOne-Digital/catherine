import { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Lumina Medi Spa",
  description:
    "Meet the team behind Lumina Medi Spa — expert medical aesthetic specialists dedicated to natural, personalized results.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
