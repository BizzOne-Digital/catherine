"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Loader2,
  X,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploadField from "@/components/admin/ImageUploadField";

type SectionType = "hero" | "text" | "image_text" | "cards" | "cta" | "custom";

interface PageSection {
  id: string;
  key: string;
  type: SectionType;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
}

interface SitePageListItem {
  _id: string;
  slug: string;
  title: string;
  path: string;
  sectionCount: number;
  updatedAt?: string;
}

interface SitePage {
  _id?: string;
  slug: string;
  title: string;
  path: string;
  sections: PageSection[];
}

const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "hero", label: "Hero" },
  { value: "text", label: "Text" },
  { value: "image_text", label: "Image + Text" },
  { value: "cards", label: "Cards / list" },
  { value: "cta", label: "CTA" },
  { value: "custom", label: "Custom" },
];

function newSection(order = 0): PageSection {
  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    key: `section_${order + 1}`,
    type: "custom",
    title: "",
    subtitle: "",
    content: "",
    image: "",
    items: [],
    ctaLabel: "",
    ctaHref: "",
    order,
  };
}

export default function AdminPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<SitePageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SitePage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/pages");
    const d = await r.json();
    setPages(d.pages || []);
    setLoading(false);
  };

  const openEdit = async (slug: string) => {
    const r = await fetch(`/api/admin/pages?slug=${encodeURIComponent(slug)}`);
    const d = await r.json();
    if (!r.ok || !d.page) {
      toast.error("Failed to load page");
      return;
    }
    setEditing({
      ...d.page,
      sections: (d.page.sections || []).slice().sort((a: PageSection, b: PageSection) => a.order - b.order),
    });
  };

  const updateSection = (id: string, patch: Partial<PageSection>) => {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    if (!editing) return;
    const next = [...editing.sections];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setEditing({
      ...editing,
      sections: next.map((s, i) => ({ ...s, order: i })),
    });
  };

  const removeSection = (id: string) => {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections
        .filter((s) => s.id !== id)
        .map((s, i) => ({ ...s, order: i })),
    });
  };

  const addSection = () => {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: [...editing.sections, newSection(editing.sections.length)],
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const sections = editing.sections.map((s, i) => ({
      ...s,
      order: i,
      items: (s.items || []).map((x) => x.trim()).filter(Boolean),
    }));
    const r = await fetch("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: editing.slug,
        title: editing.title,
        path: editing.path,
        sections,
      }),
    });
    if (r.ok) {
      toast.success("Page saved — live on site");
      setEditing(null);
      load();
    } else {
      const e = await r.json();
      toast.error(e.error || "Save failed");
    }
    setSaving(false);
  };

  return (
    <AdminLayout
      title="Pages"
      description="Edit every page section-by-section — text & images"
    >
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((p) => (
            <div
              key={p.slug}
              className="admin-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-playfair text-lg text-warm-beige">{p.title}</h3>
                <p className="mt-1 font-inter text-xs text-soft-taupe">
                  {p.path} · {p.sectionCount} sections · slug: {p.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={p.path}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-btn border border-gold/20 text-soft-taupe hover:text-gold"
                  title="View page"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => openEdit(p.slug)}
                  className="admin-btn border border-gold/20 text-gold hover:bg-gold/10"
                >
                  <Edit size={14} />
                </button>
              </div>
            </div>
          ))}
          {pages.length === 0 && (
            <p className="py-12 text-center font-inter text-sm text-soft-taupe">
              No pages seeded yet. Run <code className="text-gold">npm run seed</code> or{" "}
              <code className="text-gold">node scripts/seed-pages.mjs</code>.
            </p>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-luxury-black/80 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-gold/10 bg-soft-black">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold/10 bg-soft-black/95 px-6 py-5">
              <div>
                <h2 className="font-playfair text-xl text-warm-beige">{editing.title}</h2>
                <p className="font-inter text-xs text-soft-taupe">{editing.path}</p>
              </div>
              <button onClick={() => setEditing(null)} className="text-soft-taupe hover:text-gold">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="space-y-3 rounded-xl border border-gold/10 bg-luxury-black/40 p-4">
                <div>
                  <label className="admin-label">Page title (admin only)</label>
                  <input
                    className="admin-input"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label">Public path</label>
                  <input
                    className="admin-input"
                    value={editing.path}
                    onChange={(e) => setEditing({ ...editing, path: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-inter text-xs uppercase tracking-wider text-gold">
                    Sections
                  </p>
                  <p className="mt-1 font-inter text-xs text-soft-taupe">
                    Keep section <strong className="text-warm-beige">key</strong> stable — frontend maps by key
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

              {editing.sections.map((sec, index) => (
                <div
                  key={sec.id}
                  className="space-y-3 rounded-xl border border-gold/15 bg-luxury-black/30 p-4"
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
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(index, 1)}
                        disabled={index === editing.sections.length - 1}
                        className="admin-btn border border-gold/20 p-1.5 disabled:opacity-30"
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(sec.id)}
                        className="admin-btn border border-red-500/30 p-1.5 text-red-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="admin-label">Key (do not rename lightly)</label>
                      <input
                        className="admin-input"
                        value={sec.key}
                        onChange={(e) => updateSection(sec.id, { key: e.target.value })}
                      />
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
                  </div>

                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      className="admin-input"
                      value={sec.title}
                      onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Subtitle / eyebrow</label>
                    <input
                      className="admin-input"
                      value={sec.subtitle}
                      onChange={(e) => updateSection(sec.id, { subtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Content</label>
                    <textarea
                      className="admin-input min-h-[100px]"
                      value={sec.content}
                      onChange={(e) => updateSection(sec.id, { content: e.target.value })}
                      placeholder="Blank line between paragraphs"
                    />
                  </div>

                  {(sec.type === "cards" || sec.items?.length > 0) && (
                    <div>
                      <label className="admin-label">
                        Items (one per line — cards: Title|Description|/href)
                      </label>
                      <textarea
                        className="admin-input min-h-[120px]"
                        value={(sec.items || []).join("\n")}
                        onChange={(e) =>
                          updateSection(sec.id, { items: e.target.value.split("\n") })
                        }
                      />
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="admin-label">CTA label</label>
                      <input
                        className="admin-input"
                        value={sec.ctaLabel}
                        onChange={(e) => updateSection(sec.id, { ctaLabel: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="admin-label">CTA link</label>
                      <input
                        className="admin-input"
                        value={sec.ctaHref}
                        onChange={(e) => updateSection(sec.id, { ctaHref: e.target.value })}
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Section image"
                    folder="pages"
                    value={sec.image}
                    onChange={(url) => updateSection(sec.id, { image: url })}
                  />
                </div>
              ))}

              <button
                onClick={handleSave}
                disabled={saving}
                className="admin-btn-primary sticky bottom-4 w-full disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Page"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
