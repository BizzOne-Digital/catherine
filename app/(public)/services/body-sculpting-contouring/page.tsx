"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Body Sculpting with HIFEM",
    slug: "body-sculpting-hifem",
    popular: true,
    description: "Build muscle and tone a target area — no downtime.",
    price: "From $300 / session",
    image: "/images/treatments/emsculpt.jpg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="body-sculpting-contouring"
        fallback={{
          title: "Body Sculpting & Contouring",
          content:
            "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid categorySlug="body-sculpting-contouring" fallback={fallback} />
        </div>
      </section>
    </div>
  );
}
