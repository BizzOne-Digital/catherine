import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustReviews from "@/components/home/TrustReviews";
import FeaturedTreatments from "@/components/home/FeaturedTreatments";
import AboutPreview from "@/components/home/AboutPreview";
import SignatureCare from "@/components/home/SignatureCare";
import GalleryPreview from "@/components/home/GalleryPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FinancingCallout from "@/components/ui/FinancingCallout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  description:
    "Reveal your best skin with personalized medical aesthetics for natural, beautiful results at Lumina Medi Spa in Mississauga.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedTreatments />
        <TrustReviews />
        <AboutPreview />
        <SignatureCare />
        <GalleryPreview />
        <section className="section-pad-sm section-warm">
          <div className="container-luxury">
            <FinancingCallout />
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
