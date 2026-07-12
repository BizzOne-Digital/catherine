import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    await connectDB();

    // Build line items from DB to prevent price tampering
    const lineItems = await Promise.all(
      items.map(async (item: { productId: string; quantity: number }) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        const price = product.salePrice ?? product.price;

        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
              description: product.shortDescription || undefined,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: item.quantity,
        };
      })
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
      metadata: {
        source: "lumina-medi-spa-shop",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
