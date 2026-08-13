"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Botox",
    slug: "botox",
    popular: true,
    description: "Smooth dynamic lines on the forehead, frown and crow's feet.",
    price: "From $11–$14 / unit",
    image: "/images/treatments/botox.jpg",
  },
  {
    name: "Dysport & Nuceiva",
    slug: "dysport-nuceiva",
    popular: false,
    description: "Alternative neuromodulators for fast-acting, natural smoothing.",
    price: "From $11–$14 / unit",
    image: "/images/treatments/dysport.jpg",
  },
];

export default function InjectablesPage() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="injectables-wrinkle-relaxers"
        fallback={{
          title: "Injectables & Wrinkle Relaxers",
          content:
            "Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid
            categorySlug="injectables-wrinkle-relaxers"
            fallback={fallback}
          />
        </div>
      </section>
    </div>
  );
}
