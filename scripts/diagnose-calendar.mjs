/**
 * Diagnose Google Calendar access — lists all calendars + events the service account sees.
 * Usage: node scripts/diagnose-calendar.mjs [YYYY-MM-DD]
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TZ = "America/Toronto";

function loadEnv() {
  const text = readFileSync(resolve(root, ".env.local"), "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

function base64url(input) {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function getToken() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const sa = JSON.parse(raw);
  sa.private_key = sa.private_key.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  )}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsigned);
  sign.end();
  const jwt = `${unsigned}.${base64url(sign.sign(sa.private_key))}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(data.error || "auth failed");
  return { token: data.access_token, email: sa.client_email };
}

function torontoToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function torontoLocalToUtc(dateStr, hour, minute) {
  const [y, m, d] = dateStr.split("-").map(Number);
  let utcMs = Date.UTC(y, m - 1, d, hour, minute);
  for (let i = 0; i < 8; i++) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date(utcMs));
    const get = (t) => Number(parts.find((p) => p.type === t)?.value || 0);
    const diffMin = (hour - get("hour")) * 60 + (minute - get("minute")) + (d - get("day")) * 1440;
    if (diffMin === 0) break;
    utcMs += diffMin * 60 * 1000;
  }
  return new Date(utcMs);
}

loadEnv();
const dateArg = process.argv[2] || torontoToday();
const dayStart = torontoLocalToUtc(dateArg, 0, 0);
const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

console.log("Service account diagnostics for date:", dateArg);
console.log("Primary calendar ID env:", process.env.GOOGLE_CALENDAR_ID);

const { token, email } = await getToken();
console.log("Service account:", email);

// List all calendars this account can access
const listRes = await fetch(
  "https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=reader",
  { headers: { Authorization: `Bearer ${token}` } }
);
const listData = await listRes.json();
if (!listRes.ok) {
  console.error("calendarList failed:", listData);
  process.exit(1);
}

const calendars = listData.items || [];
console.log(`\nAccessible calendars (${calendars.length}):`);
for (const cal of calendars) {
  console.log(`  - ${cal.summary} (${cal.id}) primary=${cal.primary || false} access=${cal.accessRole}`);
}

const calendarIds = calendars.map((c) => c.id);
const primaryId = process.env.GOOGLE_CALENDAR_ID || "luminamedispa@gmail.com";

// freeBusy for ALL accessible calendars
const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    timeZone: TZ,
    items: calendarIds.map((id) => ({ id })),
  }),
});
const fbData = await fbRes.json();
console.log("\nfreeBusy full response keys:", Object.keys(fbData.calendars || {}));
console.log("freeBusy errors:", fbData.calendars ? Object.entries(fbData.calendars).filter(([,v]) => v.errors).map(([k,v]) => `${k}: ${JSON.stringify(v.errors)}`) : "none");
console.log("\nfreeBusy raw for primary:", JSON.stringify(fbData.calendars?.[primaryId], null, 2));

console.log("\nfreeBusy blocks (all calendars):");
for (const id of calendarIds) {
  const busy = fbData.calendars?.[id]?.busy || [];
  if (busy.length) {
    console.log(`  ${id}:`);
    for (const b of busy) console.log(`    ${b.start} → ${b.end}`);
  }
}
const primaryBusy = fbData.calendars?.[primaryId]?.busy || [];
console.log(`\nPrimary (${primaryId}) busy blocks: ${primaryBusy.length}`);

// Events on each calendar
console.log("\nTimed events (all calendars):");
for (const cal of calendars) {
  const params = new URLSearchParams({
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });
  const evRes = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const evData = await evRes.json();
  if (!evRes.ok) {
    console.log(`\n  [${cal.summary}] ERROR:`, evData.error?.message || evData);
    continue;
  }
  const events = (evData.items || []).filter((e) => e.status !== "cancelled");
  if (events.length) {
    console.log(`\n  [${cal.summary}] ${cal.id}`);
    for (const e of events) {
      const start = e.start?.dateTime || e.start?.date;
      const end = e.end?.dateTime || e.end?.date;
      console.log(`    ${e.summary}: ${start} → ${end} (transparent=${e.transparency || "opaque"})`);
    }
  }
}

// Direct query on primary even if not in calendarList
console.log("\nDirect events.list on primary ID:");
const directParams = new URLSearchParams({
  timeMin: dayStart.toISOString(),
  timeMax: dayEnd.toISOString(),
  singleEvents: "true",
  orderBy: "startTime",
  maxResults: "50",
});
const directRes = await fetch(
  `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(primaryId)}/events?${directParams}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
const directData = await directRes.json();
if (!directRes.ok) {
  console.log("  ERROR:", directData.error?.message || directData);
} else {
  console.log(`  Events found: ${(directData.items || []).length}`);
  for (const e of directData.items || []) {
    const start = e.start?.dateTime || e.start?.date;
    const end = e.end?.dateTime || e.end?.date;
    console.log(`    ${e.summary}: ${start} → ${end}`);
  }
}
