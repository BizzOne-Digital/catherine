"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface PricingItem {
  _id: string;
  treatmentName: string;
  category: string;
  price: string;
  duration?: string;
  description?: string;
  isActive: boolean;
  order: number;
}

const empty: Omit<PricingItem, "_id"> = { treatmentName: "", category: "", price: "Consultation Required", duration: "", description: "", isActive: true, order: 0 };
const categories = ["Injectables", "Dermal Fillers", "Skin Treatments", "Laser & Light", "Body"];

export default function AdminPricingPage() {
  const router = useRouter();
  const [items, setItems] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PricingItem | null>(null);
  const [form, setForm] = useState<Omit<PricingItem, "_id">>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/pricing");
    const d = await r.json();
    setItems(d.pricing || []);
    setLoading(false);
  };

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (item: PricingItem) => { setEditing(item); setForm({ treatmentName: item.treatmentName, category: item.category, price: item.price, duration: item.duration || "", description: item.description || "", isActive: item.isActive, order: item.order }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/admin/pricing?id=${editing._id}` : "/api/admin/pricing";
    const r = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (r.ok) { toast.success(editing ? "Updated" : "Created"); setShowForm(false); load(); }
    else toast.error("Save failed");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const r = await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); load(); }
  };

  const grouped = categories.reduce<Record<string, PricingItem[]>>((acc, cat) => {
    const i = items.filter((p) => p.category === cat);
    if (i.length) acc[cat] = i;
    return acc;
  }, {});

  return (
    <AdminLayout title="Pricing" description="Manage treatment prices">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{items.length} pricing items</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2"><Plus size={15} /> Add Pricing</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} className="admin-card p-0 overflow-hidden">
              <div className="px-5 py-3 bg-gold/5 border-b border-gold/10"><h3 className="font-playfair text-base text-gold">{cat}</h3></div>
              <table className="admin-table">
                <thead><tr><th>Treatment</th><th>Duration</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {catItems.map((item) => (
                    <tr key={item._id}>
                      <td className="text-warm-beige">{item.treatmentName}</td>
                      <td className="text-soft-taupe/70 text-xs">{item.duration || "—"}</td>
                      <td className="text-gold font-playfair">{item.price}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded-full border ${item.isActive ? "text-green-400 border-green-500/30 bg-green-900/20" : "text-red-400 border-red-500/30 bg-red-900/20"}`}>{item.isActive ? "Active" : "Hidden"}</span></td>
                      <td><div className="flex gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold transition-all"><Edit size={13} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-soft-taupe admin-card">No pricing items yet.</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-md h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit Pricing" : "Add Pricing"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="admin-label">Treatment Name *</label><input value={form.treatmentName} onChange={(e) => setForm({ ...form, treatmentName: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Category *</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input"><option value="">Select</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="admin-label">Price *</label><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input" placeholder="From $200" /></div>
              <div><label className="admin-label">Duration</label><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="admin-input" placeholder="30-45 min" /></div>
              <div><label className="admin-label">Notes</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="admin-label">Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="admin-input" /></div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Active</span></label>
              <button onClick={handleSave} disabled={saving} className="admin-btn-primary w-full flex items-center justify-center gap-2 py-3">
                {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Check size={15} /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
