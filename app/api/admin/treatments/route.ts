import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Treatment from "@/models/Treatment";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const treatments = await Treatment.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json({ treatments });
  } catch (error) {
    console.error("GET /api/admin/treatments error:", error);
    return NextResponse.json({ error: "Failed to fetch treatments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();
    
    const treatment = await Treatment.create(body);
    return NextResponse.json({ treatment }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/treatments error:", error);
    return NextResponse.json({ error: "Failed to create treatment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();
    
    const treatment = await Treatment.findByIdAndUpdate(body._id, body, { new: true });
    return NextResponse.json({ treatment });
  } catch (error) {
    console.error("PUT /api/admin/treatments error:", error);
    return NextResponse.json({ error: "Failed to update treatment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    await dbConnect();
    await Treatment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/treatments error:", error);
    return NextResponse.json({ error: "Failed to delete treatment" }, { status: 500 });
  }
}
