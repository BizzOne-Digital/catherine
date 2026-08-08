"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Package, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: OrderItem[];
  subtotal: number;
  tax?: number;
  total: number;
  stripeSessionId?: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

const statuses = ["new", "processing", "completed", "cancelled"];
const statusColors: Record<string, string> = {
  new: "text-blue-400 border-blue-500/30 bg-blue-900/20",
  processing: "text-yellow-400 border-yellow-500/30 bg-yellow-900/20",
  completed: "text-green-400 border-green-500/30 bg-green-900/20",
  cancelled: "text-soft-taupe/60 border-soft-taupe/20 bg-soft-taupe/5",
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/me").then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
    load();
  }, [router]);

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/orders");
    const d = await r.json();
    setOrders(d.orders || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, orderStatus: string) => {
    const r = await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, orderStatus }),
    });
    if (r.ok) {
      toast.success("Status updated");
      load();
      if (selected?._id === id) setSelected({ ...selected, orderStatus });
    } else toast.error("Update failed");
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <AdminLayout title="Orders" description="Stripe shop orders">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {["all", ...statuses].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 font-inter text-xs uppercase tracking-wider transition-all ${
                filter === s
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-gold/10 text-soft-taupe hover:border-gold/20"
              }`}
            >
              {s}{" "}
              {s === "all"
                ? `(${orders.length})`
                : `(${orders.filter((o) => o.orderStatus === s).length})`}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-lg border border-gold/20 p-2 text-soft-taupe transition-colors hover:text-gold"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-gold" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {filtered.length === 0 ? (
              <div className="admin-card py-12 text-center">
                <Package size={24} className="mx-auto mb-3 text-gold/30" />
                <p className="text-soft-taupe">No orders found.</p>
              </div>
            ) : (
              filtered.map((o) => (
                <div
                  key={o._id}
                  onClick={() => setSelected(o)}
                  className={`admin-card cursor-pointer transition-all duration-200 hover:border-gold/30 ${
                    selected?._id === o._id ? "border-gold/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-inter text-sm font-medium text-warm-beige">
                        {o.customerName}
                      </p>
                      <p className="mt-0.5 font-inter text-xs text-soft-taupe">
                        {o.items.length} item{o.items.length === 1 ? "" : "s"} · $
                        {o.total.toFixed(2)} CAD · {o.paymentStatus}
                      </p>
                      <p className="mt-0.5 font-inter text-xs text-soft-taupe/60">
                        {format(new Date(o.createdAt), "MMM d, yyyy · h:mm a")}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-xs ${
                        statusColors[o.orderStatus] || statusColors.new
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            {selected ? (
              <div className="admin-card sticky top-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-lg text-warm-beige">Order Detail</h3>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-soft-taupe/50 hover:text-soft-taupe"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { l: "Name", v: selected.customerName },
                    { l: "Email", v: selected.email },
                    { l: "Phone", v: selected.phone || "—" },
                    { l: "Shipping Address", v: selected.shippingAddress || "—" },
                    { l: "Billing Address", v: selected.billingAddress || "—" },
                    { l: "Payment", v: selected.paymentStatus },
                    { l: "Subtotal", v: `$${selected.subtotal.toFixed(2)} CAD` },
                    { l: "HST (13%)", v: `$${(selected.tax ?? 0).toFixed(2)} CAD` },
                    { l: "Total", v: `$${selected.total.toFixed(2)} CAD` },
                    {
                      l: "Stripe Session",
                      v: selected.stripeSessionId
                        ? `${selected.stripeSessionId.slice(0, 20)}…`
                        : "—",
                    },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex flex-col gap-0.5 border-b border-gold/5 pb-2">
                      <span className="font-inter text-xs text-soft-taupe">{l}</span>
                      <span className="break-all font-inter text-sm text-warm-beige">{v}</span>
                    </div>
                  ))}
                  <div>
                    <span className="font-inter text-xs text-soft-taupe">Items</span>
                    <ul className="mt-2 space-y-2">
                      {selected.items.map((item, i) => (
                        <li
                          key={`${item.name}-${i}`}
                          className="flex justify-between gap-2 font-inter text-sm text-warm-beige/90"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-gold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Update Status</label>
                  <select
                    value={selected.orderStatus}
                    onChange={(e) => updateStatus(selected._id, e.target.value)}
                    className="admin-input"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  className="admin-btn-primary block rounded-lg py-2 text-center text-sm"
                >
                  Reply by Email
                </a>
              </div>
            ) : (
              <div className="admin-card py-8 text-center text-sm text-soft-taupe/50">
                Click an order to view details
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
