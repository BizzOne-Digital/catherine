import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Treatment from "@/models/Treatment";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const categorySlug = req.nextUrl.searchParams.get("category");
    const filter: Record<string, unknown> = { isActive: true };
    if (categorySlug) filter.categorySlug = categorySlug;

    const treatments = await Treatment.find(filter)
      .sort({ order: 1, name: 1 })
      .lean();

    return NextResponse.json(
      {
        treatments: treatments.map((t) => ({
          _id: t._id,
          name: t.name,
          slug: t.slug,
          categorySlug: t.categorySlug,
          shortDescription: t.shortDescription,
          price: t.price,
          image: t.image,
          popular: t.popular,
          detailPage: `/services/${t.categorySlug}/${t.slug}`,
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("[api/treatments]", err);
    return NextResponse.json({ treatments: [] });
  }
}
