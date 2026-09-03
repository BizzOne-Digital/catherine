import crypto from "crypto";

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function getServiceAccountCredentials(): ServiceAccount {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON is not configured. Add the service account JSON in Vercel env."
    );
  }

  let jsonText = raw;
  if (
    (jsonText.startsWith("'") && jsonText.endsWith("'")) ||
    (jsonText.startsWith('"') && jsonText.endsWith('"'))
  ) {
    jsonText = jsonText.slice(1, -1);
  }

  const parsed = JSON.parse(jsonText) as ServiceAccount;
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON — missing client_email or private_key");
  }
  parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  return parsed;
}

export function getGoogleCalendarId() {
  const id =
    process.env.GOOGLE_CALENDAR_ID?.trim() || "luminamedispa@gmail.com";
  return id;
}

/** Primary calendar plus optional extra IDs (comma/semicolon-separated). */
export function getGoogleCalendarIds(): string[] {
  const ids = new Set<string>();
  ids.add(getGoogleCalendarId());
  const extra = process.env.GOOGLE_CALENDAR_IDS?.split(/[,;]/);
  for (const raw of extra || []) {
    const id = raw.trim();
    if (id) ids.add(id);
  }
  return [...ids];
}

export async function getGoogleAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }

  const credentials = getServiceAccountCredentials();
  const iat = Math.floor(now / 1000);
  const exp = iat + 3600;

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsigned);
  sign.end();
  const signature = sign.sign(credentials.private_key);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = (await res.json()) as { access_token?: string; error?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(data.error || "Failed to obtain Google access token");
  }

  cachedToken = { token: data.access_token, expiresAt: now + 3500 * 1000 };
  return data.access_token;
}
