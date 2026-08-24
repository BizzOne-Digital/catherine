"use client";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Shield,
  Sparkles,
  Flower2,
} from "lucide-react";
import IntroLogo from "@/components/ui/IntroLogo";
import { FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { phoneToTel, useSiteSettings, splitAddress } from "@/components/cms/useSiteSettings";
import { FACEBOOK_URL, TIKTOK_URL } from "@/lib/homeGalleryData";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Financing", href: "/financing" },
  { label: "Shop", href: "/shop" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Injectables & Wrinkle Relaxers", href: "/services" },
  { label: "Dermal Fillers & Skin Boosters", href: "/services" },
  { label: "Facials & Skin Health", href: "/services" },
  { label: "Microneedling & Skin Resurfacing", href: "/services" },
  { label: "Laser Hair Removal", href: "/services" },
  { label: "Body Sculpting & Contouring", href: "/services" },
];

export default function Footer() {
  const { settings } = useSiteSettings();
  const telHref = phoneToTel(settings.phone);
  const facebookUrl = settings.facebookUrl || FACEBOOK_URL;
  const tiktokUrl = TIKTOK_URL;
  const { city: displayCity, street: displayStreet } = splitAddress(settings.address);

  return (
    <footer className="footer-section relative overflow-hidden">
      <div className="relative z-10">
        {/* Main footer */}
        <div className="container-luxury py-14 lg:py-16">
          <div className="footer-main-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <Link href="/" className="mb-5 inline-flex items-center" aria-label="Lumina Medi Spa home">
                <IntroLogo className="h-36 w-36 sm:h-40 sm:w-40" />
              </Link>

              <p className="footer-brand-text max-w-sm font-inter text-[15px] font-medium leading-relaxed text-text-dark">
                Where advanced medical aesthetics meets personalized care. We enhance your natural
                beauty with precision, integrity, and results that glow.
              </p>

              <Link href="/booking" className="footer-btn-primary group mt-6 inline-flex">
                Book Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <p className="footer-follow-label mt-8 font-inter text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                Follow Us
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href={settings.instagramUrl || "https://instagram.com/luminamedispa"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={15} />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={15} />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="footer-divider hidden lg:flex" aria-hidden="true">
              <span className="footer-divider-line" />
              <Sparkles size={8} className="footer-divider-star shrink-0 text-gold/70" />
              <span className="footer-divider-line" />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-link-list">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-link-list">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-col-title">Contact</h4>
              <ul className="footer-contact-list">
                <li>
                  <a href={telHref} className="footer-contact-item">
                    <span className="footer-contact-icon">
                      <Phone size={13} />
                    </span>
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="footer-contact-item whitespace-nowrap"
                  >
                    <span className="footer-contact-icon">
                      <Mail size={13} />
                    </span>
                    {settings.email}
                  </a>
                </li>
                <li>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <FacebookIcon size={13} />
                    </span>
                    Lumina Medi Spa on Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <TikTokIcon size={13} />
                    </span>
                    @lumina.medi.spa
                  </a>
                </li>
                <li>
                  <a
                    href={settings.instagramUrl || "https://instagram.com/luminamedispa"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                  >
                    <span className="footer-contact-icon">
                      <Instagram size={13} />
                    </span>
                    @luminamedispa
                  </a>
                </li>
                <li>
                  <span className="footer-contact-item items-start">
                    <span className="footer-contact-icon mt-0.5">
                      <MapPin size={13} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5 leading-snug">
                      <span className="whitespace-nowrap">{displayCity}</span>
                      <span className="text-[11px] opacity-80">{displayStreet}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Card */}
            <div className="footer-cta-card lg:col-span-1">
              <div className="footer-cta-icon">
                <Flower2 size={22} strokeWidth={1.3} />
              </div>
              <h3 className="footer-cta-heading font-playfair">
                Begin Your Aesthetic{" "}
                <span className="font-great-vibes text-[1.35rem] text-gold sm:text-[1.65rem] lg:text-[1.85rem]">
                  Journey
                </span>
              </h3>
              <p className="footer-cta-text">
                Personalized care. Natural-looking results. Treatments designed around you.
              </p>
              <Link href="/book" className="footer-btn-primary group mt-5 inline-flex w-full justify-center sm:w-auto">
                Book Online
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <div className="footer-cta-features">
                <div className="footer-cta-feature">
                  <Shield size={16} strokeWidth={1.3} />
                  <span>Medical Excellence</span>
                </div>
                <span className="footer-cta-feature-divider" aria-hidden="true" />
                <div className="footer-cta-feature">
                  <Sparkles size={16} strokeWidth={1.3} />
                  <span>Personalized Care</span>
                </div>
                <span className="footer-cta-feature-divider" aria-hidden="true" />
                <div className="footer-cta-feature">
                  <Flower2 size={16} strokeWidth={1.3} />
                  <span>Natural Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — white background + black text for contrast */}
        <div className="footer-bottom-bar">
          <div className="container-luxury flex flex-col items-center gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <div className="footer-disclaimer flex max-w-xl items-start gap-2.5">
              <Shield size={14} className="mt-0.5 shrink-0 text-black/70" strokeWidth={1.4} />
              <p className="font-inter text-[10px] leading-relaxed text-black">
                Information on this website is for general educational and aesthetic consultation
                purposes only and does not replace medical advice, diagnosis, or treatment. Results
                vary by individual.
              </p>
            </div>

            <Sparkles size={10} className="hidden shrink-0 text-black/40 lg:block" aria-hidden="true" />

            <p className="footer-copyright shrink-0 font-inter text-[10px] tracking-wide text-black">
              © 2026 Lumina Medi Spa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
