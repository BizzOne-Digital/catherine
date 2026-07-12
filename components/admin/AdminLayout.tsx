"use client";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-luxury-black overflow-hidden">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center gap-3 border-b border-gold/10 bg-soft-black px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-warm-beige transition-colors hover:text-gold"
            aria-label="Open admin menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-playfair text-sm text-gold">Lumina Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {(title || description) && (
              <div className="mb-7 border-b border-gold/10 pb-5">
                {title && (
                  <h1 className="font-playfair text-xl sm:text-2xl text-warm-beige">{title}</h1>
                )}
                {description && (
                  <p className="mt-1 font-inter text-sm text-soft-taupe">{description}</p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
