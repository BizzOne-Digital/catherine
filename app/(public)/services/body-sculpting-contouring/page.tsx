"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Muscle Toning with HIFEM (Single Area)",
    slug: "body-sculpting-hifem",
    popular: true,
    description: "Non-invasive muscle toning for one target area — abdomen, glutes, or arms.",
    price: "$149",
    image: "/images/treatments/emsculpt.jpg",
  },
  {
    name: "Package of 4: Muscle Toning with HIFEM (Single Area)",
    slug: "hifem-single-area-package-4",
    description: "Four single-area sessions with package savings.",
    price: "$449",
    image: "/images/treatments/emsculpt.jpg",
  },
  {
    name: "Muscle Toning with HIFEM (Two Areas)",
    slug: "hifem-two-areas",
    description: "Tone and strengthen two target areas in one session.",
    price: "$199",
    image: "/images/treatments/emsculpt.jpg",
  },
  {
    name: "Package of 4: Muscle Toning with HIFEM (Two Areas)",
    slug: "hifem-two-areas-package-4",
    description: "Four two-area sessions with package savings.",
    price: "$599",
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
