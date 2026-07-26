import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";
import Treatment from "@/models/Treatment";
import { requireAdmin } from "@/lib/adminAuth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  await connectDB();
  const categories = await ServiceCategory.find().sort({ order: 1, title: 1 }).lean();
  const counts = await Treatment.aggregate([
    { $group: { _id: "$categoryId", count: { $sum: 1 } } },
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [String(c._id), c.count]));

  return NextResponse.json({
    categories: categories.map((c) => ({
      ...c,
      treatmentCount: countMap[String(c._id)] || 0,
    })),
  });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const body = await req.json();
    const slug =
      body.slug?.trim() ||
      slugify(body.title || "", { lower: true, strict: true });

    const category = await ServiceCategory.create({
      title: body.title,
      slug,
      description: body.description || "",
      icon: body.icon || "Sparkles",
      order: Number(body.order) || 0,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create category";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const body = await req.json();
    const id = body.id || body._id;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const existing = await ServiceCategory.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const slug =
      body.slug?.trim() ||
      slugify(body.title || existing.title, { lower: true, strict: true });

    const category = await ServiceCategory.findByIdAndUpdate(
      id,
      {
        title: body.title ?? existing.title,
        slug,
        description: body.description ?? existing.description,
        icon: body.icon ?? existing.icon,
        order: body.order !== undefined ? Number(body.order) : existing.order,
        isActive: body.isActive !== undefined ? body.isActive : existing.isActive,
      },
      { new: true }
    );

    // Keep treatment categorySlug in sync when slug changes
    if (category && slug !== existing.slug) {
      await Treatment.updateMany({ categoryId: id }, { categorySlug: slug });
    }

    return NextResponse.json({ category });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update category";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Treatment.deleteMany({ categoryId: id });
    await ServiceCategory.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete category";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
