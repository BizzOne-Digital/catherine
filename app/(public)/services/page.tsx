"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Droplets,
  Zap,
  Activity,
  ScanFace,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FinancingCallout from "@/components/ui/FinancingCallout";
import CmsPageHero from "@/components/cms/CmsPageHero";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Heart,
  Droplets,
  Zap,
  Activity,
  ScanFace,
  Flower2,
};

type Category = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  treatmentCount: number;
  detailPage: string;
};

const fallbackCategories: Category[] = [
  {
    _id: "1",
    title: "Injectables & Wrinkle Relaxers",
    slug: "injectables-wrinkle-relaxers",
    description:
      "Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.",
    icon: "Sparkles",
    treatmentCount: 2,
    detailPage: "/services/injectables-wrinkle-relaxers",
  },
  {
    _id: "2",
    title: "Dermal Fillers & Skin Boosters",
    slug: "dermal-fillers-skin-boosters",
    description:
      "Restore volume, contour features and hydrate from within with premium hyaluronic acid injectables.",
    icon: "Heart",
    treatmentCount: 3,
    detailPage: "/services/dermal-fillers-skin-boosters",
  },
  {
    _id: "3",
    title: "Facials & Skin Health",
    slug: "facials-skin-health",
    description:
      "Medical-grade facials that cleanse, resurface and calm — tailored to your skin on the day.",
    icon: "Droplets",
    treatmentCount: 3,
    detailPage: "/services/facials-skin-health",
  },
  {
    _id: "4",
    title: "Microneedling & Skin Resurfacing",
    slug: "microneedling-skin-resurfacing",
    description: "Stimulate collagen and even tone to refine texture, scarring and pigmentation.",
    icon: "Activity",
    treatmentCount: 2,
    detailPage: "/services/microneedling-skin-resurfacing",
  },
  {
    _id: "5",
    title: "Laser Hair Removal",
    slug: "laser-hair-removal",
    description:
      "Comfortable, long-term hair reduction with a medical-grade diode laser for all skin types.",
    icon: "Zap",
    treatmentCount: 3,
    detailPage: "/services/laser-hair-removal",
  },
  {
    _id: "6",
    title: "Body Sculpting & Contouring",
    slug: "body-sculpting-contouring",
    description:
      "Build muscle and refine problem areas with non-invasive HIFEM technology — zero downtime.",
    icon: "Activity",
    treatmentCount: 1,
    detailPage: "/services/body-sculpting-contouring",
  },
];

export default function ServicesPage() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (data?.categories?.length) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <CmsPageHero
        slug="services"
        fallback={{
          eyebrow: "Luxury Treatments",
          title: "Our Services",
          content:
            "Expert injectables, advanced skin treatments, facials, laser services, and body sculpting — tailored with precision, safety, and genuine care.",
        }}
      />

      <section id="services-grid" className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, i) => {
              const Icon = iconMap[category.icon] || Sparkles;
              return (
                <ScrollReveal key={category._id || category.slug} delay={i * 0.07}>
                  <Link href={category.detailPage || `/services/${category.slug}`}>
                    <div className="group relative flex flex-col h-full min-h-[16rem] p-6 rounded-xl border border-gold/20 bg-ivory/95 transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm hover:-translate-y-1 cursor-pointer">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                        <Icon size={22} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <div className="absolute top-6 right-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-white">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                      <h3 className="font-playfair text-xl text-text-dark mb-3 group-hover:text-gold transition-colors duration-300 font-bold pr-10">
                        {category.title}
                      </h3>
                      <p className="font-inter text-sm text-soft-taupe leading-relaxed mb-5 flex-1 font-medium">
                        {category.description}
                      </p>
                      <div className="pt-4 border-t border-gold/10">
                        <p className="font-inter text-xs uppercase tracking-wider text-gold/70 font-semibold">
                          {category.treatmentCount}{" "}
                          {category.treatmentCount === 1 ? "Treatment" : "Treatments"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <FinancingCallout className="mt-14" />

          <ScrollReveal delay={0.2} className="text-center mt-14">
            <p className="font-cormorant text-xl italic text-soft-taupe mb-5 font-medium">
              Not sure which treatment is right for you?
            </p>
            <Link href="/booking" className="btn-gold rounded-sm inline-flex items-center gap-3 group">
              Book a Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
