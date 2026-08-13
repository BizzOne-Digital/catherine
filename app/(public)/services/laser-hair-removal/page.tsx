"use client";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";

const fallback = [
  {
    name: "Small Area Laser Hair Removal (Chin OR Upper Lip)",
    slug: "small-area",
    description: "Targeted laser hair reduction for unwanted facial hair.",
    price: "$55",
    image: "/images/treatments/laser-face.jpg",
  },
  {
    name: "Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
    slug: "medium-area",
    description: "Effective laser hair reduction for medium-sized areas.",
    price: "$88",
    image: "/images/treatments/laser-legs.jpg",
  },
  {
    name: "Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
    slug: "large-area",
    description: "Advanced laser hair reduction for larger treatment areas.",
    price: "$150",
    image: "/images/treatments/laser-legs.jpg",
  },
  {
    name: "Full Body Laser Hair Removal",
    slug: "full-body",
    popular: true,
    description: "Comprehensive laser hair reduction for multiple treatment areas.",
    price: "$325",
    image: "/images/treatments/laser-full-body.jpg",
  },
  {
    name: "Package of 6: Small Area Laser Hair Removal (Chin OR Upper Lip)",
    slug: "small-area-package-6",
    description: "Six sessions for chin OR upper lip — save with a package.",
    price: "$350",
    image: "/images/treatments/laser-face.jpg",
  },
  {
    name: "Package of 6: Medium Area Laser Hair Removal (Underarms, Full Arms, Half Legs, Abdomen, OR Bikini)",
    slug: "medium-area-package-6",
    description: "Six sessions for one medium area of your choice.",
    price: "$479",
    image: "/images/treatments/laser-legs.jpg",
  },
  {
    name: "Package of 6: Large Area Laser Hair Removal (Full Legs, Back, Chest, OR Brazilian)",
    slug: "large-area-package-6",
    description: "Six sessions for one large area of your choice.",
    price: "$599",
    image: "/images/treatments/laser-legs.jpg",
  },
  {
    name: "Package of 6: Full Body Laser Hair Removal",
    slug: "full-body-package-6",
    description: "Six full-body sessions for comprehensive, long-term results.",
    price: "$1200",
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
