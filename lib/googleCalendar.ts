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
  const busy = cal?.busy || [];
  return busy.map((b: { start: string; end: string }) => ({
    start: new Date(b.start),
    end: new Date(b.end),
  }));
}

export async function createCalendarEvent(opts: {
  summary: string;
  description: string;
  startLocal: string;
  endLocal: string;
  attendeeEmail: string;
}) {
  const token = await getGoogleAccessToken();
  const calendarId = getGoogleCalendarId();

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: opts.summary,
        description: opts.description,
        start: { dateTime: opts.startLocal, timeZone: TZ },
        end: { dateTime: opts.endLocal, timeZone: TZ },
        attendees: [{ email: opts.attendeeEmail }],
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
