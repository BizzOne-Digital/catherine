"use client";
import Image from "next/image";
import CategoryTreatmentsGrid from "@/components/services/CategoryTreatmentsGrid";
import CmsCategoryHero from "@/components/cms/CmsCategoryHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
          <CategoryTreatmentsGrid 
            categorySlug="body-sculpting-contouring" 
            fallback={fallback}
            listLayout={true}
          />
        </div>
      </section>

      <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
        <div className="container-luxury mx-auto max-w-md">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-playfair text-3xl font-bold text-text-dark">
              Before &amp; After
            </h2>
            <div className="relative mx-auto aspect-square overflow-hidden rounded-2xl shadow-card">
              <Image
                src="/images/treatments/HIFEM-muscle-toning-before-and-after.png"
                alt="HIFEM Muscle Toning before and after results"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 448px"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
