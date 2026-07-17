import { Metadata } from "next";
import IntroWrapper from "@/components/ui/IntroWrapper";
import HeroSection from "@/components/home/HeroSection";
import WhyLumina from "@/components/home/WhyLumina";
import TrustReviews from "@/components/home/TrustReviews";
import FeaturedTreatments from "@/components/home/FeaturedTreatments";
import AboutPreview from "@/components/home/AboutPreview";
import SkinAnalysis from "@/components/home/SkinAnalysis";
import GalleryPreview from "@/components/home/GalleryPreview";
import ProductPreview from "@/components/home/ProductPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FinancingCallout from "@/components/ui/FinancingCallout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/shop/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

export const metadata: Metadata = {
  title: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  description:
    "Reveal your best skin with personalized medical aesthetics for natural, beautiful results at Lumina Medi Spa in Mississauga.",
};

export default function HomePage() {
  return (
    <CartProvider>
      <IntroWrapper />
      <div id="site-content">
        <Navbar />
        <main>
          <HeroSection />
          <WhyLumina />
          <FeaturedTreatments />
          <TrustReviews />
          <AboutPreview />
          <SkinAnalysis />
          <GalleryPreview />
          <ProductPreview />
          <section className="section-pad-sm section-warm">
            <div className="container-luxury">
              <FinancingCallout />
            </div>
          </section>
          <FinalCTA />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
