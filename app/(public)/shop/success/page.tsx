"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

type ReceiptItem = {
  name: string;
  price: number;
  quantity: number;
};

type Receipt = {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  emailSent: boolean;
};

function money(n: number) {
  return `$${Number(n || 0).toFixed(2)} CAD`;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState("");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/shop/receipt?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "Could not load your receipt");
        setReceipt(data.order);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not load receipt");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const orderDate = receipt?.createdAt
    ? new Date(receipt.createdAt).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section className="section-pad section-warm pb-24 pt-32">
      <div className="container-luxury mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-6 text-gold" size={48} />
          <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
            Thank you for your order
          </h1>
          <p className="mt-4 font-inter text-base leading-relaxed text-soft-taupe">
            Your payment was successful.{" "}
            {receipt?.emailSent
              ? `A receipt has been sent to ${receipt.email}.`
              : "Your order confirmation is being processed."}
          </p>
        </div>

        {loading && (
          <div className="mt-10 flex items-center justify-center gap-2 font-inter text-sm text-soft-taupe">
            <Loader2 size={18} className="animate-spin text-gold" />
            Preparing your receipt…
          </div>
        )}

        {error && !loading && (
          <div className="mt-10 rounded-xl border border-gold/25 bg-white p-6 text-center">
            <p className="font-inter text-sm text-soft-taupe">{error}</p>
            <p className="mt-2 font-inter text-xs text-soft-taupe/80">
              Your payment was received. If you need help, contact us with reference{" "}
              <span className="break-all font-medium text-text-dark">{sessionId}</span>.
            </p>
          </div>
        )}

        {receipt && !loading && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-card">
            <div className="border-b border-gold/15 bg-[#FAF4EB] px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    Order Receipt
                  </p>
                  <p className="mt-1 font-playfair text-xl font-bold text-text-dark">
                    Order #{receipt.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                {orderDate && (
                  <p className="font-inter text-sm text-soft-taupe">{orderDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-inter text-[10px] font-bold uppercase tracking-[0.14em] text-gold/80">
                    Customer
                  </p>
                  <p className="mt-1 font-inter text-sm font-medium text-text-dark">
                    {receipt.customerName}
                  </p>
                  <p className="font-inter text-sm text-soft-taupe">{receipt.email}</p>
                  {receipt.phone && (
                    <p className="font-inter text-sm text-soft-taupe">{receipt.phone}</p>
                  )}
                </div>
                {receipt.shippingAddress && (
                  <div>
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.14em] text-gold/80">
                      Shipping to
                    </p>
                    <p className="mt-1 font-inter text-sm leading-relaxed text-soft-taupe">
                      {receipt.shippingAddress}
                    </p>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gold/15">
                      <th className="py-2 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-gold/80">
                        Product
                      </th>
                      <th className="py-2 text-center font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-gold/80">
                        Qty
                      </th>
                      <th className="py-2 text-right font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-gold/80">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map((item, i) => (
                      <tr key={`${item.name}-${i}`} className="border-b border-gold/10">
                        <td className="py-3 pr-4 font-inter text-sm text-text-dark">
                          {item.name}
                        </td>
                        <td className="py-3 text-center font-inter text-sm text-soft-taupe">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right font-inter text-sm font-medium text-text-dark">
                          {money(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="pt-4 font-inter text-sm text-soft-taupe">
                        Subtotal
                      </td>
                      <td className="pt-4 text-right font-inter text-sm text-text-dark">
                        {money(receipt.subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="py-1 font-inter text-sm text-soft-taupe">
                        HST (13%)
                      </td>
                      <td className="py-1 text-right font-inter text-sm text-text-dark">
                        {money(receipt.tax)}
                      </td>
                    </tr>
                    <tr className="border-t border-gold/20">
                      <td
                        colSpan={2}
                        className="pt-3 font-inter text-sm font-bold text-text-dark"
                      >
                        Total Paid
                      </td>
                      <td className="pt-3 text-right font-playfair text-lg font-bold text-gold">
                        {money(receipt.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {receipt.emailSent && (
                <div className="flex items-start gap-3 rounded-xl border border-gold/15 bg-[#FAF4EB] p-4">
                  <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                  <p className="font-inter text-sm leading-relaxed text-soft-taupe">
                    A copy of this receipt has been emailed to{" "}
                    <span className="font-medium text-text-dark">{receipt.email}</span>.
                  </p>
                </div>
              )}

              {sessionId && (
                <p className="break-all font-inter text-[11px] text-soft-taupe/70">
                  Payment reference: {sessionId}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="hero-btn-primary text-center">
            Continue Shopping
          </Link>
          <Link href="/contact" className="btn-outline-gold rounded-sm text-center">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ShopSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center pt-28 font-inter text-soft-taupe">
          Loading…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
