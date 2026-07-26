"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  isFeatured: boolean;
  order: number;
}

const empty: Omit<GalleryItem, "_id"> = { title: "", category: "", image: "", description: "", isFeatured: false, order: 0 };
const categories = ["Botox", "Fillers", "Skin", "IPL", "Body", "Laser", "Before & After"];

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Omit<GalleryItem, "_id">>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/gallery");
    const d = await r.json();
    setItems(d.items || []);
    setLoading(false);
  };

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm({ title: item.title, category: item.category, image: item.image, description: item.description || "", isFeatured: item.isFeatured, order: item.order }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing._id } : form;
    const r = await fetch("/api/admin/gallery", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      toast.success(editing ? "Updated" : "Created");
      setShowForm(false);
      load();
    } else {
      const e = await r.json().catch(() => ({}));
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const r = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); load(); }
  };

  return (
    <AdminLayout title="Gallery" description="Manage before & after photos and gallery images">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{items.length} items</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2"><Plus size={15} /> Add Image</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="admin-card p-0 overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td><p className="font-medium text-warm-beige">{item.title}</p>{item.description && <p className="text-xs text-soft-taupe/60 mt-0.5">{item.description.slice(0, 50)}</p>}</td>
                  <td><span className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">{item.category}</span></td>
                  <td>{item.isFeatured ? <span className="text-xs text-green-400">Yes</span> : <span className="text-xs text-soft-taupe/40">No</span>}</td>
                  <td><div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold transition-all"><Edit size={13} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-soft-taupe">No gallery items yet.</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-md h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit Item" : "Add Gallery Item"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="admin-label">Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Category *</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input"><option value="">Select</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <ImageUploadField
                label="Image"
                folder="gallery"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
              <div><label className="admin-label">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="admin-input" /></div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Featured on homepage</span></label>
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
