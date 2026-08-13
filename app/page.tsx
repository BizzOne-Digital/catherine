import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustReviews from "@/components/home/TrustReviews";
import HomeGallery from "@/components/home/HomeGallery";
import FeaturedTreatments from "@/components/home/FeaturedTreatments";
import AboutPreview from "@/components/home/AboutPreview";
import SignatureCare from "@/components/home/SignatureCare";
import ProductPreview from "@/components/home/ProductPreview";
import FinalCTA from "@/components/home/FinalCTA";
import ClinicMap from "@/components/ui/ClinicMap";
import FinancingCallout from "@/components/ui/FinancingCallout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  description:
    "Expert injectables, advanced skin treatments, laser services, and body sculpting at Lumina Medi Spa in Mississauga.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedTreatments />
        <TrustReviews />
        <HomeGallery />
        <AboutPreview />
        <SignatureCare />
        <ProductPreview />
        <section className="section-pad-sm section-warm">
          <div className="container-luxury">
            <FinancingCallout />
          </div>
        </section>
        <ClinicMap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
