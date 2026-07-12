"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  publishedAt?: string;
  createdAt: string;
}

const empty: Omit<BlogPost, "_id" | "createdAt"> = { title: "", slug: "", category: "", excerpt: "", content: "", status: "draft" };
const categories = ["Education", "Tips & Advice", "Treatments", "Skincare", "Philosophy", "News"];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Omit<BlogPost, "_id" | "createdAt">>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/blog");
    const d = await r.json();
    setPosts(d.posts || []);
    setLoading(false);
  };

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm({ title: p.title, slug: p.slug, category: p.category, excerpt: p.excerpt, content: p.content, status: p.status, publishedAt: p.publishedAt }); setShowForm(true); };

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/admin/blog?id=${editing._id}` : "/api/admin/blog";
    const r = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, publishedAt: form.status === "published" && !form.publishedAt ? new Date().toISOString() : form.publishedAt }) });
    if (r.ok) { toast.success(editing ? "Updated" : "Created"); setShowForm(false); load(); }
    else toast.error("Save failed");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const r = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); load(); }
  };

  return (
    <AdminLayout title="Blog Posts" description="Manage journal articles and educational content">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{posts.length} posts</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2"><Plus size={15} /> New Post</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="admin-card p-0 overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id}>
                  <td><p className="font-medium text-warm-beige">{p.title}</p><p className="text-xs text-soft-taupe/60 mt-0.5">/blog/{p.slug}</p></td>
                  <td><span className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">{p.category}</span></td>
                  <td><span className={`text-xs px-2 py-0.5 rounded-full border ${p.status === "published" ? "text-green-400 border-green-500/30 bg-green-900/20" : "text-yellow-400 border-yellow-500/30 bg-yellow-900/20"}`}>{p.status}</span></td>
                  <td className="text-soft-taupe/70 text-xs">{p.publishedAt ? format(new Date(p.publishedAt), "MMM d, yyyy") : "—"}</td>
                  <td><div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold transition-all"><Edit size={13} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <div className="text-center py-12 text-soft-taupe">No posts yet.</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-2xl h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} className="admin-input" />
              </div>
              <div><label className="admin-label">Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input"><option value="">Select</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="admin-label">Excerpt *</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Content *</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="admin-input resize-none font-mono text-xs" /></div>
              <div><label className="admin-label">Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="admin-input"><option value="draft">Draft</option><option value="published">Published</option></select></div>
              <button onClick={handleSave} disabled={saving} className="admin-btn-primary w-full flex items-center justify-center gap-2 py-3">
                {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Check size={15} /> {editing ? "Update Post" : "Create Post"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
