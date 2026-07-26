import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SitePage from "@/models/SitePage";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  await connectDB();
  const slug = req.nextUrl.searchParams.get("slug");

  if (slug) {
    const page = await SitePage.findOne({ slug }).lean();
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      page: {
        ...page,
        sections: (page.sections || []).slice().sort((a, b) => a.order - b.order),
      },
    });
  }

  const pages = await SitePage.find({})
    .sort({ title: 1 })
    .select("slug title path updatedAt sections")
    .lean();

  return NextResponse.json({
    pages: pages.map((p) => ({
      ...p,
      sectionCount: (p.sections || []).length,
      sections: undefined,
    })),
  });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const body = await req.json();
    const slug = body.slug?.trim();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    let page = await SitePage.findOne({ slug });
    if (!page) {
      page = new SitePage({
        slug,
        title: body.title || slug,
        path: body.path || `/${slug}`,
        sections: [],
      });
    }

    if (body.title !== undefined) page.title = body.title;
    if (body.path !== undefined) page.path = body.path;
    if (Array.isArray(body.sections)) {
      page.sections = body.sections.map(
        (
          s: {
            id?: string;
            key?: string;
            type?: string;
            title?: string;
            subtitle?: string;
            content?: string;
            image?: string;
            items?: string[];
            ctaLabel?: string;
            ctaHref?: string;
            order?: number;
          },
          i: number
        ) => ({
          id: s.id || `sec-${Date.now()}-${i}`,
          key: s.key || `section_${i}`,
          type: s.type || "custom",
          title: s.title || "",
          subtitle: s.subtitle || "",
          content: s.content || "",
          image: s.image || "",
          items: Array.isArray(s.items) ? s.items : [],
          ctaLabel: s.ctaLabel || "",
          ctaHref: s.ctaHref || "",
          order: s.order !== undefined ? Number(s.order) : i,
        })
      );
      page.markModified("sections");
    }

    await page.save();
    return NextResponse.json({ page });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save page";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const body = await req.json();
    if (!body.slug?.trim() || !body.title?.trim()) {
      return NextResponse.json({ error: "slug and title required" }, { status: 400 });
    }

    const page = await SitePage.create({
      slug: body.slug.trim(),
      title: body.title.trim(),
      path: body.path || `/${body.slug.trim()}`,
      sections: Array.isArray(body.sections) ? body.sections : [],
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create page";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
