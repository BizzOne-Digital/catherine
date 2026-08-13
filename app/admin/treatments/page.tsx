"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
  ChevronUp,
  ChevronDown,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface Category {
  _id: string;
  title: string;
  slug: string;
}

type SectionType = "hero" | "about" | "benefits" | "ideal_for" | "recovery" | "custom";

interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  image: string;
  items: string[];
  order: number;
}

interface Treatment {
  _id: string;
  name: string;
  slug: string;
  categoryId: string | { _id: string; title: string; slug: string };
  categorySlug: string;
  shortDescription: string;
  price: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  bookingUrl?: string;
  hidePrice?: boolean;
  popular: boolean;
  isActive: boolean;
  order: number;
  sections?: PageSection[];
}

const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "hero", label: "Hero" },
  { value: "about", label: "About" },
  { value: "benefits", label: "Benefits (checklist)" },
  { value: "ideal_for", label: "Ideal For" },
  { value: "recovery", label: "Recovery" },
  { value: "custom", label: "Custom section" },
];

const emptyForm = {
  name: "",
  slug: "",
  categoryId: "",
  shortDescription: "",
  price: "",
  image: "",
  beforeImage: "",
  afterImage: "",
  bookingUrl: "",
  hidePrice: false,
  popular: false,
  isActive: true,
  order: 0,
  sections: [] as PageSection[],
};

function newSection(type: SectionType = "custom", order = 0): PageSection {
  const titles: Record<SectionType, string> = {
    hero: "",
    about: "About This Treatment",
    benefits: "Benefits",
    ideal_for: "Ideal For",
    recovery: "Recovery",
    custom: "Section title",
  };
  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title: titles[type],
    content: "",
    image: "",
    items: type === "benefits" ? [""] : [],
    order,
  };
}

function categoryIdOf(t: Treatment) {
  return typeof t.categoryId === "object" ? t.categoryId._id : t.categoryId;
}

function categoryTitleOf(t: Treatment, categories: Category[]) {
  if (typeof t.categoryId === "object" && t.categoryId?.title) return t.categoryId.title;
  return categories.find((c) => c._id === categoryIdOf(t))?.title || t.categorySlug;
}

