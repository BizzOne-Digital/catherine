"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import IntroLogo from "@/components/ui/IntroLogo";
import {
  LayoutDashboard, FolderTree, Sparkles, Calendar,
  MessageSquare, HelpCircle, Settings, LogOut, X, Layers,
  ShoppingBag, DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Treatments", href: "/admin/treatments", icon: Sparkles },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "Pages", href: "/admin/pages", icon: Layers },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ mobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logged out");
      router.push("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-label="Close admin menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-60 flex-shrink-0 flex-col border-r border-gold/10 bg-soft-black transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="relative border-b border-gold/10 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-5 p-1 text-soft-taupe transition-colors hover:text-gold lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
          <Link href="/admin" className="flex items-center gap-3" onClick={handleNavClick}>
            <IntroLogo className="h-14 w-12" />
            <div>
              <p className="font-playfair text-gold text-sm leading-none">Lumina</p>
              <p className="font-inter text-[9px] tracking-[2px] uppercase text-soft-taupe leading-none mt-0.5">
                Admin
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-0.5">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-gold/10 text-gold border border-gold/15"
                        : "text-soft-taupe hover:text-warm-beige hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-gold" : "text-soft-taupe/70 group-hover:text-warm-beige"} />
                    <span className="font-inter text-sm">{label}</span>
                    {isActive && (
                      <span className="ml-auto w-1 h-1 rounded-full bg-gold" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-gold/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-soft-taupe transition-all duration-200 hover:bg-red-900/10 hover:text-red-400"
          >
            <LogOut size={16} />
            <span className="font-inter text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
