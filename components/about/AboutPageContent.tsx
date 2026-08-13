"use client";
import Link from "next/link";
import {
  CheckCircle,
  Award,
  Heart,
  Shield,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePageContent } from "@/components/cms/usePageContent";

const valueIcons: LucideIcon[] = [Shield, Heart, Award, GraduationCap];

const FALLBACK = {
  hero: {
    title: "About\nLumina Medi Spa",
    subtitle: "Evidence-Based. Personalized. Natural Results.",
    content:
      "At Lumina Medi Spa, we combine medical aesthetics with personalized care to help you achieve refreshed, natural-looking results. Every treatment begins with a consultation to understand your goals and determine an approach suited to you.",
  },
  team: {
    subtitle: "",
    title: "Our Professionals",
    content:
      "Our team includes trained healthcare and aesthetic professionals committed to providing knowledgeable, attentive care.",
    items: [],
  },
  values: {
    title: "What Guides Us",
    subtitle: "Our Approach",
    items: [
      "Safety First|We prioritize safety, education, and professional standards in every treatment.",
      "Personalized Care|Treatment recommendations are tailored to your individual goals and needs.",
      "Natural Results|Our goal is to enhance your features while preserving your natural appearance.",
      "Ongoing Excellence|We stay current with advances in medical aesthetics through continued education and training.",
    ],
  },
  credentials: {
    title: "Credentials & Training",
    items: [
      "Medical Aesthetician",
      "Registered Nurse (RN), College of Nurses of Ontario",
      "Medical Director",
      "Advanced Neuromodulators & Dermal Fillers Certificate – CAMA",
      "IPL & Laser Therapy Certified",
      "Ongoing Education in Medical Aesthetics",
    ],
  },
};

function parseTeamMember(raw: string) {
  const parts = raw.split("|").map((s) => s.trim());
  return {
    name: parts[0] || "",
    role: parts[1] || "",
    bio: parts.slice(2).join("|") || "",
  };
}

export default function AboutPageContent() {
  const { get } = usePageContent("about");
  const hero = get("hero");
  const teamSec = get("team") || get("story");
  const valuesSec = get("values");
  const creds = get("credentials");

  const heroTitle = (hero?.title || FALLBACK.hero.title).split("\n");
  const heroSub = hero?.subtitle || FALLBACK.hero.subtitle;
  const heroContent = hero?.content || FALLBACK.hero.content;

  const teamTitle = teamSec?.title || FALLBACK.team.title;
  const teamSub = teamSec?.subtitle || FALLBACK.team.subtitle;
  const teamContent = teamSec?.content || FALLBACK.team.content;
  const teamItems = (
    teamSec?.items?.length && teamSec.key !== "story"
      ? teamSec.items
      : FALLBACK.team.items
  ).map(parseTeamMember);

  const valueItems = (valuesSec?.items?.length ? valuesSec.items : FALLBACK.values.items).map(
    (raw) => {
      const [title, ...rest] = raw.split("|").map((s) => s.trim());
      return { title: title || "", desc: rest.join("|") || "" };
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
        <div className="about-hero-content relative z-10 mx-auto flex max-w-7xl items-start px-4 pb-24 pt-40 sm:px-6 sm:pb-28 sm:pt-48 lg:min-h-[min(92vh,820px)] lg:items-center lg:px-8 lg:pb-32 lg:pt-56">
          <ScrollReveal direction="right" className="max-w-xl lg:max-w-[560px] lg:translate-y-8">
            <h1 className="about-hero-title font-playfair leading-[1.08] tracking-tight text-warm-beige">
              {heroTitle.map((line) => (
                <span key={line} className="mt-1 block first:mt-0">
                  {line}
                </span>
              ))}
            </h1>
            <div className="about-hero-divider mt-5 flex items-center justify-start gap-0">
              <span className="about-hero-divider-line w-16" />
              <svg
                viewBox="0 0 12 12"
                className="mx-3 h-[7px] w-[7px] shrink-0 text-gold/75"
                aria-hidden="true"
              >
                <path
                  d="M6 0 L6.8 4.2 L11 5 L6.8 5.8 L6 10 L5.2 5.8 L1 5 L5.2 4.2 Z"
                  fill="currentColor"
                />
              </svg>
              <span className="about-hero-divider-line w-16" />
            </div>
            <p className="about-hero-tagline mt-5 font-inter text-[10px] font-bold uppercase tracking-[0.28em] text-gold sm:text-[11px]">
              {heroSub}
            </p>
            <p className="about-hero-desc mt-6 max-w-lg font-inter text-sm font-semibold leading-relaxed text-warm-beige/90 sm:text-[15px]">
              {heroContent}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What Guides Us */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <ScrollReveal>
            <SectionHeading
              eyebrow={valuesSec?.subtitle || FALLBACK.values.subtitle}
              title={valuesSec?.title || FALLBACK.values.title}
            />
          </ScrollReveal>
          <div className="about-values-grid mt-12">
            {valueItems.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className="about-value-card">
                    <div className="about-value-icon">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="about-value-title">{v.title}</h3>
                    <p className="about-value-desc">{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Professionals */}
      <section className="section-pad section-warm-alt">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <SectionHeading eyebrow={teamSub || undefined} title={teamTitle} />
          </ScrollReveal>

          {teamItems.length > 0 ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {teamItems.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 0.1}>
                  <article className="flex h-full flex-col rounded-2xl border border-gold/20 bg-ivory/95 p-7 sm:p-8 shadow-card transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm">
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-gold/30 to-deep-gold/10">
                        <span className="font-playfair text-2xl text-gold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-text-dark">
                          {member.name}
                        </h3>
                        <p className="font-cormorant text-lg italic text-gold">{member.role}</p>
                      </div>
                    </div>
                    <div className="mb-4 h-px w-12 bg-gold/30" />
                    <p className="flex-1 font-inter text-sm font-medium leading-relaxed text-soft-taupe sm:text-[15px]">
                      {member.bio}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal delay={0.08}>
              <p className="mt-8 text-center font-inter text-base font-medium leading-relaxed text-soft-taupe sm:text-lg">
                {teamContent}
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Credentials */}
      <section className="section-pad section-warm">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-playfair text-3xl text-warm-beige md:text-4xl">
              {creds?.title || FALLBACK.credentials.title}
            </h2>
          </ScrollReveal>
          <ul className="space-y-3">
            {credItems.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-xl border border-gold/15 bg-ivory/80 px-5 py-4">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                  <span className="font-inter text-sm font-medium text-text-dark/90">{item}</span>
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