export default function AdminTreatmentsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const [cRes, tRes] = await Promise.all([
      fetch("/api/admin/categories"),
      fetch("/api/admin/treatments"),
    ]);
    const cData = await cRes.json();
    const tData = await tRes.json();
    setCategories(cData.categories || []);
    setTreatments(tData.treatments || []);
    setLoading(false);
  };

  const openNew = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      categoryId: filterCategory !== "all" ? filterCategory : categories[0]?._id || "",
      sections: [
        newSection("hero", 0),
        newSection("about", 1),
        newSection("benefits", 2),
        newSection("ideal_for", 3),
        newSection("recovery", 4),
      ],
    });
    setShowForm(true);
  };

  const openEdit = (t: Treatment) => {
    setEditing(t);
    const sections =
      t.sections && t.sections.length > 0
        ? [...t.sections].sort((a, b) => a.order - b.order)
        : [
            {
              ...newSection("hero", 0),
              title: t.name,
              content: t.shortDescription || "",
              image: t.image || "",
            },
            newSection("about", 1),
            newSection("benefits", 2),
            newSection("ideal_for", 3),
            newSection("recovery", 4),
          ];
    setForm({
      name: t.name,
      slug: t.slug,
      categoryId: categoryIdOf(t),
      shortDescription: t.shortDescription || "",
      price: t.price,
      image: t.image || "",
      beforeImage: t.beforeImage || "",
      afterImage: t.afterImage || "",
      bookingUrl: t.bookingUrl || "",
      hidePrice: !!t.hidePrice,
      popular: t.popular,
      isActive: t.isActive,
      order: t.order,
      sections,
    });
    setShowForm(true);
  };

  const updateSection = (id: string, patch: Partial<PageSection>) => {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    setForm((f) => {
      const next = [...f.sections];
      const j = index + dir;
      if (j < 0 || j >= next.length) return f;
      [next[index], next[j]] = [next[j], next[index]];
      return {
        ...f,
        sections: next.map((s, i) => ({ ...s, order: i })),
      };
    });
  };

  const removeSection = (id: string) => {
    setForm((f) => ({
      ...f,
      sections: f.sections
        .filter((s) => s.id !== id)
        .map((s, i) => ({ ...s, order: i })),
    }));
  };

  const addSection = () => {
    setForm((f) => ({
      ...f,
      sections: [...f.sections, newSection("custom", f.sections.length)],
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price.trim() || !form.categoryId) {
      toast.error("Name, price, and category are required");
      return;
    }
    setSaving(true);
    let sections = form.sections.map((s, i) => ({
      ...s,
      order: i,
      items: (s.items || []).map((x) => x.trim()).filter(Boolean),
    }));

    // Keep detail-page hero intro in sync with short description (cards + hero)
    const intro = form.shortDescription.trim();
    const heroIdx = sections.findIndex((s) => s.type === "hero");
    if (heroIdx >= 0) {
      const hero = sections[heroIdx];
      sections[heroIdx] = {
        ...hero,
        title: hero.title?.trim() || form.name.trim(),
        content: intro || hero.content || "",
        image: hero.image || form.image || "",
      };
    } else if (intro || form.image) {
      sections = [
        {
          id: `sec-${Date.now()}-hero`,
          type: "hero",
          title: form.name.trim(),
          content: intro,
          image: form.image || "",
          items: [],
          order: 0,
        },
        ...sections.map((s, i) => ({ ...s, order: i + 1 })),
      ];
    }

    const heroImg = sections.find((s) => s.type === "hero")?.image;
    const image = form.image || heroImg || "";
    const payload = { ...form, image, sections, shortDescription: intro };
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...payload, id: editing._id } : payload;
    const r = await fetch("/api/admin/treatments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      toast.success(editing ? "Treatment updated — live on site" : "Treatment created");
      setShowForm(false);
      load();
    } else {
      const e = await r.json();
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (t: Treatment) => {
    if (!confirm(`Delete "${t.name}"?`)) return;
    const r = await fetch(`/api/admin/treatments?id=${t._id}`, { method: "DELETE" });
    if (r.ok) {
      toast.success("Treatment deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  };

  const filtered =
    filterCategory === "all"
      ? treatments
      : treatments.filter((t) => categoryIdOf(t) === filterCategory);

  return (
    <AdminLayout
      title="Treatments"
      description="Edit each section & image — changes show on the public site"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          className="admin-input max-w-xs"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        <button
          onClick={openNew}
          disabled={!categories.length}
          className="admin-btn-primary inline-flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={14} /> Add Treatment
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t._id}
              className="admin-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                {t.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt=""
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-playfair text-lg text-warm-beige">{t.name}</h3>
                    {t.popular && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] uppercase text-gold">
                        Popular
                      </span>
                    )}
                    {!t.isActive && (
                      <span className="rounded-full border border-gold/20 px-2 py-0.5 text-[10px] uppercase text-soft-taupe">
                        Hidden
                      </span>
                    )}
                    <span className="rounded-full border border-gold/20 px-2 py-0.5 text-[10px] text-soft-taupe">
                      {(t.sections || []).length} sections
                    </span>
                  </div>
                  <p className="mt-1 font-inter text-xs text-soft-taupe">
                    {categoryTitleOf(t, categories)} · /services/{t.categorySlug}/{t.slug}
                  </p>
                  <p className="mt-1 font-playfair text-base text-gold">{t.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(t)}
                  className="admin-btn border border-gold/20 text-gold hover:bg-gold/10"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(t)}
                  className="admin-btn border border-red-500/30 text-red-300 hover:bg-red-900/30"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-12 text-center font-inter text-sm text-soft-taupe">
              No treatments found. Add one under a category.
            </p>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-luxury-black/80 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-gold/10 bg-soft-black">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold/10 bg-soft-black/95 px-6 py-5">
              <h2 className="font-playfair text-xl text-warm-beige">
                {editing ? "Edit Treatment" : "New Treatment"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-soft-taupe hover:text-gold">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6 px-6 py-6">
              <div className="space-y-4 rounded-xl border border-gold/10 bg-luxury-black/40 p-4">
                <p className="font-inter text-xs uppercase tracking-wider text-gold">Basic info</p>
                <div>
                  <label className="admin-label">Category *</label>
                  <select
                    className="admin-input"
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  >
                    <option value="">Select category...</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Name *</label>
                  <input
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label">Price *</label>
                  <input
                    className="admin-input"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="From $250"
                  />
                </div>
                <div>
                  <label className="admin-label">
                    Intro text (cards + detail hero)
                  </label>
                  <textarea
                    className="admin-input min-h-[70px]"
                    value={form.shortDescription}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm((f) => ({
                        ...f,
                        shortDescription: value,
                        sections: f.sections.map((s) =>
                          s.type === "hero" ? { ...s, content: value } : s
                        ),
                      }));
                    }}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="admin-label">Slug</label>
                    <input
                      className="admin-input"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      placeholder="auto-from-name"
                    />
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
                </div>
                <ImageUploadField
                  label="Listing / card image"
                  folder="misc"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUploadField
                    label="Before image"
                    folder="misc"
                    value={form.beforeImage}
                    onChange={(url) => setForm({ ...form, beforeImage: url })}
                  />
                  <ImageUploadField
                    label="After image"
                    folder="misc"
                    value={form.afterImage}
                    onChange={(url) => setForm({ ...form, afterImage: url })}
                  />
                </div>
                <div>
                  <label className="admin-label">Fresha / booking URL</label>
                  <input
                    className="admin-input"
                    value={form.bookingUrl}
                    onChange={(e) => setForm({ ...form, bookingUrl: e.target.value })}
                    placeholder="https://www.fresha.com/..."
                  />
                </div>
                <label className="flex items-center gap-2 font-inter text-sm text-warm-beige">
                  <input
                    type="checkbox"
                    checked={form.hidePrice}
                    onChange={(e) => setForm({ ...form, hidePrice: e.target.checked })}
                  />
                  Hide price on service pages
                </label>
                <label className="flex items-center gap-2 font-inter text-sm text-warm-beige">
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  />
                  Popular (shows on homepage)
                </label>
                <label className="flex items-center gap-2 font-inter text-sm text-warm-beige">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  />
                  Active (visible on site)
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-inter text-xs uppercase tracking-wider text-gold">
                      Page sections
                    </p>
                    <p className="mt-1 font-inter text-xs text-soft-taupe">
                      Each section shows on the public page in order — with its own text &amp; image
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addSection}
                    className="admin-btn border border-gold/20 text-gold hover:bg-gold/10 inline-flex items-center gap-1"
                  >
                    <Plus size={14} /> Section
                  </button>
                </div>

                {form.sections.map((sec, index) => (
                  <div
                    key={sec.id}
                    className="rounded-xl border border-gold/15 bg-luxury-black/30 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-soft-taupe">
                        <GripVertical size={16} />
                        <span className="font-inter text-xs uppercase tracking-wider text-gold">
                          Section {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveSection(index, -1)}
                          disabled={index === 0}
                          className="admin-btn border border-gold/20 p-1.5 disabled:opacity-30"
                          title="Move up"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, 1)}
                          disabled={index === form.sections.length - 1}
                          className="admin-btn border border-gold/20 p-1.5 disabled:opacity-30"
                          title="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(sec.id)}
                          className="admin-btn border border-red-500/30 text-red-300 p-1.5"
                          title="Remove section"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="admin-label">Type</label>
                      <select
                        className="admin-input"
                        value={sec.type}
                        onChange={(e) =>
                          updateSection(sec.id, { type: e.target.value as SectionType })
                        }
                      >
                        {SECTION_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="admin-label">Section title</label>
                      <input
                        className="admin-input"
                        value={sec.title}
                        onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                        placeholder={sec.type === "hero" ? "Uses treatment name if empty" : ""}
                      />
                    </div>

                    <div>
                      <label className="admin-label">
                        {sec.type === "benefits" ? "Intro text (optional)" : "Content"}
                      </label>
                      <textarea
                        className="admin-input min-h-[100px]"
                        value={sec.content}
                        onChange={(e) => {
                          const value = e.target.value;
                          setForm((f) => ({
                            ...f,
                            shortDescription:
                              sec.type === "hero" ? value : f.shortDescription,
                            sections: f.sections.map((s) =>
                              s.id === sec.id ? { ...s, content: value } : s
                            ),
                          }));
                        }}
                        placeholder="Paragraphs — blank line between paragraphs"
                      />
                    </div>

                    {sec.type === "benefits" && (
                      <div>
                        <label className="admin-label">Benefit items (one per line)</label>
                        <textarea
                          className="admin-input min-h-[120px]"
                          value={(sec.items || []).join("\n")}
                          onChange={(e) =>
                            updateSection(sec.id, {
                              items: e.target.value.split("\n"),
                            })
                          }
                          placeholder={"Smooths forehead lines\nNatural-looking results"}
                        />
                      </div>
                    )}

                    <ImageUploadField
                      label="Section image"
                      folder="misc"
                      value={sec.image}
                      onChange={(url) => updateSection(sec.id, { image: url })}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="admin-btn-primary w-full disabled:opacity-50 sticky bottom-4"
              >
                {saving ? "Saving..." : "Save Treatment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
