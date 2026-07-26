"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import { resolveCmsImage } from "@/lib/cmsImage";

type Section = {
  id: string;
  type: string;
  title: string;
  content: string;
  image: string;
  items: string[];
  order: number;
};

type TreatmentDetail = {
  name: string;
  slug: string;
  categorySlug: string;
  categoryTitle: string;
  shortDescription: string;
  price: string;
  image: string;
  popular: boolean;
  sections: Section[];
};

function paragraphs(text: string) {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export default function TreatmentDetailView({
  categorySlug,
  treatmentSlug,
}: {
  categorySlug: string;
  treatmentSlug: string;
}) {
  const [treatment, setTreatment] = useState<TreatmentDetail | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      setLoading(true);
      const qs = new URLSearchParams({
        category: categorySlug,
        slug: treatmentSlug,
        _: String(Date.now()),
      });
      fetch(`/api/treatments/detail?${qs}`, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) throw new Error("not found");
          return r.json();
        })
        .then((d) => {
          if (cancelled) return;
          setTreatment(d.treatment);
          setError(false);
        })
        .catch(() => {
          if (!cancelled) setError(true);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, [categorySlug, treatmentSlug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-inter text-sm text-soft-taupe">Loading treatment…</p>
      </div>
    );
  }

  if (error || !treatment) {
    return (
      <div className="container-luxury py-24 text-center">
        <h1 className="mb-4 font-playfair text-3xl text-text-dark">Treatment not found</h1>
        <Link href={`/services/${categorySlug}`} className="text-gold hover:underline">
          Back to category
        </Link>
      </div>
    );
  }

  const sections = [...(treatment.sections || [])].sort((a, b) => a.order - b.order);
  const hero = sections.find((s) => s.type === "hero");
  const ideal = sections.find((s) => s.type === "ideal_for");
  const recovery = sections.find((s) => s.type === "recovery");
  const rest = sections.filter(
    (s) => s.type !== "hero" && s.type !== "ideal_for" && s.type !== "recovery"
  );
  const heroImage = resolveCmsImage(hero?.image || treatment.image, "");
  const heroTitle = hero?.title || treatment.name;
  // Intro: hero section text, else card shortDescription (admin "short description")
  const heroContent = (hero?.content || "").trim() || treatment.shortDescription;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link
            href={`/services/${treatment.categorySlug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-deep-gold"
          >
            <ArrowLeft size={16} />
            Back to {treatment.categoryTitle || "Services"}
          </Link>

          <ScrollReveal>
            <div
              className={`grid items-center gap-12 ${heroImage ? "lg:grid-cols-2" : ""}`}
            >
              <div className={heroImage ? "" : "mx-auto max-w-3xl text-center"}>
                {treatment.popular && (
                  <div className={`mb-4 flex ${heroImage ? "" : "justify-center"}`}>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      <Star size={12} fill="currentColor" />
                      Popular
                    </span>
                  </div>
                )}
                <h1 className="mb-6 font-playfair text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
                  {heroTitle}
                </h1>
                {heroContent && (
                  <div className="mb-8 space-y-4">
                    {paragraphs(heroContent).map((p, i) => (
                      <p key={i} className="text-xl font-medium leading-relaxed text-text-soft">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
                <div className={`mb-8 flex items-center gap-2 ${heroImage ? "" : "justify-center"}`}>
                  <DollarSign size={20} className="text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-soft">Price</p>
                    <p className="text-lg font-bold text-gold">{treatment.price}</p>
                  </div>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-deep-gold"
                >
                  Book This Treatment
                  <ArrowRight size={16} />
                </Link>
              </div>

              {heroImage && (
                <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[500px]">
                  <CmsImage
                    src={heroImage}
                    alt={heroTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Remaining sections */}
      {rest.map((section, idx) => {
        const altBg = idx % 2 === 1;
        const sectionImage = resolveCmsImage(section.image, "");
        const hasImage = !!sectionImage;

        if (section.type === "benefits") {
          return (
            <section
              key={section.id}
              className={`section-pad ${altBg ? "bg-gradient-to-b from-[#FFFBF6] to-white" : "bg-white"}`}
            >
              <div className="container-luxury">
                <div className="mx-auto max-w-4xl">
                  <ScrollReveal>
                    <h2 className="mb-8 font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
                      {section.title || "Benefits"}
                    </h2>
                    {section.content && (
                      <p className="mb-6 text-lg font-medium leading-relaxed text-text-soft">
                        {section.content}
                      </p>
                    )}
                    {hasImage && (
                      <div className="relative mb-8 h-56 overflow-hidden rounded-2xl sm:h-72">
                        <CmsImage
                          src={sectionImage}
                          alt={section.title || "Benefits"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(section.items || []).map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl border border-gold/10 bg-white p-4"
                        >
                          <CheckCircle size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                          <span className="font-medium text-text-dark">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        }

        // about / custom
        return (
          <section
            key={section.id}
            className={`section-pad ${altBg ? "bg-gradient-to-b from-[#FFFBF6] to-white" : "bg-white"}`}
          >
            <div className="container-luxury">
              <div className={`mx-auto max-w-4xl ${hasImage ? "grid items-center gap-10 lg:grid-cols-2 lg:max-w-5xl" : ""}`}>
                <ScrollReveal>
                  {section.title && (
                    <h2 className="mb-6 font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
                      {section.title}
                    </h2>
                  )}
                  <div className="space-y-6">
                    {paragraphs(section.content).map((p, i) => (
                      <p key={i} className="text-lg font-medium leading-relaxed text-text-soft">
                        {p}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
                {hasImage && (
                  <ScrollReveal delay={0.1}>
                    <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
                      <CmsImage
                        src={sectionImage}
                        alt={section.title || treatment.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Ideal For + Recovery pair */}
      {(ideal || recovery) && (
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {ideal && (
                <ScrollReveal>
                  <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 p-8">
                    {resolveCmsImage(ideal.image, "") && (
                      <div className="relative mb-5 h-40 overflow-hidden rounded-xl">
                        <CmsImage
                          src={ideal.image}
                          alt={ideal.title || "Ideal For"}
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                      </div>
                    )}
                    <h3 className="mb-4 font-playfair text-2xl font-bold text-gold">
                      {ideal.title || "Ideal For"}
                    </h3>
                    <p className="font-medium leading-relaxed text-text-dark">{ideal.content}</p>
                  </div>
                </ScrollReveal>
              )}
              {recovery && (
                <ScrollReveal delay={0.1}>
                  <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 p-8">
                    {resolveCmsImage(recovery.image, "") && (
                      <div className="relative mb-5 h-40 overflow-hidden rounded-xl">
                        <CmsImage
                          src={recovery.image}
                          alt={recovery.title || "Recovery"}
                          fill
                          className="object-cover"
                          sizes="400px"
                        />
                      </div>
                    )}
                    <h3 className="mb-4 font-playfair text-2xl font-bold text-gold">
                      {recovery.title || "Recovery"}
                    </h3>
                    <p className="font-medium leading-relaxed text-text-dark">{recovery.content}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad-sm bg-[#FFFBF6] text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="mb-4 font-playfair text-3xl text-text-dark">Ready to Begin?</h2>
            <p className="mb-7 font-cormorant text-lg italic text-soft-taupe">
              Book your complimentary consultation to discuss this treatment.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking" className="btn-gold rounded-sm">
                Book Free Consultation
              </Link>
              <Link href={`/services/${treatment.categorySlug}`} className="btn-outline-gold rounded-sm">
                View Category
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
