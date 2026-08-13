import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceCategory from "@/models/ServiceCategory";
import Treatment from "@/models/Treatment";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const categories = await ServiceCategory.find({ isActive: true })
      .sort({ order: 1, title: 1 })
      .lean();

    const counts = await Treatment.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    ]);
    const countMap = Object.fromEntries(counts.map((c) => [String(c._id), c.count]));

    return NextResponse.json({
      categories: categories.map((c) => ({
        _id: c._id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        order: c.order,
        treatmentCount: countMap[String(c._id)] || 0,
        detailPage: c.detailPage?.trim() || `/services/${c.slug}`,
      })),
    });
  } catch (err) {
    console.error("[api/categories]", err);
    return NextResponse.json({ categories: [] });
  }
}
