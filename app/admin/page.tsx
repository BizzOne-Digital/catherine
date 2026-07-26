"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  Sparkles,
  FolderTree,
  FileText,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Stats {
  bookings: number;
  inquiries: number;
  categories: number;
  treatments: number;
  blog: number;
}

const quickLinks = [
  { label: "Manage Categories", href: "/admin/categories", icon: FolderTree, desc: "Edit service categories" },
  { label: "Manage Treatments", href: "/admin/treatments", icon: Sparkles, desc: "Add or edit treatments & pricing" },
  { label: "View Bookings", href: "/admin/bookings", icon: Calendar, desc: "Review new booking inquiries" },
  { label: "View Inquiries", href: "/admin/inquiries", icon: MessageSquare, desc: "Respond to contact messages" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    bookings: 0,
    inquiries: 0,
    categories: 0,
    treatments: 0,
    blog: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => {
        if (!r.ok) router.push("/admin/login");
      })
      .catch(() => router.push("/admin/login"));

    Promise.all([
      fetch("/api/admin/bookings").then((r) => r.json()).catch(() => ({ bookings: [] })),
      fetch("/api/admin/inquiries").then((r) => r.json()).catch(() => ({ inquiries: [] })),
      fetch("/api/admin/categories").then((r) => r.json()).catch(() => ({ categories: [] })),
      fetch("/api/admin/treatments").then((r) => r.json()).catch(() => ({ treatments: [] })),
      fetch("/api/admin/blog").then((r) => r.json()).catch(() => ({ posts: [] })),
    ]).then(([b, i, c, t, bl]) => {
      setStats({
        bookings: b.bookings?.length || 0,
        inquiries: i.inquiries?.length || 0,
        categories: c.categories?.length || 0,
        treatments: t.treatments?.length || 0,
        blog: bl.posts?.length || 0,
      });
      setLoading(false);
    });
  }, [router]);

  const statCards = [
    { label: "Total Bookings", value: stats.bookings, icon: Calendar },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare },
    { label: "Categories", value: stats.categories, icon: FolderTree },
    { label: "Treatments", value: stats.treatments, icon: Sparkles },
    { label: "Blog Posts", value: stats.blog, icon: FileText },
  ];

  return (
    <AdminLayout title="Dashboard" description="Welcome to Lumina Medi Spa admin panel">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={24} className="text-gold animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-4">
            {statCards.map(({ label, value, icon: Icon }) => (
              <div key={label} className="admin-card text-center">
                <Icon size={20} className="text-gold mx-auto mb-2" />
                <p className="font-playfair text-2xl text-warm-beige">{value}</p>
                <p className="font-inter text-xs text-soft-taupe mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-playfair text-xl text-warm-beige mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map(({ label, href, icon: Icon, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="admin-card group hover:border-gold/30 transition-all duration-300 flex flex-col gap-3"
                >
                  <Icon size={20} className="text-gold" />
                  <div>
                    <p className="font-inter text-sm font-medium text-warm-beige group-hover:text-gold transition-colors">
                      {label}
                    </p>
                    <p className="font-inter text-xs text-soft-taupe mt-0.5">{desc}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-gold/40 group-hover:text-gold transition-colors mt-auto self-end"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h3 className="font-playfair text-lg text-warm-beige mb-3">Getting Started</h3>
            <div className="space-y-2">
              {[
                "Edit service categories in Admin → Categories",
                "Add or update treatments & pricing in Admin → Treatments",
                "Review booking inquiries in Admin → Bookings",
                "Seed initial data with: npm run seed",
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 py-2 border-b border-gold/5 last:border-0"
                >
                  <span className="text-gold font-inter text-xs mt-0.5">{i + 1}.</span>
                  <span className="font-inter text-sm text-soft-taupe">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
