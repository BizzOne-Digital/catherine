"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Save } from "lucide-react";
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
  metaDescription: "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => { if (d.settings) setSettings({ ...defaults, ...d.settings }); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    const r = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    if (r.ok) toast.success("Settings saved");
    else toast.error("Save failed");
    setSaving(false);
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: { label: string; field: keyof Settings; type?: string; placeholder?: string }) => (
    <div>
      <label className="admin-label">{label}</label>
      <input
        type={type}
        value={settings[field] as string}
        onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
        className="admin-input"
        placeholder={placeholder}
      />
    </div>
  );

  if (loading) return <AdminLayout title="Settings"><div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Site Settings" description="Configure your website's global settings">
      <div className="max-w-2xl space-y-8">
        {/* Business Info */}
        <div className="admin-card space-y-4">
          <h3 className="font-playfair text-lg text-warm-beige pb-3 border-b border-gold/10">Business Information</h3>
          <Field label="Business Name" field="businessName" />
          <Field label="Tagline" field="tagline" />
          <Field label="Phone" field="phone" />
          <Field label="Email" field="email" type="email" />
          <div><label className="admin-label">Address</label><textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} rows={2} className="admin-input resize-none" /></div>
        </div>

        {/* Hours */}
        <div className="admin-card space-y-4">
          <h3 className="font-playfair text-lg text-warm-beige pb-3 border-b border-gold/10">Business Hours</h3>
          <Field label="Monday – Friday" field="hoursMonFri" placeholder="9:00 AM – 7:00 PM" />
          <Field label="Saturday" field="hoursSat" placeholder="10:00 AM – 5:00 PM" />
          <Field label="Sunday" field="hoursSun" placeholder="Closed" />
        </div>

        {/* Social */}
        <div className="admin-card space-y-4">
          <h3 className="font-playfair text-lg text-warm-beige pb-3 border-b border-gold/10">Social Media & Maps</h3>
          <Field label="Instagram URL" field="instagramUrl" placeholder="https://instagram.com/..." />
          <Field label="Facebook URL" field="facebookUrl" />
          <Field label="Google Maps URL" field="googleMapsUrl" />
        </div>

        {/* Announcement Bar */}
        <div className="admin-card space-y-4">
          <h3 className="font-playfair text-lg text-warm-beige pb-3 border-b border-gold/10">Announcement Bar</h3>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={settings.announcementBarEnabled} onChange={(e) => setSettings({ ...settings, announcementBarEnabled: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Show announcement bar</span></label>
          <Field label="Announcement Text" field="announcementBarText" />
        </div>

        {/* SEO */}
        <div className="admin-card space-y-4">
          <h3 className="font-playfair text-lg text-warm-beige pb-3 border-b border-gold/10">SEO Metadata</h3>
          <Field label="Meta Title" field="metaTitle" />
          <div><label className="admin-label">Meta Description</label><textarea value={settings.metaDescription} onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })} rows={3} className="admin-input resize-none" /></div>
        </div>

        {/* Save */}
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2 px-8 py-3">
          {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Settings</>}
        </button>
      </div>
    </AdminLayout>
  );
}
