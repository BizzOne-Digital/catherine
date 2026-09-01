import { NextRequest, NextResponse } from "next/server";
import { addMinutes } from "date-fns";
import { getBookableService } from "@/lib/bookableServices";
import { generateSlotsForDay, torontoLocalToUtc } from "@/lib/bookingSlots";
import { fetchBusyPeriodsSafe } from "@/lib/googleCalendar";

export async function GET(req: NextRequest) {
  const serviceId = req.nextUrl.searchParams.get("serviceId")?.trim();
  const date = req.nextUrl.searchParams.get("date")?.trim();

  if (!serviceId || !date) {
    return NextResponse.json(
      { error: "serviceId and date are required" },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  const service = getBookableService(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }

  try {
    const dayStart = torontoLocalToUtc(date, 0, 0);
    const dayEnd = addMinutes(dayStart, 24 * 60);
    const busy = await fetchBusyPeriodsSafe(dayStart, dayEnd);
    const slots = generateSlotsForDay(date, service.durationMinutes, busy);
    return NextResponse.json({ slots, durationMinutes: service.durationMinutes });
  } catch (err) {
    console.error("[booking/availability]", err);
    const message =
      err instanceof Error ? err.message : "Could not load availability";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
