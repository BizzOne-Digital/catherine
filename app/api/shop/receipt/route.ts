import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { fulfillOrderFromStripeSession } from "@/lib/orderFulfillment";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id")?.trim() || "";

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Valid session_id is required" }, { status: 400 });
    }

    const result = await fulfillOrderFromStripeSession(sessionId);
    if (!result) {
      return NextResponse.json({ error: "Payment not completed for this session" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findById(result.orderId).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      order: {
        id: order._id.toString(),
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax ?? 0,
        total: order.total,
        createdAt: order.createdAt,
        emailSent: result.emailSent,
      },
    });
  } catch (err) {
    console.error("Receipt API error:", err);
    const message = err instanceof Error ? err.message : "Failed to load receipt";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
