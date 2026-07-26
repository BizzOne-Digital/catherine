"use client";
import Link from "next/link";
import { CheckCircle, Award, Heart, Shield, Users, type LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePageContent } from "@/components/cms/usePageContent";

const valueIcons: LucideIcon[] = [Shield, Heart, Award, Users];

const FALLBACK = {
  hero: {
    title: "About\nLumina Medi Spa",
    subtitle: "Woman-Owned. Medical-Grade. Results Driven.",
    content:
      "At Lumina Medi Spa, we combine advanced medical aesthetics with personalized care to help you look refreshed, natural, and confident in your own skin.",
  },
  story: {
    subtitle: "Our Beginning",
    title: "Where Medical Science Meets Artistry",
    content:
      "Lumina Medi Spa was born from a simple conviction: that every person deserves access to safe, effective, and personalized aesthetic care — delivered with warmth, honesty, and expertise.\n\nFounded by Catherine, a Registered Nurse with over a decade of experience in medical aesthetics, Lumina has become Mississauga's trusted destination for those seeking results that look and feel authentically them.",
    items: [
      "Catherine Zhang|RN, Founder & Lead Injector|\"My passion has always been helping people feel confident in their own skin — not by chasing perfection, but by celebrating the beauty that's already there.\"",
    ],
  },
  values: {
    title: "Our Values",
    subtitle: "What Guides Us",
    items: [
      "Medical Safety First|All treatments are performed with rigorous medical standards and oversight by licensed professionals.",
      "Genuine Care|We listen. Every consultation begins with understanding your goals, concerns, and lifestyle.",
      "Expertise & Precision|With 10+ years in medical aesthetics, our technique is refined, artistic, and evidence-based.",
      "You-Centered Results|We believe in enhancing your natural beauty — never altering who you are, only elevating it.",
    ],
  },
  credentials: {
    title: "Credentials & Training",
    items: [
      "Registered Nurse (RN) — Ontario College of Nurses",
      "Certified Medical Aesthetic Injector",
      "Advanced Injectable Training — Botox, Fillers, Mesotherapy",
      "IPL & Laser Therapy Certified",
      "Body Contouring & Muscle Stimulation Certified",
      "Ongoing Education in Aesthetic Medicine",
    ],
  },
};

export default function AboutPageContent() {
  const { get } = usePageContent("about");
  const hero = get("hero");
  const story = get("story");
  const valuesSec = get("values");
  const creds = get("credentials");

  const heroTitle = (hero?.title || FALLBACK.hero.title).split("\n");
  const heroSub = hero?.subtitle || FALLBACK.hero.subtitle;
  const heroContent = hero?.content || FALLBACK.hero.content;

  const storySub = story?.subtitle || FALLBACK.story.subtitle;
  const storyTitle = story?.title || FALLBACK.story.title;
  const storyParas = (story?.content || FALLBACK.story.content)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const profile = (story?.items?.[0] || FALLBACK.story.items[0]).split("|");
  const profileName = profile[0] || "Catherine Zhang";
  const profileRole = profile[1] || "RN, Founder & Lead Injector";
  const profileQuote = profile[2] || "";

  const valueItems = (valuesSec?.items?.length ? valuesSec.items : FALLBACK.values.items).map(
    (raw) => {
      const [title, desc] = raw.split("|").map((s) => s.trim());
      return { title: title || "", desc: desc || "" };
    }
  );
  const credItems = creds?.items?.length ? creds.items : FALLBACK.credentials.items;

  return (
    <>
      <section className="about-hero relative min-h-0 overflow-hidden lg:min-h-[min(92vh,820px)]">
        {hero?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}
        <div className="about-hero-content relative z-10 mx-auto flex max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-28 lg:min-h-[min(92vh,820px)] lg:px-8 lg:py-32">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[520px]">
            <h1 className="about-hero-title font-playfair leading-[1.08] tracking-tight text-warm-beige">
              {heroTitle.map((line) => (
                <span key={line} className="mt-1 block first:mt-0">
                  {line}
                </span>
              ))}
            </h1>
            <div className="about-hero-divider mt-5 flex items-center justify-start gap-0">
              <span className="about-hero-divider-line w-16" />
              <svg viewBox="0 0 12 12" className="mx-3 h-[7px] w-[7px] shrink-0 text-gold/75" aria-hidden="true">
                <path d="M6 0 L6.8 4.2 L11 5 L6.8 5.8 L6 10 L5.2 5.8 L1 5 L5.2 4.2 Z" fill="currentColor" />
              </svg>
              <span className="about-hero-divider-line w-16" />
            </div>
            <p className="about-hero-tagline mt-5 font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-gold sm:text-[11px]">
              {heroSub}
            </p>
            <p className="about-hero-desc mt-6 max-w-md font-inter text-sm font-light leading-relaxed text-warm-beige/80 sm:text-[15px]">
              {heroContent}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="about-story-grid items-center">
            <ScrollReveal direction="left" className="about-story-profile">
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#F7EFE4] to-[#EDE3D3] p-10 shadow-card">
                {story?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={story.image} alt={profileName} className="mb-6 h-28 w-28 rounded-full object-cover" />
                ) : (
                  <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-gold/30 to-deep-gold/10">
                    <span className="font-playfair text-5xl text-gold">{profileName.charAt(0)}</span>
                  </div>
                )}
                <h3 className="mb-2 font-playfair text-2xl text-text-dark">{profileName}</h3>
                <p className="mb-4 font-cormorant text-lg italic text-gold">{profileRole}</p>
                <div className="mb-5 h-px w-12 bg-gold/30" />
                <p className="text-center font-inter text-sm leading-relaxed text-soft-taupe">{profileQuote}</p>
              </div>
            </ScrollReveal>

            <div className="about-story-content space-y-6">
              <ScrollReveal direction="right">
                <span className="mb-3 block font-inter text-[11px] uppercase tracking-[4px] text-gold/80">
                  {storySub}
                </span>
                <h2 className="mb-5 font-playfair text-4xl leading-tight text-warm-beige">
                  {storyTitle}
                </h2>
                <div className="mb-6 h-px w-10 bg-gold/40" />
              </ScrollReveal>
              {storyParas.map((p, i) => (
                <ScrollReveal key={i} direction="right" delay={0.1 * (i + 1)}>
                  <p className="font-inter text-base leading-relaxed text-soft-taupe">{p}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-warm-alt">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionHeading
              eyebrow={valuesSec?.subtitle || FALLBACK.values.subtitle}
              title={valuesSec?.title || FALLBACK.values.title}
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {valueItems.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className="rounded-xl border border-gold/20 bg-ivory/95 p-6">
                    <Icon size={22} className="mb-3 text-gold" />
                    <h3 className="mb-2 font-playfair text-xl text-text-dark">{v.title}</h3>
                    <p className="font-inter text-sm text-soft-taupe">{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad section-warm">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-playfair text-3xl text-warm-beige">
              {creds?.title || FALLBACK.credentials.title}
            </h2>
          </ScrollReveal>
          <ul className="space-y-3">
            {credItems.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                  <span className="font-inter text-sm text-warm-beige/85">{item}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/booking" className="btn-gold rounded-sm">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
