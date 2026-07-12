"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Loader2, X, Check } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
}

const empty: Omit<FAQ, "_id"> = { question: "", answer: "", category: "General", order: 0, isActive: true };

export default function AdminFAQsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState<Omit<FAQ, "_id">>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/faqs");
    const d = await r.json();
    setFaqs(d.faqs || []);
    setLoading(false);
  };

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (f: FAQ) => { setEditing(f); setForm({ question: f.question, answer: f.answer, category: f.category || "General", order: f.order, isActive: f.isActive }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/admin/faqs?id=${editing._id}` : "/api/admin/faqs";
    const r = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (r.ok) { toast.success(editing ? "Updated" : "Created"); setShowForm(false); load(); }
    else toast.error("Save failed");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const r = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Deleted"); load(); }
  };

  return (
    <AdminLayout title="FAQs" description="Manage frequently asked questions">
      <div className="flex justify-between items-center mb-6">
        <span className="font-inter text-sm text-soft-taupe">{faqs.length} FAQs</span>
        <button onClick={openNew} className="admin-btn-primary flex items-center gap-2"><Plus size={15} /> Add FAQ</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq._id} className="admin-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-inter text-xs text-soft-taupe/50">#{i + 1}</span>
                    {faq.category && <span className="text-[10px] px-2 py-0.5 bg-gold/5 text-gold/60 border border-gold/10 rounded-full">{faq.category}</span>}
                    {!faq.isActive && <span className="text-[10px] px-2 py-0.5 bg-red-900/20 text-red-400 border border-red-500/20 rounded-full">Hidden</span>}
                  </div>
                  <p className="font-playfair text-base text-warm-beige">{faq.question}</p>
                  <p className="font-inter text-sm text-soft-taupe mt-1 line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(faq)} className="p-1.5 rounded border border-gold/20 text-soft-taupe hover:text-gold transition-all"><Edit size={13} /></button>
                  <button onClick={() => handleDelete(faq._id)} className="p-1.5 rounded border border-red-500/20 text-soft-taupe hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && <div className="admin-card text-center py-12 text-soft-taupe">No FAQs yet.</div>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-lg h-full bg-soft-black border-l border-gold/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-soft-black/95 z-10">
              <h2 className="font-playfair text-xl text-warm-beige">{editing ? "Edit FAQ" : "New FAQ"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-soft-taupe hover:text-gold"><X size={14} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="admin-label">Question *</label><input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Answer *</label><textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={6} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input" placeholder="General" /></div>
              <div><label className="admin-label">Display Order</label><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="admin-input" /></div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /><span className="font-inter text-sm text-soft-taupe">Active (visible on site)</span></label>
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
