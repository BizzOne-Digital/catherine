import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getHstTaxRateId, getSiteUrl, getStripe, toAbsoluteImageUrl } from "@/lib/stripe";

const MAX_QTY = 20;

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const items = body?.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    if (items.length > 50) {
      return NextResponse.json({ error: "Too many line items" }, { status: 400 });
    }

    await connectDB();
    const stripe = getStripe();
    const hstTaxRateId = await getHstTaxRateId(stripe);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const metaParts: string[] = [];

    for (const item of items) {
      const productId = item?.productId;
      const quantity = Math.min(
        MAX_QTY,
        Math.max(1, Math.floor(Number(item?.quantity) || 1))
      );

      if (!productId || typeof productId !== "string") {
        return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
      }

      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Product unavailable: ${productId}` },
          { status: 400 }
        );
      }

      if (product.stockStatus === "out_of_stock") {
        return NextResponse.json(
          { error: `${product.name} is out of stock` },
          { status: 400 }
        );
      }

      const price = product.salePrice ?? product.price;
      if (typeof price !== "number" || price <= 0) {
        return NextResponse.json(
          { error: `Invalid price for ${product.name}` },
          { status: 400 }
        );
      }

      const imageUrl = toAbsoluteImageUrl(product.image);

      lineItems.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: product.name,
            ...(imageUrl ? { images: [imageUrl] } : {}),
            description: product.shortDescription || undefined,
            metadata: { productId: product._id.toString() },
          },
          unit_amount: Math.round(price * 100),
        },
        quantity,
        tax_rates: [hstTaxRateId],
      });

      metaParts.push(`${product._id.toString()}:${quantity}`);
    }

    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/cancel`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        source: "lumina-medi-spa-shop",
        tax: "HST_13",
        items: metaParts.join(",").slice(0, 500),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
