import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Treatment from "@/models/Treatment";
import ServiceCategory from "@/models/ServiceCategory";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const category = req.nextUrl.searchParams.get("category");
    const slug = req.nextUrl.searchParams.get("slug");

    if (!category || !slug) {
      return NextResponse.json({ error: "category and slug required" }, { status: 400 });
    }

    const treatment = await Treatment.findOne({
      categorySlug: category,
      slug,
      isActive: true,
    }).lean();

    if (!treatment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const cat = await ServiceCategory.findById(treatment.categoryId).lean();

    return NextResponse.json(
      {
        treatment: {
          ...treatment,
          categoryTitle: cat?.title || "",
          sections: (treatment.sections || []).slice().sort((a, b) => a.order - b.order),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("[api/treatments/detail]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
