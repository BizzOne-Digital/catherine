import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SitePage from "@/models/SitePage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const page = await SitePage.findOne({ slug }).lean();
    if (!page) {
      return NextResponse.json(
        { page: null },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          },
        }
      );
    }

    return NextResponse.json(
      {
        page: {
          slug: page.slug,
          title: page.title,
          path: page.path,
          sections: (page.sections || []).slice().sort((a, b) => a.order - b.order),
          updatedAt: page.updatedAt,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("[api/pages]", err);
    return NextResponse.json({ page: null }, { status: 500 });
  }
}
