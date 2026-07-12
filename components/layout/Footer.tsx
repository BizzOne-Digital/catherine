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

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Injectables", href: "/services" },
  { label: "Facials", href: "/services" },
  { label: "Laser", href: "/services" },
  { label: "Body Sculpting", href: "/services" },
  { label: "Skin Treatments", href: "/services" },
];

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.6 3.1 2.6 5.5 5.5 5.7v3.4c-2 0-3.9-.6-5.5-1.7v7.8c0 4-3.2 7.2-7.2 7.2S2.1 22.2 2.1 18.2s3.2-7.2 7.2-7.2c.4 0 .8 0 1.2.1v3.7a3.5 3.5 0 1 0 2.5 3.35V3h3.5z" />
    </svg>
  );
}

function YelpIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer-section relative overflow-hidden">
      <div className="relative z-10">
        {/* Main footer */}
        <div className="container-luxury py-14 lg:py-16">
          <div className="footer-main-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <Link href="/" className="mb-5 flex items-center gap-3">
                <IntroLogo className="h-[72px] w-16 sm:h-20 sm:w-[4.5rem]" />
                <span className="font-playfair text-lg tracking-wide text-gold lg:text-xl">
                  Lumina Medi Spa
                </span>
              </Link>

              <p className="footer-brand-text max-w-sm font-inter text-sm font-light leading-relaxed text-warm-beige/70">
                Where advanced medical aesthetics meets personalized care. We enhance your natural
                beauty with precision, integrity, and results that glow.
              </p>

              <Link href="/booking" className="footer-btn-primary group mt-6 inline-flex">
                Book Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <p className="footer-follow-label mt-8 font-inter text-[10px] uppercase tracking-[0.28em] text-gold/70">
                Follow Us
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href="https://instagram.com/luminamedispa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={15} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={15} />
                </a>
                <a
                  href="https://yelp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Yelp"
                >
                  <YelpIcon size={15} />
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
                  <a href="tel:+16479299450" className="footer-contact-item">
                    <span className="footer-contact-icon">
                      <Phone size={13} />
                    </span>
                    (647) 929-9450
                  </a>
                </li>
                <li>
                  <a href="mailto:catherinezhang01@outlook.com" className="footer-contact-item">
                    <span className="footer-contact-icon">
                      <Mail size={13} />
                    </span>
                    catherinezhang01@outlook.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/luminamedispa"
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
                  <span className="footer-contact-item">
                    <span className="footer-contact-icon">
                      <MapPin size={13} />
                    </span>
                    Mississauga, Ontario
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
                Personalized care. Natural-looking results. Confidence that shines.
              </p>
              <Link href="/booking" className="footer-btn-primary group mt-5 inline-flex w-full justify-center sm:w-auto">
                Book Now
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

        {/* Bottom bar */}
        <div className="footer-bottom-bar border-t border-gold/15">
          <div className="container-luxury flex flex-col items-center gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <div className="footer-disclaimer flex max-w-xl items-start gap-2.5">
              <Shield size={14} className="mt-0.5 shrink-0 text-gold/60" strokeWidth={1.4} />
              <p className="font-inter text-[10px] leading-relaxed text-warm-beige/45">
                Information on this website is for general educational and aesthetic consultation
                purposes only and does not replace medical advice, diagnosis, or treatment. Results
                vary by individual.
              </p>
            </div>

            <Sparkles size={10} className="hidden shrink-0 text-gold/50 lg:block" aria-hidden="true" />

            <p className="footer-copyright shrink-0 font-inter text-[10px] tracking-wide text-warm-beige/45">
              © 2026 Lumina Medi Spa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
