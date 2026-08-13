"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Dermal Fillers",
    slug: "dermal-fillers",
    description: "Restore volume and contour cheeks, jawline and chin.",
    price: "From $700–$1,200 / syringe",
    image: "/images/treatments/dermal-fillers.jpg",
  },
  {
    name: "Lip Filler",
    slug: "lip-filler",
    popular: true,
    description: "Hydrate, define and gently enhance the lips.",
    price: "From $650–$900 / syringe",
    image: "/images/treatments/lip-filler.jpg",
  },
  {
    name: "Skin Booster Injections",
    slug: "skin-boosters",
    description: "Profhilo & Juvéderm SkinVive for deep hydration and glow.",
    price: "From $450–$650 / session",
    image: "/images/treatments/skin-boosters.jpg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="dermal-fillers-skin-boosters"
        fallback={{
          title: "Dermal Fillers & Skin Boosters",
          content:
            "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid categorySlug="dermal-fillers-skin-boosters" fallback={fallback} />
        </div>
      </section>
    </div>
  );
}
