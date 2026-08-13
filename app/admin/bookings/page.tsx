"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  treatmentInterest: string;
  preferredDate?: string;
  preferredTime?: string;
  clientType: string;
  message?: string;
  status: string;
  createdAt: string;
}

const statuses = ["new", "contacted", "booked", "closed"];
const statusColors: Record<string, string> = {
  new: "text-blue-400 border-blue-500/30 bg-blue-900/20",
  contacted: "text-yellow-400 border-yellow-500/30 bg-yellow-900/20",
  booked: "text-green-400 border-green-500/30 bg-green-900/20",
  closed: "text-soft-taupe/60 border-soft-taupe/20 bg-soft-taupe/5",
};

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/me").then((r) => { if (!r.ok) router.push("/admin/login"); });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/bookings");
    const d = await r.json();
    setBookings(d.bookings || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const r = await fetch(`/api/admin/bookings?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (r.ok) { toast.success("Status updated"); load(); if (selected?._id === id) setSelected({ ...selected, status }); }
    else toast.error("Update failed");
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <AdminLayout title="Booking Inquiries" description="Manage appointment requests">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
        <div className="flex gap-2">
          {["all", ...statuses].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`font-inter text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all ${filter === s ? "bg-gold/10 border-gold/40 text-gold" : "border-gold/10 text-soft-taupe hover:border-gold/20"}`}>
              {s} {s === "all" ? `(${bookings.length})` : `(${bookings.filter((b) => b.status === s).length})`}
            </button>
          ))}
        </div>
        <button onClick={load} className="p-2 border border-gold/20 rounded-lg text-soft-taupe hover:text-gold transition-colors"><RefreshCw size={14} /></button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 size={24} className="text-gold animate-spin" /></div> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.length === 0 ? (
              <div className="admin-card text-center py-12"><Calendar size={24} className="text-gold/30 mx-auto mb-3" /><p className="text-soft-taupe">No bookings found.</p></div>
            ) : filtered.map((b) => (
              <div key={b._id} onClick={() => setSelected(b)} className={`admin-card cursor-pointer hover:border-gold/30 transition-all duration-200 ${selected?._id === b._id ? "border-gold/40" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm font-medium text-warm-beige">{b.fullName}</p>
                    <p className="font-inter text-xs text-soft-taupe mt-0.5">{b.treatmentInterest}</p>
                    <p className="font-inter text-xs text-soft-taupe/60 mt-0.5">{format(new Date(b.createdAt), "MMM d, yyyy · h:mm a")}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${statusColors[b.status]}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div>
            {selected ? (
              <div className="admin-card sticky top-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-lg text-warm-beige">Booking Detail</h3>
                  <button onClick={() => setSelected(null)} className="text-soft-taupe/50 hover:text-soft-taupe"><span className="text-lg">×</span></button>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { l: "Name", v: selected.fullName },
                    { l: "Email", v: selected.email },
                    { l: "Phone", v: selected.phone },
                    { l: "Treatment", v: selected.treatmentInterest },
                    { l: "Preferred Date", v: selected.preferredDate || "—" },
                    { l: "Preferred Time", v: selected.preferredTime || "—" },
                    { l: "Client Type", v: selected.clientType },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex flex-col gap-0.5 border-b border-gold/5 pb-2">
                      <span className="font-inter text-xs text-soft-taupe">{l}</span>
                      <span className="font-inter text-sm text-warm-beige">{v}</span>
                    </div>
                  ))}
                  {selected.message && (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-inter text-xs text-soft-taupe">Message</span>
                      <span className="font-inter text-sm text-warm-beige/80">{selected.message}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="admin-label">Update Status</label>
                  <select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)} className="admin-input">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <a href={`mailto:${selected.email}`} className="admin-btn-primary block text-center py-2 rounded-lg text-sm">
                  Reply by Email
                </a>
              </div>
            ) : (
              <div className="admin-card text-center py-8 text-soft-taupe/50 text-sm">
                Click a booking to view details
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
