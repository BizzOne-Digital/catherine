import { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Lumina Medi Spa",
  description:
    "About Lumina Medi Spa — evidence-based, personalized medical aesthetics with natural results. Meet our trained healthcare and aesthetic professionals in Mississauga.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
