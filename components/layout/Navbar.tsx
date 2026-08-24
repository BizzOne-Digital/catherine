"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import IntroLogo from "@/components/ui/IntroLogo";
import { phoneToTel, useSiteSettings } from "@/components/cms/useSiteSettings";
import { useCart } from "@/components/shop/CartProvider";

type ServiceNavItem = { title: string; href: string };

const serviceCategoriesFallback: ServiceNavItem[] = [
  { title: "Injectables & Wrinkle Relaxers", href: "/services/injectables-wrinkle-relaxers" },
  { title: "Dermal Fillers & Skin Boosters", href: "/services/dermal-fillers-skin-boosters" },
  { title: "Facials & Skin Health", href: "/services/facials-skin-health" },
  { title: "Microneedling & Skin Resurfacing", href: "/services/microneedling-skin-resurfacing" },
  { title: "Laser Hair Removal", href: "/services/laser-hair-removal" },
  { title: "Body Sculpting & Contouring", href: "/services/body-sculpting-contouring" },
];

const navLinks = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Shop", href: "/shop" },
  { label: "Financing", href: "/financing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [serviceCategories, setServiceCategories] = useState<ServiceNavItem[]>(
    serviceCategoriesFallback
  );
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroNav = isHome && !scrolled;
  const { settings } = useSiteSettings();
  const telHref = phoneToTel(settings.phone);
  const { itemCount, openCart, hydrated } = useCart();
  const isServicesSection = pathname.startsWith("/services");

  const openServicesMenu = useCallback(() => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  }, []);

  const closeServicesMenu = useCallback(() => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 140);
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (data?.categories?.length) {
          setServiceCategories(
            data.categories.map(
              (c: { title: string; slug: string; detailPage?: string }) => ({
                title: c.title,
                href: c.detailPage?.trim() || `/services/${c.slug}`,
              })
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) setMobileServicesOpen(false);
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
          heroNav ? "px-4 pt-2.5 sm:px-6 lg:px-8" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center transition-all duration-500 ${
            heroNav
              ? "nav-pill-bar gap-2 rounded-xl border border-gold/40 bg-[#FAF4EB]/95 px-2 py-0 shadow-[0_4px_20px_rgba(196,151,47,0.18)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-0"
              : scrolled
                ? "border-b border-gold/25 bg-[#FAF4EB]/95 px-4 py-0 shadow-card backdrop-blur-xl sm:px-6 lg:px-8"
                : "bg-transparent px-4 py-0.5 sm:px-6 lg:px-8 lg:py-1"
          }`}
        >
          {/* Logo — mark only, no text name */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Lumina Medi Spa home">
            <IntroLogo className="h-[3.75rem] w-[3.75rem] shrink-0 sm:h-[4.25rem] sm:w-[4.25rem] lg:h-[4.75rem] lg:w-[4.75rem]" />
          </Link>

          <span className="nav-divider hidden h-7 w-px shrink-0 bg-gold/30 xl:block" aria-hidden="true" />

          {/* Desktop Nav */}
          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex xl:gap-5 2xl:gap-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={closeServicesMenu}
                >
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-1 whitespace-nowrap font-inter text-[14px] font-medium tracking-wide transition-colors duration-300 hover:text-gold 2xl:text-[15px] ${
                      isServicesSection ? "text-gold" : "text-text-dark"
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        className="absolute left-1/2 top-[calc(100%+0.65rem)] z-[120] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-gold/25 bg-white shadow-[0_16px_48px_rgba(21,17,13,0.12)] backdrop-blur-xl"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        role="menu"
                        aria-label="Service categories"
                      >
                        <ul className="py-2">
                          {serviceCategories.map((category) => {
                            const active = pathname === category.href;
                            return (
                              <li key={category.href} role="none">
                                <Link
                                  href={category.href}
                                  role="menuitem"
                                  className={`block px-4 py-2.5 font-inter text-[13px] leading-snug transition-colors hover:bg-gold/10 hover:text-gold ${
                                    active
                                      ? "bg-gold/10 font-medium text-gold"
                                      : "text-text-dark"
                                  }`}
                                >
                                  {category.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="border-t border-gold/15 px-4 py-2.5">
                          <Link
                            href="/services"
                            className="font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-deep-gold"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`whitespace-nowrap font-inter text-[14px] font-medium tracking-wide transition-colors duration-300 hover:text-gold 2xl:text-[15px] ${
                      pathname === link.href ? "text-gold" : "text-text-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <span className="nav-divider hidden h-7 w-px shrink-0 bg-gold/30 xl:block" aria-hidden="true" />

          {/* Right Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-text-dark transition-colors hover:text-gold"
              aria-label={`Open cart${hydrated && itemCount > 0 ? `, ${itemCount} items` : ""}`}
            >
              <ShoppingBag size={20} />
              {hydrated && itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-inter text-[10px] font-semibold text-luxury-black">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <Link href="/book" className="nav-book-btn hidden md:inline-flex">
              Book Online
            </Link>
            <a
              href={telHref}
              className="nav-phone-btn hidden md:flex"
              aria-label={`Call ${settings.businessName} at ${settings.phone}`}
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-text-dark transition-colors hover:text-gold xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-white/98 backdrop-blur-2xl"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/15 px-6 py-5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
                aria-label="Lumina Medi Spa home"
              >
                <IntroLogo className="h-[4rem] w-[4rem] sm:h-[4.5rem] sm:w-[4.5rem]" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-text-dark transition-colors hover:text-gold"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8 py-10">
              <ul className="space-y-2">
                {navLinks.map((link, i) =>
                  link.hasDropdown ? (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between border-b border-gold/10 py-3 font-playfair text-2xl font-semibold text-gold transition-colors hover:text-deep-gold sm:text-3xl"
                        aria-expanded={mobileServicesOpen}
                      >
                        Services
                        <ChevronDown
                          size={22}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-1 pt-1"
                          >
                            {serviceCategories.map((category) => (
                              <li key={category.href}>
                                <Link
                                  href={category.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block border-b border-gold/5 py-2.5 pl-3 font-inter text-base text-text-dark transition-colors hover:text-gold"
                                >
                                  {category.title}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href="/services"
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 pl-3 font-inter text-sm font-semibold uppercase tracking-wider text-gold"
                              >
                                View All Services
                              </Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ) : (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block border-b border-gold/10 py-3 font-playfair text-2xl sm:text-3xl font-semibold text-gold transition-colors hover:text-deep-gold"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
              <motion.div
                className="mt-10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openCart();
                  }}
                  className="hero-btn-secondary flex w-full items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  Cart{hydrated && itemCount > 0 ? ` (${itemCount})` : ""}
                </button>
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="hero-btn-primary block text-center"
                >
                  Book Online
                </Link>
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="hero-btn-secondary block text-center"
                >
                  Free Consultation
                </Link>
                <a
                  href={telHref}
                  onClick={() => setMobileOpen(false)}
                  className="hero-btn-secondary flex items-center justify-center gap-2"
                >
                  <Phone size={15} />
                  Call {settings.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
