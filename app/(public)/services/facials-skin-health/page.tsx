"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Purifying Deep Clean Facial",
    slug: "purifying-facial",
    popular: true,
    description: "Deep cleanse with custom LED light therapy for radiant skin.",
    price: "From $145",
    image: "/images/treatments/hydrafacial-main.png",
  },
  {
    name: "Signature Relaxation Facial",
    slug: "relaxation-facial",
    description: "Expert skincare meets a soothing face and neck massage.",
    price: "From $160",
    image: "/images/treatments/led-therapy-facial.png",
  },
  {
    name: "Chemical Peel",
    slug: "chemical-peel",
    description: "Resurface for brighter, clearer, more even-toned skin.",
    price: "From $150",
    image: "/images/treatments/chemical-peel.jpg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="facials-skin-health"
        fallback={{
          title: "Facials & Skin Health",
          content:
            "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid categorySlug="facials-skin-health" fallback={fallback} />
        </div>
      </section>
    </div>
  );
}
