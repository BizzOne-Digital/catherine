"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Settings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  hoursMonFri: string;
  hoursSat: string;
  hoursSun: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
  metaTitle: string;
  metaDescription: string;
}

const defaults: Settings = {
  businessName: "Lumina Medi Spa",
  tagline: "Medical Aesthetics Designed Around You",
  phone: "(905) 123-4567",
  email: "hello@luminamedispa.ca",
  address: "123 Luxury Lane, Suite 200, Mississauga, ON L5B 1M7",
  instagramUrl: "https://instagram.com/luminamedispa",
  facebookUrl: "",
  googleMapsUrl: "",
  hoursMonFri: "9:00 AM – 7:00 PM",
  hoursSat: "10:00 AM – 5:00 PM",
  hoursSun: "Closed",
  announcementBarText: "✦ Complimentary Skin Consultation — Book Today ✦",
  announcementBarEnabled: true,
  metaTitle: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  metaDescription:
    "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.settings) setSettings({ ...defaults, ...d.settings });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const setField = (field: keyof Settings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const r = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (r.ok) toast.success("Settings saved");
    else {
      const e = await r.json().catch(() => ({}));
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-gold" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings" description="Configure your website's global settings">
      <div className="max-w-2xl space-y-8">
        <div className="admin-card space-y-4">
          <h3 className="border-b border-gold/10 pb-3 font-playfair text-lg text-warm-beige">
            Business Information
          </h3>
          <div>
            <label className="admin-label">Business Name</label>
            <input
              className="admin-input"
              value={settings.businessName}
              onChange={(e) => setField("businessName", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Tagline</label>
            <input
              className="admin-input"
              value={settings.tagline}
              onChange={(e) => setField("tagline", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Phone</label>
            <input
              className="admin-input"
              value={settings.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              className="admin-input"
              value={settings.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Address</label>
            <textarea
              rows={2}
              className="admin-input resize-none"
              value={settings.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="border-b border-gold/10 pb-3 font-playfair text-lg text-warm-beige">
            Business Hours
          </h3>
          <div>
            <label className="admin-label">Monday – Friday</label>
            <input
              className="admin-input"
              placeholder="9:00 AM – 7:00 PM"
              value={settings.hoursMonFri}
              onChange={(e) => setField("hoursMonFri", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Saturday</label>
            <input
              className="admin-input"
              placeholder="10:00 AM – 5:00 PM"
              value={settings.hoursSat}
              onChange={(e) => setField("hoursSat", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Sunday</label>
            <input
              className="admin-input"
              placeholder="Closed"
              value={settings.hoursSun}
              onChange={(e) => setField("hoursSun", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="border-b border-gold/10 pb-3 font-playfair text-lg text-warm-beige">
            Social Media & Maps
          </h3>
          <div>
            <label className="admin-label">Instagram URL</label>
            <input
              className="admin-input"
              placeholder="https://instagram.com/..."
              value={settings.instagramUrl}
              onChange={(e) => setField("instagramUrl", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Facebook URL</label>
            <input
              className="admin-input"
              value={settings.facebookUrl}
              onChange={(e) => setField("facebookUrl", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Google Maps URL</label>
            <input
              className="admin-input"
              value={settings.googleMapsUrl}
              onChange={(e) => setField("googleMapsUrl", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="border-b border-gold/10 pb-3 font-playfair text-lg text-warm-beige">
            Announcement Bar
          </h3>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="accent-gold"
              checked={settings.announcementBarEnabled}
              onChange={(e) => setField("announcementBarEnabled", e.target.checked)}
            />
            <span className="font-inter text-sm text-soft-taupe">Show announcement bar</span>
          </label>
          <div>
            <label className="admin-label">Announcement Text</label>
            <input
              className="admin-input"
              value={settings.announcementBarText}
              onChange={(e) => setField("announcementBarText", e.target.value)}
            />
          </div>
        </div>

        <div className="admin-card space-y-4">
          <h3 className="border-b border-gold/10 pb-3 font-playfair text-lg text-warm-beige">
            SEO Metadata
          </h3>
          <div>
            <label className="admin-label">Meta Title</label>
            <input
              className="admin-input"
              value={settings.metaTitle}
              onChange={(e) => setField("metaTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Meta Description</label>
            <textarea
              rows={3}
              className="admin-input resize-none"
              value={settings.metaDescription}
              onChange={(e) => setField("metaDescription", e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary flex items-center gap-2 px-8 py-3"
        >
          {saving ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={15} /> Save Settings
            </>
          )}
        </button>
      </div>
    </AdminLayout>
  );
}
