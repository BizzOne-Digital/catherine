"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import IntroLogo from "@/components/ui/IntroLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Financing", href: "/financing" },
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroNav = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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
              ? "nav-pill-bar gap-2 rounded-xl border border-gold/25 bg-[#080604]/55 px-2 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-1.5"
              : scrolled
                ? "border-b border-gold/10 bg-[#080604]/95 px-4 py-1.5 shadow-luxury backdrop-blur-xl sm:px-6 lg:px-8"
                : "bg-transparent px-4 py-2 sm:px-6 lg:px-8 lg:py-2.5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <IntroLogo className="h-[4.5rem] w-[4.5rem] shrink-0 sm:h-[5.25rem] sm:w-[5.25rem] lg:h-24 lg:w-24" />
            <span className="hidden font-playfair text-sm tracking-wide text-gold sm:block lg:text-base">
              Lumina Medi Spa
            </span>
          </Link>

          <span className="nav-divider hidden h-7 w-px shrink-0 bg-gold/25 xl:block" aria-hidden="true" />

          {/* Desktop Nav */}
          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex xl:gap-4 2xl:gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap font-inter text-[10px] tracking-wide text-warm-beige/80 transition-colors duration-300 hover:text-gold 2xl:text-[11px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="nav-divider hidden h-7 w-px shrink-0 bg-gold/25 xl:block" aria-hidden="true" />

          {/* Right Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/booking" className="nav-book-btn hidden md:inline-flex">
              Book Now
            </Link>
            <a
              href="tel:+19051234567"
              className="nav-phone-btn hidden md:flex"
              aria-label="Call Lumina Medi Spa"
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-warm-beige transition-colors hover:text-gold xl:hidden"
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
            className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-[#080604]/98 backdrop-blur-2xl"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/10 px-6 py-5">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <IntroLogo className="h-[4.5rem] w-[4.5rem] sm:h-[5.25rem] sm:w-[5.25rem]" />
                <span className="font-playfair text-lg text-gold">Lumina Medi Spa</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-soft-taupe transition-colors hover:text-gold"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-8 py-10">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block border-b border-gold/5 py-3 font-playfair text-2xl sm:text-3xl text-warm-beige transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="hero-btn-primary block text-center"
                >
                  Book Consultation
                </Link>
                <a
                  href="tel:+16479299450"
                  onClick={() => setMobileOpen(false)}
                  className="hero-btn-secondary flex items-center justify-center gap-2"
                >
                  <Phone size={15} />
                  Call (647) 929-9450
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
