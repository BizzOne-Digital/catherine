/** Lumina Medi Spa business hours (America/Toronto). */

export const BUSINESS_HOURS = {
  timeZone: "America/Toronto",
  /** Opening hour (24h, local). */
  openHour: 10,
  /** Mon–Sat closing hour (24h). Last bookable start depends on treatment duration. */
  closeHourMonSat: 19,
  /** Sunday closing hour (24h). */
  closeHourSunday: 18,
} as const;

export const DEFAULT_HOURS_MON_FRI = "10 am – 7 pm";
export const DEFAULT_HOURS_SAT = "10 am – 7 pm";
export const DEFAULT_HOURS_SUN = "10 am – 6 pm";

export function isPlaceholderHoursText(value: string | undefined | null): boolean {
  const v = String(value || "").trim();
  if (!v) return true;
  return /call for information/i.test(v);
}

/** Booking slot close hour for a weekday name (lowercase, e.g. "monday"). */
export function getCloseHourForWeekday(weekday: string): number {
  return weekday === "sunday"
    ? BUSINESS_HOURS.closeHourSunday
    : BUSINESS_HOURS.closeHourMonSat;
}
