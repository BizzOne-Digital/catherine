import { getGoogleAccessToken, getGoogleCalendarId } from "@/lib/googleAuth";

const TZ = "America/Toronto";

export type BusyPeriod = { start: Date; end: Date };

export async function fetchBusyPeriods(timeMin: Date, timeMax: Date): Promise<BusyPeriod[]> {
  const token = await getGoogleAccessToken();
  const calendarId = getGoogleCalendarId();

  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: TZ,
      items: [{ id: calendarId }],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[googleCalendar] freeBusy error:", data);
    throw new Error(data?.error?.message || "Failed to read calendar availability");
  }

  const cal = data.calendars?.[calendarId];
  if (!cal) {
    console.error(
      "[googleCalendar] Calendar missing from freeBusy response:",
      calendarId,
      Object.keys(data.calendars || {})
    );
    throw new Error(
      "Google Calendar is not accessible. Share luminamedispa@gmail.com with the service account (Make changes to events)."
    );
  }

  const busy = cal.busy || [];
  return busy.map((b: { start: string; end: string }) => ({
    start: new Date(b.start),
    end: new Date(b.end),
  }));
}

/** Read busy periods; returns empty list if calendar is unreachable (slots still shown). */
export async function fetchBusyPeriodsSafe(
  timeMin: Date,
  timeMax: Date
): Promise<BusyPeriod[]> {
  try {
    return await fetchBusyPeriods(timeMin, timeMax);
  } catch (err) {
    console.error("[googleCalendar] fetchBusyPeriodsSafe:", err);
    return [];
  }
}

export async function createCalendarEvent(opts: {
  summary: string;
  description: string;
  startLocal: string;
  endLocal: string;
  attendeeEmail?: string;
}) {
  const token = await getGoogleAccessToken();
  const calendarId = getGoogleCalendarId();

  const description = opts.attendeeEmail
    ? `${opts.description}\n\nClient email: ${opts.attendeeEmail}`
    : opts.description;

  // Service accounts cannot invite external attendees without domain-wide delegation.
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=none`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: opts.summary,
        description,
        start: { dateTime: opts.startLocal, timeZone: TZ },
        end: { dateTime: opts.endLocal, timeZone: TZ },
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    console.error("[googleCalendar] create event error:", data);
    throw new Error(data?.error?.message || "Failed to create calendar event");
  }

  return { eventId: data.id as string, htmlLink: data.htmlLink as string | undefined };
}
