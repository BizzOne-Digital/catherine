"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Category {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  treatmentCount?: number;
}

interface Treatment {
  _id: string;
  name: string;
  slug: string;
  price: string;
  shortDescription?: string;
  popular?: boolean;
  isActive?: boolean;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  icon: "Sparkles",
  order: 0,
  isActive: true,
};

const iconOptions = ["Sparkles", "Heart", "Droplets", "Activity", "Zap", "ScanFace", "Flower2"];

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [categoryTreatments, setCategoryTreatments] = useState<Treatment[]>([]);
  const [loadingTreatments, setLoadingTreatments] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/categories");
    const d = await r.json();
    setCategories(d.categories || []);
    setLoading(false);
  };

  const loadCategoryTreatments = async (categoryId: string) => {
    setLoadingTreatments(true);
    try {
      const r = await fetch(`/api/admin/treatments?categoryId=${categoryId}`);
      const d = await r.json();
      setCategoryTreatments(d.treatments || []);
    } catch {
      setCategoryTreatments([]);
    } finally {
      setLoadingTreatments(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setCategoryTreatments([]);
    setShowForm(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({
      title: c.title,
      slug: c.slug,
      description: c.description,
      icon: c.icon || "Sparkles",
      order: c.order,
      isActive: c.isActive,
    });
    setShowForm(true);
    loadCategoryTreatments(c._id);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing._id } : form;
    const r = await fetch("/api/admin/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      toast.success(editing ? "Category updated" : "Category created");
      setShowForm(false);
      load();
    } else {
      const e = await r.json();
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (c: Category) => {
    const msg =
      (c.treatmentCount || 0) > 0
        ? `Delete "${c.title}" and its ${c.treatmentCount} treatment(s)?`
        : `Delete "${c.title}"?`;
    if (!confirm(msg)) return;
    const r = await fetch(`/api/admin/categories?id=${c._id}`, { method: "DELETE" });
    if (r.ok) {
      toast.success("Category deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  };

  const handleDeleteTreatment = async (t: Treatment) => {
    if (!confirm(`Delete treatment "${t.name}"?`)) return;
    setDeletingId(t._id);
    const r = await fetch(`/api/admin/treatments?id=${t._id}`, { method: "DELETE" });
    if (r.ok) {
      toast.success("Treatment deleted");
      setCategoryTreatments((prev) => prev.filter((item) => item._id !== t._id));
      load();
    } else {
      toast.error("Failed to delete treatment");
    }
    setDeletingId(null);
  };

  return (
    <AdminLayout title="Categories" description="Manage service categories">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="font-inter text-sm text-soft-taupe">
          {categories.length} categor{categories.length === 1 ? "y" : "ies"}
        </p>
        <button onClick={openNew} className="admin-btn-primary inline-flex items-center gap-2">
          <Plus size={14} /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((c) => (
            <div
              key={c._id}
              className="admin-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-playfair text-lg text-warm-beige">{c.title}</h3>
                  {!c.isActive && (
                    <span className="rounded-full border border-gold/20 px-2 py-0.5 text-[10px] uppercase text-soft-taupe">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-1 font-inter text-xs text-soft-taupe">
                  /{c.slug} · {c.treatmentCount || 0} treatments · order {c.order}
                </p>
                {c.description && (
                  <p className="mt-2 max-w-2xl font-inter text-sm text-warm-beige/70 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(c)}
                  className="admin-btn border border-gold/20 text-gold hover:bg-gold/10"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(c)}
                  className="admin-btn border border-red-500/30 text-red-300 hover:bg-red-900/30"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="py-12 text-center font-inter text-sm text-soft-taupe">
              No categories yet. Add one or run <code className="text-gold">npm run seed</code>.
            </p>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-luxury-black/80 backdrop-blur-sm">
          <div className="h-full w-full max-w-lg overflow-y-auto border-l border-gold/10 bg-soft-black">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold/10 bg-soft-black/95 px-6 py-5">
              <h2 className="font-playfair text-xl text-warm-beige">
                {editing ? "Edit Category" : "New Category"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-soft-taupe hover:text-gold">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 px-6 py-6">
              <div>
                <label className="admin-label">Title *</label>
                <input
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="admin-label">Slug (optional)</label>
                <input
                  className="admin-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-from-title"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-input min-h-[100px]"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="admin-label">Icon</label>
                <select
                  className="admin-input"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>
              <label className="flex items-center gap-2 font-inter text-sm text-warm-beige">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Active (visible on site)
              </label>

              {editing && (
                <div className="border-t border-gold/10 pt-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="font-playfair text-lg text-warm-beige">
                      Treatments in this category
                    </h3>
                    <span className="font-inter text-xs text-soft-taupe">
                      {categoryTreatments.length}
                    </span>
                  </div>

                  {loadingTreatments ? (
                    <div className="flex justify-center py-8">
                      <Loader2 size={20} className="animate-spin text-gold" />
                    </div>
                  ) : categoryTreatments.length === 0 ? (
                    <p className="rounded-lg border border-gold/10 bg-luxury-black/40 px-4 py-5 text-center font-inter text-sm text-soft-taupe">
                      No treatments in this category yet.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {categoryTreatments.map((t) => (
                        <li
                          key={t._id}
                          className="flex items-start justify-between gap-3 rounded-lg border border-gold/15 bg-luxury-black/40 px-3 py-3"
                        >
                          <div className="min-w-0">
                            <p className="font-inter text-sm font-medium text-warm-beige">
                              {t.name}
                            </p>
                            <p className="mt-0.5 font-playfair text-sm text-gold">{t.price}</p>
                            {t.shortDescription && (
                              <p className="mt-1 line-clamp-2 font-inter text-xs text-soft-taupe">
                                {t.shortDescription}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteTreatment(t)}
                            disabled={deletingId === t._id}
                            className="admin-btn shrink-0 border border-red-500/30 text-red-300 hover:bg-red-900/30 disabled:opacity-50"
                            aria-label={`Delete ${t.name}`}
                            title="Delete treatment"
                          >
                            {deletingId === t._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="mt-3 font-inter text-xs text-soft-taupe">
                    To add or edit treatments, use{" "}
                    <a href="/admin/treatments" className="text-gold hover:underline">
                      Admin → Treatments
                    </a>
                    .
                  </p>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className="admin-btn-primary w-full disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
