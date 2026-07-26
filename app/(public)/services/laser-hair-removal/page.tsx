"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Laser Hair Removal — Small Area",
    slug: "small-area",
    description: "Lip, chin, underarms and other small areas.",
    price: "From $60–$130 / session",
    image: "/images/treatments/laser-face.jpg",
  },
  {
    name: "Laser Hair Removal — Large Area",
    slug: "large-area",
    popular: true,
    description: "Full legs, full arms, back or Brazilian.",
    price: "From $230–$330 / session",
    image: "/images/treatments/laser-legs.jpg",
  },
  {
    name: "Full Body Laser Hair Removal",
    slug: "full-body",
    description: "All major body areas in one session (excludes back).",
    price: "From $550 / session",
    image: "/images/treatments/laser-full-body.jpg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="laser-hair-removal"
        fallback={{
          title: "Laser Hair Removal",
          content:
            "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid categorySlug="laser-hair-removal" fallback={fallback} />
        </div>
      </section>
    </div>
  );
}
