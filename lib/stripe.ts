import Stripe from "stripe";
import { HST_PERCENT } from "@/lib/shopTax";

export { HST_PERCENT } from "@/lib/shopTax";

let stripeClient: Stripe | null = null;
let cachedHstTaxRateId: string | null = process.env.STRIPE_HST_TAX_RATE_ID || null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2024-04-10",
    });
  }
  return stripeClient;
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** Stripe requires absolute HTTPS (or http for localhost) image URLs. */
export function toAbsoluteImageUrl(path: string | undefined | null): string | null {
  if (!path || !String(path).trim()) return null;
  const trimmed = String(path).trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (!trimmed.startsWith("/")) return null;
  return `${getSiteUrl()}${trimmed}`;
}

/** Reuse or create a 13% exclusive HST tax rate for Checkout line items. */
export async function getHstTaxRateId(stripe: Stripe = getStripe()): Promise<string> {
  if (cachedHstTaxRateId) return cachedHstTaxRateId;

  const existing = await stripe.taxRates.list({ active: true, limit: 100 });
  const found = existing.data.find(
    (r) =>
      r.percentage === HST_PERCENT &&
      r.inclusive === false &&
      (r.metadata?.source === "lumina-hst" || r.display_name?.toUpperCase() === "HST")
  );
  if (found) {
    cachedHstTaxRateId = found.id;
    return found.id;
  }

  const created = await stripe.taxRates.create({
    display_name: "HST",
    description: "Ontario Harmonized Sales Tax (13%)",
    percentage: HST_PERCENT,
    inclusive: false,
    country: "CA",
    metadata: { source: "lumina-hst" },
  });
  cachedHstTaxRateId = created.id;
  return created.id;
}

export function formatAddress(addr?: Stripe.Address | null): string {
  if (!addr) return "";
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(", ");
}
