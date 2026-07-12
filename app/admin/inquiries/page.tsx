"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageSquare, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  interestedService?: string;
  message: string;
  status: string;
  createdAt: string;
}

const statuses = ["new", "read", "replied", "closed"];
const statusColors: Record<string, string> = {
  new: "text-blue-400 border-blue-500/30 bg-blue-900/20",
  read: "text-yellow-400 border-yellow-500/30 bg-yellow-900/20",
  replied: "text-green-400 border-green-500/30 bg-green-900/20",
  closed: "text-soft-taupe/60 border-soft-taupe/20 bg-soft-taupe/5",
};

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/inquiries");
    const d = await r.json();
    setInquiries(d.inquiries || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const r = await fetch(`/api/admin/inquiries?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (r.ok) { toast.success("Status updated"); load(); if (selected?._id === id) setSelected({ ...selected, status }); }
    else toast.error("Update failed");
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <AdminLayout title="Contact Inquiries" description="Manage messages from potential clients">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
        <div className="flex gap-2">
          {["all", ...statuses].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`font-inter text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all ${filter === s ? "bg-gold/10 border-gold/40 text-gold" : "border-gold/10 text-soft-taupe hover:border-gold/20"}`}>
              {s} {s === "all" ? `(${inquiries.length})` : `(${inquiries.filter((i) => i.status === s).length})`}
            </button>
          ))}
        </div>
        <button onClick={load} className="p-2 border border-gold/20 rounded-lg text-soft-taupe hover:text-gold transition-colors"><RefreshCw size={14} /></button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {filtered.length === 0 ? (
              <div className="admin-card text-center py-12"><MessageSquare size={24} className="text-gold/30 mx-auto mb-3" /><p className="text-soft-taupe">No inquiries found.</p></div>
            ) : filtered.map((i) => (
              <div key={i._id} onClick={() => setSelected(i)} className={`admin-card cursor-pointer hover:border-gold/30 transition-all ${selected?._id === i._id ? "border-gold/40" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm font-medium text-warm-beige">{i.name}</p>
                    <p className="font-inter text-xs text-soft-taupe mt-0.5 line-clamp-1">{i.message}</p>
                    <p className="font-inter text-xs text-soft-taupe/60 mt-0.5">{format(new Date(i.createdAt), "MMM d, yyyy")}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${statusColors[i.status]}`}>{i.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            {selected ? (
              <div className="admin-card sticky top-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-lg text-warm-beige">Inquiry Detail</h3>
                  <button onClick={() => setSelected(null)} className="text-soft-taupe/50 hover:text-soft-taupe text-lg">×</button>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { l: "Name", v: selected.name },
                    { l: "Email", v: selected.email },
                    { l: "Phone", v: selected.phone || "—" },
                    { l: "Service Interest", v: selected.interestedService || "—" },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex flex-col gap-0.5 border-b border-gold/5 pb-2">
                      <span className="text-xs text-soft-taupe">{l}</span>
                      <span className="text-sm text-warm-beige">{v}</span>
                    </div>
                  ))}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-soft-taupe">Message</span>
                    <p className="text-sm text-warm-beige/80 leading-relaxed">{selected.message}</p>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Update Status</label>
                  <select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)} className="admin-input">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <a href={`mailto:${selected.email}`} className="admin-btn-primary block text-center py-2 rounded-lg text-sm">Reply by Email</a>
              </div>
            ) : (
              <div className="admin-card text-center py-8 text-soft-taupe/50 text-sm">Select an inquiry to view</div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
