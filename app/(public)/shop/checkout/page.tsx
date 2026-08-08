"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import {
  cartUnitPrice,
  formatCartPrice,
  useCart,
} from "@/components/shop/CartProvider";
import CmsImage from "@/components/cms/CmsImage";
import { calcHst, HST_PERCENT } from "@/lib/shopTax";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  country: "CA" | "US";
  notes: string;
};

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "CA",
  notes: "",
};

const CHECKOUT_FORM_KEY = "lumina_checkout_form";

export default function CheckoutPage() {
  const { items, subtotal, hydrated, itemCount, updateQuantity, removeItem, openCart } =
    useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const tax = useMemo(() => calcHst(subtotal), [subtotal]);
  const total = useMemo(
    () => Math.round((subtotal + tax) * 100) / 100,
    [subtotal, tax]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECKOUT_FORM_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CheckoutForm>;
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(form));
    } catch {
      // ignore
    }
  }, [form]);

  const setField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || submitting) return;

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please enter your name, email, and phone.");
      return;
    }
    if (
      !form.address1.trim() ||
      !form.city.trim() ||
      !form.province.trim() ||
      !form.postalCode.trim()
    ) {
      toast.error("Please complete your shipping address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          customer: {
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address1: form.address1.trim(),
            address2: form.address2.trim(),
            city: form.city.trim(),
            province: form.province.trim(),
            postalCode: form.postalCode.trim(),
            country: form.country,
            notes: form.notes.trim(),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start payment");
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      toast.error(message);
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <Loader2 className="animate-spin text-gold" size={28} />
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="section-pad section-warm pb-24 pt-32">
        <div className="container-luxury mx-auto max-w-xl text-center">
          <ShoppingBag className="mx-auto mb-6 text-gold/40" size={40} />
          <h1 className="font-playfair text-3xl font-bold text-text-dark">Your cart is empty</h1>
          <p className="mt-3 font-inter text-soft-taupe">
            Add products from the shop before checking out.
          </p>
          <Link href="/shop" className="hero-btn-primary mt-8 inline-flex">
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad section-warm pb-24 pt-28">
      <div className="container-luxury">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-inter text-sm text-soft-taupe transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> Continue shopping
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="font-inter text-sm text-gold transition-colors hover:text-deep-gold"
          >
            View cart
          </button>
        </div>

        <div className="mb-10">
          <p className="mb-2 font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Checkout
          </p>
          <h1 className="font-playfair text-3xl font-bold text-text-dark sm:text-4xl">
            Your details
          </h1>
          <p className="mt-3 max-w-xl font-inter text-sm leading-relaxed text-soft-taupe">
            Enter your contact and shipping information, then continue to secure card payment with
            Stripe. HST (13%) is calculated automatically.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-8 lg:col-span-3">
            <fieldset className="rounded-2xl border border-gold/20 bg-white/50 p-6 sm:p-8">
              <legend className="px-2 font-playfair text-xl text-text-dark">Contact</legend>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="admin-label" htmlFor="fullName">
                    Full name *
                  </label>
                  <input
                    id="fullName"
                    required
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="admin-input"
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="admin-input"
                    placeholder="jane@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="phone">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className="admin-input"
                    placeholder="(416) 555-0123"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-gold/20 bg-white/50 p-6 sm:p-8">
              <legend className="px-2 font-playfair text-xl text-text-dark">
                Shipping address
              </legend>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="admin-label" htmlFor="address1">
                    Address line 1 *
                  </label>
                  <input
                    id="address1"
                    required
                    value={form.address1}
                    onChange={(e) => setField("address1", e.target.value)}
                    className="admin-input"
                    placeholder="Street address"
                    autoComplete="address-line1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="admin-label" htmlFor="address2">
                    Address line 2
                  </label>
                  <input
                    id="address2"
                    value={form.address2}
                    onChange={(e) => setField("address2", e.target.value)}
                    className="admin-input"
                    placeholder="Apt, suite, unit (optional)"
                    autoComplete="address-line2"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="city">
                    City *
                  </label>
                  <input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    className="admin-input"
                    autoComplete="address-level2"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="province">
                    Province / State *
                  </label>
                  <input
                    id="province"
                    required
                    value={form.province}
                    onChange={(e) => setField("province", e.target.value)}
                    className="admin-input"
                    placeholder="ON"
                    autoComplete="address-level1"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="postalCode">
                    Postal / ZIP *
                  </label>
                  <input
                    id="postalCode"
                    required
                    value={form.postalCode}
                    onChange={(e) => setField("postalCode", e.target.value)}
                    className="admin-input"
                    autoComplete="postal-code"
                  />
                </div>
                <div>
                  <label className="admin-label" htmlFor="country">
                    Country *
                  </label>
                  <select
                    id="country"
                    required
                    value={form.country}
                    onChange={(e) => setField("country", e.target.value as "CA" | "US")}
                    className="admin-input"
                    autoComplete="country"
                  >
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="admin-label" htmlFor="notes">
                    Order notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    className="admin-input resize-none"
                    placeholder="Delivery instructions (optional)"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-gold/20 bg-ivory/95 p-6 shadow-card">
              <h2 className="font-playfair text-xl text-text-dark">Order summary</h2>
              <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#EDE3D3] to-[#F7EFE4]">
                      <CmsImage
                        src={item.image}
                        fallback="/images/placeholder-product.svg"
                        alt={item.name}
                        fill
                        className="object-contain p-1.5"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-inter text-sm font-medium text-text-dark">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-playfair text-gold">
                        {formatCartPrice(cartUnitPrice(item))}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <select
                          aria-label={`Quantity for ${item.name}`}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.productId, Number(e.target.value))
                          }
                          className="rounded border border-gold/25 bg-white px-2 py-1 font-inter text-xs"
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="font-inter text-xs text-soft-taupe hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-gold/15 pt-4">
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-soft-taupe">Subtotal</span>
                  <span>{formatCartPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-soft-taupe">HST ({HST_PERCENT}%)</span>
                  <span>{formatCartPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-gold/10 pt-3">
                  <span className="font-inter text-sm font-medium">Total</span>
                  <span className="font-playfair text-2xl text-gold">
                    {formatCartPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="hero-btn-primary mt-6 flex w-full items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Redirecting to payment…
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    Continue to payment
                  </>
                )}
              </button>
              <p className="mt-3 text-center font-inter text-[11px] leading-relaxed text-soft-taupe">
                You’ll complete card payment securely on Stripe. Your details are saved with the
                order for confirmation.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
