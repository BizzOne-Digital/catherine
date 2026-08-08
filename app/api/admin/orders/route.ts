import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/adminAuth";

const ORDER_STATUSES = ["new", "processing", "completed", "cancelled"] as const;

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if ("error" in auth) return auth.error;
  try {
    await connectDB();
    const { id, orderStatus } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    if (!ORDER_STATUSES.includes(orderStatus)) {
      return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
    }
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
