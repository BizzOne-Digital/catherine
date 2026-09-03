import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { fetchGoogleBusyPeriods, type BusyPeriod } from "@/lib/googleCalendar";
import { torontoLocalToUtc } from "@/lib/bookingSlots";

const PENDING_HOLD_MINUTES = 30;

export function localDateTimeToUtc(local: string): Date {
  const [datePart, timePart] = local.split("T");
  const [h, m] = (timePart || "00:00").split(":").map(Number);
  return torontoLocalToUtc(datePart, h, m);
}

export async function fetchAppointmentBusyPeriods(
  timeMin: Date,
  timeMax: Date,
  excludeAppointmentId?: string
): Promise<BusyPeriod[]> {
  await connectDB();
  const cutoff = new Date(Date.now() - PENDING_HOLD_MINUTES * 60 * 1000);

  const query: Record<string, unknown> = {
    status: { $ne: "cancelled" },
    $or: [
      { status: "confirmed" },
      { paymentStatus: "paid" },
      {
        status: "pending",
        paymentStatus: "pending",
        createdAt: { $gte: cutoff },
      },
    ],
  };
  if (excludeAppointmentId) {
    query._id = { $ne: excludeAppointmentId };
  }

  const appointments = await Appointment.find(query).select("startLocal endLocal");

  const periods: BusyPeriod[] = [];
  for (const appointment of appointments) {
    const start = localDateTimeToUtc(appointment.startLocal);
    const end = localDateTimeToUtc(appointment.endLocal);
    if (start < timeMax && end > timeMin) {
      periods.push({ start, end });
    }
  }
  return periods;
}

/**
 * Busy times from Google Calendar plus website appointments.
 * When requireCalendar is true, booking is blocked if Google cannot be read.
 */
export async function fetchAllBusyPeriods(
  timeMin: Date,
  timeMax: Date,
  options?: { requireCalendar?: boolean; excludeAppointmentId?: string }
): Promise<BusyPeriod[]> {
  let googleBusy: BusyPeriod[] = [];
  try {
    googleBusy = await fetchGoogleBusyPeriods(timeMin, timeMax);
  } catch (err) {
    if (options?.requireCalendar) throw err;
    console.error("[bookingBusy] Google calendar read failed:", err);
  }

  const dbBusy = await fetchAppointmentBusyPeriods(
    timeMin,
    timeMax,
    options?.excludeAppointmentId
  );
  return [...googleBusy, ...dbBusy];
}
