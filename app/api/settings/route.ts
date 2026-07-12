import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSetting from "@/models/SiteSetting";

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSetting.findOne({}).lean();
    return NextResponse.json({ settings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
