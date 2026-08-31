import { addMinutes } from "date-fns";
import type { BusyPeriod } from "@/lib/googleCalendar";

export const BOOKING_RULES = {
  timeZone: "America/Toronto",
  minNoticeHours: 12,
  maxAdvanceDays: 90,
  bufferMinutes: 10,
  slotStepMinutes: 15,
};

function getDayHours(dateStr: string): { open: number; close: number } | null {
  const [y, m, d] = dateStr.split("-").map(Number);
  const utcMid = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_RULES.timeZone,
    weekday: "long",
  }).format(utcMid).toLowerCase();

  if (["monday", "wednesday", "thursday", "friday", "saturday"].includes(weekday)) {
    return { open: 10, close: 19 };
  }
  if (["tuesday", "sunday"].includes(weekday)) {
    return { open: 10, close: 18 };
  }
  return { open: 10, close: 19 };
}

function getTorontoParts(utc: Date) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_RULES.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = f.formatToParts(utc);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value || 0);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

/** Convert Toronto local date/time to UTC Date. */
export function torontoLocalToUtc(
  dateStr: string,
  hour: number,
  minute: number
): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  let utc = new Date(Date.UTC(y, m - 1, d, hour, minute));
  for (let i = 0; i < 4; i++) {
    const parts = getTorontoParts(utc);
    const diffMin =
      (hour - parts.hour) * 60 + (minute - parts.minute) + (d - parts.day) * 1440;
    if (diffMin === 0) break;
    utc = new Date(utc.getTime() - diffMin * 60 * 1000);
  }
  return utc;
}

export function formatLocalDateTime(dateStr: string, hour: number, minute: number) {
  return `${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

function overlaps(
  start: Date,
  end: Date,
  busy: BusyPeriod[],
  bufferMin: number
): boolean {
  const bufMs = bufferMin * 60 * 1000;
  const s = start.getTime() - bufMs;
  const e = end.getTime() + bufMs;
  return busy.some((b) => b.start.getTime() < e && b.end.getTime() > s);
}

export function generateSlotsForDay(
  dateStr: string,
  durationMinutes: number,
  busy: BusyPeriod[]
): string[] {
  const hours = getDayHours(dateStr);
  if (!hours) return [];

  const now = new Date();
  const minStart = addMinutes(now, BOOKING_RULES.minNoticeHours * 60);
  const maxDate = addMinutes(now, BOOKING_RULES.maxAdvanceDays * 24 * 60);
  const dayStart = torontoLocalToUtc(dateStr, 0, 0);
  if (dayStart > maxDate) return [];

  const slots: string[] = [];
  const { open, close } = hours;
  const lastStartMinute = close * 60 - durationMinutes;
  if (lastStartMinute < open * 60) return [];

  for (let mins = open * 60; mins <= lastStartMinute; mins += BOOKING_RULES.slotStepMinutes) {
    const hour = Math.floor(mins / 60);
    const minute = mins % 60;
    const start = torontoLocalToUtc(dateStr, hour, minute);
    const end = addMinutes(start, durationMinutes);

    if (start < minStart) continue;
    if (start > maxDate) continue;
    if (overlaps(start, end, busy, BOOKING_RULES.bufferMinutes)) continue;

    slots.push(formatLocalDateTime(dateStr, hour, minute));
  }

  return slots;
}

export function formatSlotLabel(localDateTime: string) {
  const [datePart, timePart] = localDateTime.split("T");
  const [h, m] = timePart.split(":").map(Number);
  const utc = torontoLocalToUtc(datePart, h, m);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_RULES.timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(utc);
}
