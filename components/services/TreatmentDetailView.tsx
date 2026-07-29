"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CmsImage from "@/components/cms/CmsImage";
import BeforeAfterCompare from "@/components/ui/BeforeAfterCompare";
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
  hidePrice?: boolean;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  bookingUrl?: string;
  popular: boolean;
  sections: Section[];
};

function paragraphs(text: string) {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

function BookButton({
  href,
  label = "Book This Treatment",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls =
    className ||
    "inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-deep-gold";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
        <ArrowRight size={16} />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
      <ArrowRight size={16} />
    </Link>
  );
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
        <Link href="/services" className="text-gold hover:underline">
          Back to Services
        </Link>
      </div>
    );
  }

  const sections = [...(treatment.sections || [])].sort((a, b) => a.order - b.order);
  const hero = sections.find((s) => s.type === "hero");
  const ideal = sections.find((s) => s.type === "ideal_for");
  const recovery = sections.find((s) => s.type === "recovery");
  const includes = sections.find(
    (s) => s.type === "custom" && (s.title || "").toLowerCase().includes("include")
  );
  const rest = sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ideal_for" &&
      s.type !== "recovery" &&
      s !== includes
  );
  const heroImage = resolveCmsImage(hero?.image || treatment.image, "");
  const heroTitle = hero?.title || treatment.name;
  const heroContent = (hero?.content || "").trim() || treatment.shortDescription;
  const showPrice = !treatment.hidePrice && Boolean((treatment.price || "").trim());
  const bookHref = (treatment.bookingUrl || "").trim() || "/booking";
  const beforeImg = resolveCmsImage(treatment.beforeImage || "", "");
  const afterImg = resolveCmsImage(treatment.afterImage || "", "");

  return (
    <div className="min-h-screen">
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
            <div className={`grid items-center gap-12 ${heroImage ? "lg:grid-cols-2" : ""}`}>
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
                {showPrice && (
                  <div className={`mb-8 flex items-center gap-2 ${heroImage ? "" : "justify-center"}`}>
                    <DollarSign size={20} className="text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-text-soft">Price</p>
                      <p className="text-lg font-bold text-gold">{treatment.price}</p>
                    </div>
                  </div>
                )}
                <BookButton href={bookHref} />
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

      {beforeImg && afterImg && (
        <section className="section-pad bg-white">
          <div className="container-luxury mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="mb-8 text-center font-playfair text-3xl font-bold text-text-dark">
                Before &amp; After
              </h2>
              <BeforeAfterCompare
                beforeSrc={beforeImg}
                afterSrc={afterImg}
                beforeAlt={`${treatment.name} before`}
                afterAlt={`${treatment.name} after`}
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {includes && (includes.items?.length || includes.content) && (
        <section className="section-pad bg-gradient-to-b from-[#FFFBF6] to-white">
          <div className="container-luxury mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="mb-8 font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
                {includes.title || "Treatments Include"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {(includes.items || []).map((item, i) => {
                  const [label, ...restParts] = item.split(" — ");
                  const desc = restParts.join(" — ");
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-gold/15 bg-white p-5 shadow-sm"
                    >
                      <p className="font-playfair text-lg font-semibold text-text-dark">{label}</p>
                      {desc && (
                        <p className="mt-2 font-inter text-sm leading-relaxed text-soft-taupe">
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

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

        return (
          <section
            key={section.id}
            className={`section-pad ${altBg ? "bg-gradient-to-b from-[#FFFBF6] to-white" : "bg-white"}`}
          >
            <div className="container-luxury">
              <div
                className={`mx-auto max-w-4xl ${hasImage ? "grid items-center gap-10 lg:grid-cols-2 lg:max-w-5xl" : ""}`}
              >
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

      {(ideal || recovery) && (
        <section className="section-pad bg-white">
          <div className="container-luxury">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {ideal && (
                <ScrollReveal>
                  <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 p-8">
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
                    <h3 className="mb-4 font-playfair text-2xl font-bold text-gold">
                      {recovery.title || "Recovery"}
                    </h3>
                    <div className="space-y-4 font-medium leading-relaxed text-text-dark">
                      {paragraphs(recovery.content).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad-sm bg-[#FFFBF6] text-center">
        <div className="container-luxury max-w-xl">
          <ScrollReveal>
            <h2 className="mb-4 font-playfair text-3xl text-text-dark">Ready to Begin?</h2>
            <p className="mb-7 font-cormorant text-lg italic text-soft-taupe">
              Book your treatment or complimentary consultation today.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookButton href={bookHref} label="Book Now" className="btn-gold rounded-sm inline-flex items-center gap-2" />
              <Link href="/services" className="btn-outline-gold rounded-sm">
                All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
