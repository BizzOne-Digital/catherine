"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface Product {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  ingredients?: string;
  howToUse?: string;
  price: number;
  salePrice?: number;
  image?: string;
  stockStatus: string;
  isActive: boolean;
  isFeatured: boolean;
}

const emptyProduct: Omit<Product, "_id"> = {
  name: "",
  category: "",
  shortDescription: "",
  description: "",
  ingredients: "",
  howToUse: "",
  price: 0,
  image: "",
  stockStatus: "in_stock",
  isActive: true,
  isFeatured: false,
};

const categories = [
  "Cebelia",
  "FORE Essentials",
  "Naturmed",
  "Serums",
  "Moisturizers",
  "Toners",
  "Treatments",
  "Sun Care",
  "Eye Care",
  "Lip Care",
  "Hair & Scalp",
];
const stockOptions = [
  { value: "in_stock", label: "In Stock" },
  { value: "limited", label: "Limited Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
];

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "_id">>(emptyProduct);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/products");
    const d = await r.json();
    setProducts(d.products || []);
    setLoading(false);
  };

  const openNew = () => { setEditing(null); setForm(emptyProduct); setShowForm(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription,
      description: p.description,
      ingredients: p.ingredients || "",
      howToUse: p.howToUse || "",
      price: p.price,
      salePrice: p.salePrice,
      image: p.image || "",
      stockStatus: p.stockStatus,
      isActive: p.isActive,
      isFeatured: p.isFeatured,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing._id } : form;
    const r = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      toast.success(editing ? "Updated" : "Created");
      setShowForm(false);
      loadProducts();
    } else {
      const e = await r.json();
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const r = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); loadProducts(); }
  };

  const stockColor = (s: string) => s === "in_stock" ? "text-green-400 border-green-500/30 bg-green-900/20" : s === "limited" ? "text-yellow-400 border-yellow-500/30 bg-yellow-900/20" : "text-red-400 border-red-500/30 bg-red-900/20";

  return (
    <AdminLayout title="Products" description="Manage your skincare shop">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{products.length} products</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2"><Plus size={15} /> Add Product</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div>
      ) : (
        <div className="admin-card p-0 overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td><p className="font-medium text-warm-beige">{p.name}</p><p className="text-xs text-soft-taupe/60 mt-0.5">{p.shortDescription?.slice(0, 40)}...</p></td>
                  <td><span className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">{p.category}</span></td>
                  <td><span className="text-gold font-playfair">${p.price}</span>{p.salePrice && <span className="text-xs text-soft-taupe/50 line-through ml-1">${p.salePrice}</span>}</td>
                  <td><span className={`text-xs px-2 py-0.5 rounded-full border ${stockColor(p.stockStatus)}`}>{stockOptions.find((s) => s.value === p.stockStatus)?.label}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold hover:border-gold transition-all"><Edit size={13} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="text-center py-12 text-soft-taupe">No products yet.</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-xl h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="admin-label">Name *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Category *</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input"><option value="">Select</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="admin-label">Short Description</label><textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Full Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Ingredients</label><textarea value={form.ingredients || ""} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div><label className="admin-label">How to Use</label><textarea value={form.howToUse || ""} onChange={(e) => setForm({ ...form, howToUse: e.target.value })} rows={2} className="admin-input resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="admin-label">Price ($) *</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="admin-input" /></div>
                <div><label className="admin-label">Sale Price ($)</label><input type="number" value={form.salePrice || ""} onChange={(e) => setForm({ ...form, salePrice: e.target.value ? Number(e.target.value) : undefined })} className="admin-input" /></div>
              </div>
              <ImageUploadField
                label="Product image"
                folder="products"
                value={form.image || ""}
                onChange={(url) => setForm({ ...form, image: url })}
              />
              <div><label className="admin-label">Stock Status</label><select value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value })} className="admin-input">{stockOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Active</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Featured</span></label>
              </div>
              <button onClick={handleSave} disabled={saving} className="admin-btn-primary w-full flex items-center justify-center gap-2 py-3">
                {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Check size={15} /> {editing ? "Update" : "Create"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
