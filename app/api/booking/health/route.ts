import { NextResponse } from "next/server";
import {
  getGoogleAccessToken,
  getGoogleCalendarId,
  getGoogleCalendarIds,
  getServiceAccountEmail,
} from "@/lib/googleAuth";
import {
  fetchGoogleBusyPeriods,
  listAccessibleCalendars,
  calendarShareInstructions,
  resolveCalendarIds,
} from "@/lib/googleCalendar";
import { addMinutes } from "date-fns";
import { torontoLocalToUtc, generateSlotsForDay } from "@/lib/bookingSlots";

export const dynamic = "force-dynamic";

/** Lightweight booking diagnostics (no secrets exposed). */
export async function GET() {
  const stripeOk = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  const webhookOk = Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim());
  const googleJsonOk = Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim());
  const calendarId = getGoogleCalendarId();
  const calendarIds = getGoogleCalendarIds();
  const serviceAccountEmail = googleJsonOk ? getServiceAccountEmail() : "";

  let calendarAuthOk = false;
  let calendarAuthError = "";
  let calendarReadOk = false;
  let calendarReadError = "";
  let calendarShared = false;
  let visibleCalendars: { id: string; summary: string; primary?: boolean }[] = [];
  let configuredCalendarIds: string[] = [];
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
        configuredCalendarIds = await resolveCalendarIds();
      } catch {
        configuredCalendarIds = calendarIds;
      }

      try {
        visibleCalendars = await listAccessibleCalendars();
      } catch {
        // Service accounts often have an empty calendarList even when sharing works.
      }

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
        const busy = await fetchGoogleBusyPeriods(dayStart, dayEnd);
        calendarReadOk = true;
        calendarShared = true;
        sampleSlots = generateSlotsForDay(torontoDate, 30, busy).length;
      } catch (err) {
        calendarShared = false;
        calendarReadError =
          err instanceof Error ? err.message : "Could not read Google Calendar";
      }
    }
  }

  const bookingCoreOk =
    stripeOk && googleJsonOk && calendarAuthOk && calendarShared && calendarReadOk;

  const ok = bookingCoreOk && webhookOk;

  return NextResponse.json({
    ok,
    bookingCore: bookingCoreOk,
    stripe: stripeOk,
    stripeWebhook: webhookOk,
    googleCredentials: googleJsonOk,
    calendarId,
    calendarIds,
    configuredCalendarIds,
    serviceAccountEmail,
    calendarShared,
    visibleCalendars,
    calendarAuth: calendarAuthOk,
    calendarRead: calendarReadOk,
    sampleSlotsToday: sampleSlots,
    sampleSlotsNote:
      sampleSlots === 0
        ? "No bookable slots left today under current rules (not necessarily an error)"
        : undefined,
    shareInstructions: calendarShared ? undefined : calendarShareInstructions(calendarId),
    errors: {
      calendarAuth: calendarAuthError || undefined,
      calendarRead: calendarReadError || undefined,
    },
  });
}
