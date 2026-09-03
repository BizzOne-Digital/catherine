import {
  getGoogleAccessToken,
  getGoogleCalendarId,
  getGoogleCalendarIds,
} from "@/lib/googleAuth";

const TZ = "America/Toronto";

export type BusyPeriod = { start: Date; end: Date };

function mapBusyEntries(busy: { start: string; end: string }[]): BusyPeriod[] {
  return busy.map((b) => ({
    start: new Date(b.start),
    end: new Date(b.end),
  }));
}

export async function fetchBusyPeriods(timeMin: Date, timeMax: Date): Promise<BusyPeriod[]> {
  const token = await getGoogleAccessToken();
  const calendarIds = getGoogleCalendarIds();

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
      items: calendarIds.map((id) => ({ id })),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[googleCalendar] freeBusy error:", data);
    throw new Error(data?.error?.message || "Failed to read calendar availability");
  }

  const calendars = data.calendars || {};
  const allBusy: BusyPeriod[] = [];
  const missing: string[] = [];

  for (const calendarId of calendarIds) {
    const cal = calendars[calendarId];
    if (!cal) {
      missing.push(calendarId);
      continue;
    }
    allBusy.push(...mapBusyEntries(cal.busy || []));
  }

  if (missing.length === calendarIds.length) {
    console.error(
      "[googleCalendar] No calendars in freeBusy response:",
      calendarIds,
      Object.keys(calendars)
    );
    throw new Error(
      "Google Calendar is not accessible. Share luminamedispa@gmail.com with the service account (Make changes to events)."
    );
  }

  if (missing.length) {
    console.warn("[googleCalendar] Some calendars missing from freeBusy:", missing);
  }

  return allBusy;
}

/** List timed events (supplement to freeBusy — catches events freeBusy may miss). */
export async function fetchEventBusyPeriods(
  timeMin: Date,
  timeMax: Date
): Promise<BusyPeriod[]> {
  const token = await getGoogleAccessToken();
  const periods: BusyPeriod[] = [];

  for (const calendarId of getGoogleCalendarIds()) {
    const params = new URLSearchParams({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "250",
    });

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("[googleCalendar] events.list error:", calendarId, data);
      throw new Error(data?.error?.message || "Failed to list calendar events");
    }

    for (const event of data.items || []) {
      if (event.status === "cancelled") continue;
      if (event.transparency === "transparent") continue;

      const startRaw = event.start?.dateTime || event.start?.date;
      const endRaw = event.end?.dateTime || event.end?.date;
      if (!startRaw || !endRaw) continue;

      const start = new Date(startRaw);
      const end = new Date(endRaw);
      if (start < timeMax && end > timeMin) {
        periods.push({ start, end });
      }
    }
  }

  return periods;
}

/** Merge freeBusy + events.list so manual and synced appointments both block slots. */
export async function fetchGoogleBusyPeriods(timeMin: Date, timeMax: Date): Promise<BusyPeriod[]> {
  const [freeBusy, events] = await Promise.all([
    fetchBusyPeriods(timeMin, timeMax),
    fetchEventBusyPeriods(timeMin, timeMax),
  ]);
  return [...freeBusy, ...events];
}

/** Read busy periods; returns empty list if calendar is unreachable (diagnostics only). */
export async function fetchBusyPeriodsSafe(
  timeMin: Date,
  timeMax: Date
): Promise<BusyPeriod[]> {
  try {
    return await fetchGoogleBusyPeriods(timeMin, timeMax);
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
