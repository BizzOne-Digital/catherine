"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Microneedling",
    slug: "microneedling",
    popular: true,
    description: "Collagen-stimulating treatment for texture, pores and scars.",
    price: "From $250",
    image: "/images/treatments/microneedling-main.png",
  },
  {
    name: "IPL Photofacial",
    slug: "ipl-photofacial",
    description:
      "Advanced light-based treatments designed to improve sun damage, pigmentation, redness, acne, and overall skin clarity.",
    price: "From $250",
    image: "/images/treatments/led-therapy-facial.png",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <CmsCategoryHero
        categorySlug="microneedling-skin-resurfacing"
        fallback={{
          title: "Microneedling & Skin Resurfacing",
          content:
            "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
        }}
      />
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <CategoryTreatmentsGrid categorySlug="microneedling-skin-resurfacing" fallback={fallback} />
        </div>
      </section>
    </div>
  );
}
