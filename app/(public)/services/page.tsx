"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceModal from "@/components/services/ServiceModal";

const fallbackServices = [
  { _id: "1", title: "Botox & Neuromodulators", category: "Injectables", shortDescription: "Smooth fine lines and dynamic wrinkles with precise, natural-looking results. FDA-approved treatments tailored to your facial anatomy.", description: "Botox (Botulinum Toxin) works by temporarily relaxing overactive facial muscles that cause expression lines. Our approach prioritizes natural-looking results that maintain your expressive character while eliminating unwanted wrinkles. Treatment areas include forehead lines, crow's feet, frown lines (11s), bunny lines, lip flip, and more.", benefits: ["Natural, refreshed appearance", "No downtime required", "Results last 3-4 months", "Preventative anti-aging benefits", "Customized to your facial anatomy"], duration: "30-45 min", price: "From $10/unit", order: 1, isFeatured: true, isActive: true, image: "", slug: "botox" },
  { _id: "2", title: "Dermal Fillers", category: "Injectables", shortDescription: "Restore volume, enhance contours, and rejuvenate your appearance with premium hyaluronic acid fillers.", description: "Dermal fillers use hyaluronic acid — a naturally occurring substance in the body — to restore lost volume, enhance facial contours, and smooth deep folds. We offer a full menu of filler treatments including lip augmentation, cheek enhancement, nasolabial folds, marionette lines, and more.", benefits: ["Immediate, visible results", "Natural-feeling and looking", "Reversible with hyaluronidase", "Long-lasting (12-18 months)", "Minimal downtime"], duration: "45-60 min", price: "From $500", order: 2, isFeatured: true, isActive: true, image: "", slug: "fillers" },
  { _id: "3", title: "Mesotherapy", category: "Skin Treatments", shortDescription: "Revitalize your skin with customized microinjections delivering vitamins, minerals, and hyaluronic acid.", description: "Mesotherapy involves injecting a customized cocktail of vitamins, minerals, amino acids, and hyaluronic acid into the mesodermal layer of skin. This treatment deeply nourishes, hydrates, and rejuvenates skin from within, improving texture, tone, and radiance.", benefits: ["Deep skin hydration", "Improved skin texture and tone", "Stimulates collagen production", "Reduces fine lines", "Addresses hair loss (scalp mesotherapy)"], duration: "45-60 min", price: "From $350", order: 3, isFeatured: true, isActive: true, image: "", slug: "mesotherapy" },
  { _id: "4", title: "Customized Facials", category: "Skin Treatments", shortDescription: "Medical-grade facial treatments precisely tailored to your unique skin type and concerns.", description: "Our customized facials go beyond standard spa treatments. Using medical-grade products and techniques, we address your specific skin concerns — whether that's acne, rosacea, hyperpigmentation, dullness, or dehydration. Each facial is uniquely designed after a thorough skin analysis.", benefits: ["Personalized to your skin needs", "Medical-grade ingredients", "Immediate visible improvement", "Addresses specific concerns", "Relaxing and rejuvenating"], duration: "60-90 min", price: "From $150", order: 4, isFeatured: false, isActive: true, image: "", slug: "facials" },
  { _id: "5", title: "IPL Photofacials", category: "Laser & Light", shortDescription: "Target pigmentation, redness, and sun damage with Intense Pulsed Light therapy.", description: "IPL (Intense Pulsed Light) therapy uses broad-spectrum light to target multiple skin concerns simultaneously. It effectively treats sunspots, age spots, freckles, vascular lesions, rosacea, and overall skin texture, revealing a more even, luminous complexion.", benefits: ["Targets multiple concerns at once", "Reduces pigmentation and redness", "Stimulates collagen", "Minimal downtime", "Progressive improvement over sessions"], duration: "30-45 min", price: "From $250", order: 5, isFeatured: false, isActive: true, image: "", slug: "ipl" },
  { _id: "6", title: "Laser Hair Removal", category: "Laser & Light", shortDescription: "Achieve smooth, hair-free skin permanently with advanced laser technology.", description: "Our advanced laser hair removal technology targets hair follicles with precision, permanently reducing unwanted hair on any area of the body. Safe and effective for all skin types, treatments are fast, comfortable, and deliver long-lasting results.", benefits: ["Permanent hair reduction", "Safe for all skin types", "Fast treatment sessions", "Smooth, silky results", "Cost-effective long-term"], duration: "15-60 min", price: "From $80", order: 6, isFeatured: false, isActive: true, image: "", slug: "laser-hair" },
  { _id: "7", title: "Muscle Toning (EMS)", category: "Body", shortDescription: "Non-invasive electromagnetic muscle stimulation to tone and sculpt your body.", description: "Our EMS (Electromagnetic Muscle Stimulation) body treatment induces supramaximal muscle contractions — equivalent to thousands of sit-ups or squats in a single session. It tones, strengthens, and defines muscles while simultaneously reducing fat in the treatment area.", benefits: ["Equivalent to 20,000 contractions per session", "Builds and tones muscle", "No surgery or downtime", "Treats abs, glutes, arms, thighs", "Results visible after 4 sessions"], duration: "30 min", price: "From $300", order: 7, isFeatured: false, isActive: true, image: "", slug: "muscle-toning" },
  { _id: "8", title: "Body Sculpting", category: "Body", shortDescription: "Contour and slim targeted areas with advanced body sculpting technology.", description: "Non-invasive body sculpting treatments target stubborn fat deposits that resist diet and exercise. Using advanced technologies including cryolipolysis, radiofrequency, and ultrasound, we safely and effectively contour your body without surgery or downtime.", benefits: ["Non-surgical fat reduction", "Targeted body contouring", "No downtime required", "Natural-looking results", "Multiple technologies available"], duration: "45-60 min", price: "From $400", order: 8, isFeatured: false, isActive: true, image: "", slug: "body-sculpting" },
];

const categories = ["All", "Injectables", "Skin Treatments", "Laser & Light", "Body"];

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<typeof fallbackServices[0] | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { if (data?.services?.length) setServices(data.services); })
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

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
      <section id="services-grid" className="section-pad bg-soft-black">
        <div className="container-luxury">
          {/* Category Filter */}
          <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-inter text-xs tracking-[2px] uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold text-luxury-black border-gold"
                    : "border-gold/20 text-soft-taupe hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service, i) => (
              <ScrollReveal key={service._id} delay={i * 0.07}>
                <ServiceCard
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              </ScrollReveal>
            ))}
          </div>

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
