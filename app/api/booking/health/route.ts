import { NextResponse } from "next/server";
import { getGoogleAccessToken, getGoogleCalendarId } from "@/lib/googleAuth";
import { fetchBusyPeriods } from "@/lib/googleCalendar";
import { addMinutes } from "date-fns";
import { torontoLocalToUtc, generateSlotsForDay } from "@/lib/bookingSlots";

export const dynamic = "force-dynamic";

/** Lightweight booking diagnostics (no secrets exposed). */
export async function GET() {
  const stripeOk = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  const webhookOk = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim());
  const googleJsonOk = Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim());
  const calendarId = getGoogleCalendarId();

  let calendarAuthOk = false;
  let calendarAuthError = "";
  let calendarReadOk = false;
  let calendarReadError = "";
  let sampleSlots = 0;

  if (googleJsonOk) {
    try {
      await getGoogleAccessToken();
      calendarAuthOk = true;
    } catch (err) {
      calendarAuthError =
        err instanceof Error ? err.message : "Could not authenticate with Google";
    }

    if (calendarAuthOk) {
      try {
        const now = new Date();
        const torontoDate = new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Toronto",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(now);
        const dayStart = torontoLocalToUtc(torontoDate, 0, 0);
        const dayEnd = addMinutes(dayStart, 24 * 60);
        const busy = await fetchBusyPeriods(dayStart, dayEnd);
        calendarReadOk = true;
        sampleSlots = generateSlotsForDay(torontoDate, 30, busy).length;
      } catch (err) {
        calendarReadError =
          err instanceof Error ? err.message : "Could not read Google Calendar";
      }
    }
  }

  const ok =
    stripeOk &&
    googleJsonOk &&
    calendarAuthOk &&
    calendarReadOk &&
    sampleSlots > 0;

  return NextResponse.json({
    ok,
    stripe: stripeOk,
    stripeWebhook: webhookOk,
    googleCredentials: googleJsonOk,
    calendarId,
    calendarAuth: calendarAuthOk,
    calendarRead: calendarReadOk,
    sampleSlotsToday: sampleSlots,
    errors: {
      calendarAuth: calendarAuthError || undefined,
      calendarRead: calendarReadError || undefined,
    },
  });
}
