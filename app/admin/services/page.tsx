"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Service {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  duration: string;
  price: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const emptyService: Omit<Service, "_id"> = {
  title: "", category: "", shortDescription: "", description: "",
  benefits: [], duration: "", price: "", isActive: true, isFeatured: false, order: 0,
};

const categories = ["Injectables", "Skin Treatments", "Laser & Light", "Body"];

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "_id">>(emptyService);
  const [saving, setSaving] = useState(false);
  const [benefitsText, setBenefitsText] = useState("");

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    loadServices();
  }, [router]);

  const loadServices = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/services");
    const d = await r.json();
    setServices(d.services || []);
    setLoading(false);
  };

  const openNew = () => {
    setEditing(null);
    setForm(emptyService);
    setBenefitsText("");
    setShowForm(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, category: s.category, shortDescription: s.shortDescription, description: s.description, benefits: s.benefits, duration: s.duration, price: s.price, isActive: s.isActive, isFeatured: s.isFeatured, order: s.order });
    setBenefitsText(s.benefits.join("\n"));
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, benefits: benefitsText.split("\n").filter(Boolean) };
    const url = editing ? `/api/admin/services?id=${editing._id}` : "/api/admin/services";
    const method = editing ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (r.ok) {
      toast.success(editing ? "Service updated" : "Service created");
      setShowForm(false);
      loadServices();
    } else {
      const e = await r.json();
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const r = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); loadServices(); }
    else toast.error("Delete failed");
  };

  return (
    <AdminLayout title="Services" description="Manage your treatment offerings">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{services.length} services</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2">
          <Plus size={15} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div>
      ) : (
        <div className="admin-card p-0 overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    <p className="font-medium text-warm-beige">{s.title}</p>
                    <p className="text-xs text-soft-taupe/60 mt-0.5">{s.shortDescription?.slice(0, 50)}...</p>
                  </td>
                  <td><span className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">{s.category}</span></td>
                  <td className="text-gold">{s.price || "—"}</td>
                  <td>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${s.isActive ? "text-green-400 border-green-500/30 bg-green-900/20" : "text-red-400 border-red-500/30 bg-red-900/20"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold hover:border-gold transition-all"><Edit size={13} /></button>
                      <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 hover:border-red-500/40 transition-all"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {services.length === 0 && <div className="text-center py-12 text-soft-taupe">No services yet. Add your first service.</div>}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-xl h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 backdrop-blur-md z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold transition-all"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="admin-label">Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" placeholder="e.g. Botox & Neuromodulators" /></div>
              <div>
                <label className="admin-label">Category *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="admin-label">Short Description *</label><textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Full Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Benefits (one per line)</label><textarea value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} rows={4} className="admin-input resize-none" placeholder="Natural-looking results&#10;No downtime&#10;Long-lasting" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="admin-label">Duration</label><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="admin-input" placeholder="30-45 min" /></div>
                <div><label className="admin-label">Starting Price</label><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input" placeholder="From $200" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="admin-label">Display Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="admin-input" /></div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Active</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Featured</span></label>
              </div>
              <button onClick={handleSave} disabled={saving} className="admin-btn-primary w-full flex items-center justify-center gap-2 py-3">
                {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Check size={15} /> {editing ? "Update Service" : "Create Service"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
