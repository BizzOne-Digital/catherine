import { NextResponse } from "next/server";
import { BOOKABLE_SERVICES } from "@/lib/bookableServices";

export async function GET() {
  return NextResponse.json({ services: BOOKABLE_SERVICES });
}
