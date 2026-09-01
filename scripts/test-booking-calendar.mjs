/**
 * Test Google Calendar booking integration locally.
 * Usage: node scripts/test-booking-calendar.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const envPath = resolve(root, ".env.local");
  try {
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
}

loadEnv();

const { getGoogleAccessToken, getGoogleCalendarId } = await import(
  "../lib/googleAuth.ts"
);
const { fetchBusyPeriods, createCalendarEvent } = await import(
  "../lib/googleCalendar.ts"
);
const { generateSlotsForDay, torontoLocalToUtc } = await import(
  "../lib/bookingSlots.ts"
);
const { addMinutes } = await import("date-fns");

console.log("Calendar ID:", getGoogleCalendarId());

try {
  await getGoogleAccessToken();
  console.log("✓ Google auth OK");
} catch (err) {
  console.error("✗ Google auth failed:", err.message);
  process.exit(1);
}

const now = new Date();
const torontoDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(now);

const dayStart = torontoLocalToUtc(torontoDate, 0, 0);
const dayEnd = addMinutes(dayStart, 24 * 60);

try {
  const busy = await fetchBusyPeriods(dayStart, dayEnd);
  const slots = generateSlotsForDay(torontoDate, 30, busy);
  console.log(`✓ Calendar read OK — ${slots.length} slots today, ${busy.length} busy blocks`);
  if (slots.length) {
    console.log("  Sample:", slots[0], "…", slots[slots.length - 1]);
  }
} catch (err) {
  console.error("✗ Calendar read failed:", err.message);
  process.exit(1);
}

console.log("Done. Booking calendar integration is configured.");
