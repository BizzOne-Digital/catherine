import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Treatment from "@/models/Treatment";
import ServiceCategory from "@/models/ServiceCategory";
import { requireAdmin } from "@/lib/adminAuth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  await connectDB();
  const categoryId = req.nextUrl.searchParams.get("categoryId");
  const filter = categoryId ? { categoryId } : {};

  const treatments = await Treatment.find(filter)
    .sort({ order: 1, name: 1 })
    .populate("categoryId", "title slug")
    .lean();

  return NextResponse.json({ treatments });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const body = await req.json();

    if (!body.categoryId) {
      return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
    }
    if (!body.name?.trim() || !body.price?.trim()) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const category = await ServiceCategory.findById(body.categoryId);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const slug =
      body.slug?.trim() ||
      slugify(body.name, { lower: true, strict: true });

    const treatment = await Treatment.create({
      name: body.name.trim(),
      slug,
      categoryId: category._id,
      categorySlug: category.slug,
      shortDescription: body.shortDescription || "",
      price: body.price.trim(),
      image: body.image || "",
      beforeImage: body.beforeImage || "",
      afterImage: body.afterImage || "",
      bookingUrl: body.bookingUrl || "",
      hidePrice: !!body.hidePrice,
      popular: !!body.popular,
      isActive: body.isActive !== false,
      order: Number(body.order) || 0,
      sections: Array.isArray(body.sections) ? body.sections : [],
    });

    return NextResponse.json({ treatment }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create treatment";
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

    const existing = await Treatment.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let categorySlug = existing.categorySlug;
    let categoryId = existing.categoryId;

    if (body.categoryId && String(body.categoryId) !== String(existing.categoryId)) {
      const category = await ServiceCategory.findById(body.categoryId);
      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
      }
      categoryId = category._id;
      categorySlug = category.slug;
    }

    const slug =
      body.slug?.trim() ||
      slugify(body.name || existing.name, { lower: true, strict: true });

    existing.name = body.name?.trim() ?? existing.name;
    existing.slug = slug;
    existing.categoryId = categoryId;
    existing.categorySlug = categorySlug;
    existing.shortDescription =
      body.shortDescription !== undefined
        ? body.shortDescription
        : existing.shortDescription;
    existing.price = body.price?.trim() ?? existing.price;
    existing.image = body.image !== undefined ? body.image : existing.image;
    existing.beforeImage =
      body.beforeImage !== undefined ? body.beforeImage : existing.beforeImage;
    existing.afterImage =
      body.afterImage !== undefined ? body.afterImage : existing.afterImage;
    existing.bookingUrl =
      body.bookingUrl !== undefined ? body.bookingUrl : existing.bookingUrl;
    existing.hidePrice =
      body.hidePrice !== undefined ? !!body.hidePrice : existing.hidePrice;
    existing.popular =
      body.popular !== undefined ? !!body.popular : existing.popular;
    existing.isActive =
      body.isActive !== undefined ? body.isActive : existing.isActive;
    existing.order =
      body.order !== undefined ? Number(body.order) : existing.order;

    if (Array.isArray(body.sections)) {
      existing.sections = body.sections;
      existing.markModified("sections");
    }

    const treatment = await existing.save();

    return NextResponse.json({ treatment });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update treatment";
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

    await Treatment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete treatment";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
