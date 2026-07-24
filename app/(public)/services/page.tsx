"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceModal from "@/components/services/ServiceModal";
import FinancingCallout from "@/components/ui/FinancingCallout";

const fallbackServices = [
  { _id: "1", title: "Injectables & Wrinkle Relaxers", category: "Injectables & Wrinkle Relaxers", shortDescription: "Smooth fine lines and dynamic wrinkles with precise, natural-looking results. FDA-approved treatments tailored to your facial anatomy.", description: "Botox, Dysport, and Nuceiva — neuromodulators that temporarily relax overactive facial muscles causing expression lines. Our approach prioritizes natural-looking results that maintain your expressive character while eliminating unwanted wrinkles. Treatment areas include forehead lines, crow's feet, frown lines (11s), and more.", benefits: ["Natural, refreshed appearance", "No downtime required", "Results last 3-4 months", "Preventative anti-aging benefits", "Customized to your facial anatomy"], duration: "15-30 min", price: "From $11–$14/unit", order: 1, isFeatured: true, isActive: true, image: "", slug: "injectables-wrinkle-relaxers", detailPage: "/services/injectables-wrinkle-relaxers" },
  { _id: "2", title: "Dermal Fillers & Skin Boosters", category: "Dermal Fillers & Skin Boosters", shortDescription: "Restore volume, enhance contours, and rejuvenate your appearance with premium hyaluronic acid fillers.", description: "Dermal fillers use hyaluronic acid to restore lost volume, enhance facial contours, and smooth deep folds. We offer dermal fillers for cheeks, jawline, and chin, lip filler for natural enhancement, and skin booster injections like Profhilo and Juvéderm SkinVive for deep hydration and glow.", benefits: ["Immediate, visible results", "Natural-feeling and looking", "Reversible with hyaluronidase", "Long-lasting results", "Minimal downtime"], duration: "30-60 min", price: "From $450–$1,200", order: 2, isFeatured: true, isActive: true, image: "", slug: "dermal-fillers-skin-boosters", detailPage: "/services/dermal-fillers-skin-boosters" },
  { _id: "3", title: "Facials & Skin Health", category: "Facials & Skin Health", shortDescription: "Medical-grade facial treatments precisely tailored to your unique skin type and concerns.", description: "Our customized facials go beyond standard spa treatments. Featuring our Purifying Deep Clean Facial with LED light therapy, Signature Relaxation Facial with face and neck massage, and Chemical Peels for resurfacing. Using medical-grade products and techniques to address your specific skin concerns.", benefits: ["Personalized to your skin needs", "Medical-grade ingredients", "Immediate visible improvement", "Addresses specific concerns", "Relaxing and rejuvenating"], duration: "30-60 min", price: "From $145–$160", order: 3, isFeatured: false, isActive: true, image: "", slug: "facials-skin-health", detailPage: "/services/facials-skin-health" },
  { _id: "4", title: "Microneedling & Skin Resurfacing", category: "Microneedling & Skin Resurfacing", shortDescription: "Revitalize your skin with advanced collagen-induction therapy for improved texture and tone.", description: "Microneedling creates controlled micro-injuries to stimulate your skin's natural healing process, boosting collagen and elastin production. Combined with IPL Photofacial to target sun damage, redness, and uneven pigmentation. Effectively addresses acne scars, fine lines, enlarged pores, and uneven texture.", benefits: ["Reduces acne scars and wrinkles", "Improves skin texture and tone", "Stimulates natural collagen", "Minimal downtime", "Safe for all skin types"], duration: "30-60 min", price: "From $250", order: 4, isFeatured: true, isActive: true, image: "", slug: "microneedling-skin-resurfacing", detailPage: "/services/microneedling-skin-resurfacing" },
  { _id: "5", title: "Laser Hair Removal", category: "Laser Hair Removal", shortDescription: "Achieve smooth, hair-free skin permanently with advanced laser technology.", description: "Our advanced laser hair removal technology targets hair follicles with precision, permanently reducing unwanted hair on any area of the body. Available in small areas (lip, chin, underarms), large areas (full legs, arms, back, Brazilian), and full body packages. Safe and effective for all skin types.", benefits: ["Permanent hair reduction", "Safe for all skin types", "Fast treatment sessions", "Smooth, silky results", "Cost-effective long-term"], duration: "15-90 min", price: "From $60–$550", order: 5, isFeatured: false, isActive: true, image: "", slug: "laser-hair-removal", detailPage: "/services/laser-hair-removal" },
  { _id: "6", title: "Body Sculpting & Contouring", category: "Body Sculpting & Contouring", shortDescription: "Build muscle and tone targeted areas with advanced HIFEM technology — no surgery, no downtime.", description: "HIFEM (High-Intensity Focused Electromagnetic) technology induces powerful muscle contractions that build muscle mass, burn fat, and tone your target areas. Non-invasive body sculpting that targets stubborn areas resistant to diet and exercise without surgery or downtime.", benefits: ["Builds and tones muscle mass", "Reduces fat in treated areas", "No surgery or invasive procedures", "Zero downtime required", "Comfortable treatment experience", "Visible results after 2-4 sessions"], duration: "30 min", price: "From $300/session", order: 6, isFeatured: false, isActive: true, image: "", slug: "body-sculpting-contouring", detailPage: "/services/body-sculpting-contouring" },
];

const categories = ["All", "Injectables & Wrinkle Relaxers", "Dermal Fillers & Skin Boosters", "Facials & Skin Health", "Microneedling & Skin Resurfacing", "Laser Hair Removal", "Body Sculpting & Contouring"];

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [selectedService, setSelectedService] = useState<typeof fallbackServices[0] | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (data?.services?.length) setServices(data.services); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="services-hero relative min-h-0 overflow-hidden lg:min-h-[min(94vh,880px)]">
        <div className="services-hero-inner relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <ScrollReveal direction="right" className="services-hero-copy max-w-xl lg:max-w-[480px]">
            <p className="services-hero-eyebrow font-inter text-[10px] font-medium uppercase tracking-[0.32em] text-gold/85 sm:text-[11px]">
              Luxury Treatments
            </p>
            <h1 className="services-hero-title mt-3 font-playfair text-gold">Our Services</h1>
            <p className="services-hero-desc mt-4 max-w-[22rem] font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              Expert injectables, advanced skin treatments, facials, laser services, and body sculpting
              — tailored with precision, safety, and genuine care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section id="services-grid" className="section-pad section-warm">
        <div className="container-luxury">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <ScrollReveal key={service._id} delay={i * 0.07}>
                <ServiceCard
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              </ScrollReveal>
            ))}
          </div>

          <FinancingCallout className="mt-14" />

          {/* Book CTA */}
          <ScrollReveal delay={0.2} className="text-center mt-14">
            <p className="font-cormorant text-xl italic text-soft-taupe mb-5">
              Not sure which treatment is right for you?
            </p>
            <Link href="/booking" className="btn-gold rounded-sm inline-flex items-center gap-3 group">
              Book a Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </>
  );
}
