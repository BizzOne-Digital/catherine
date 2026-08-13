import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const env = {};

for (const line of readFileSync(resolve(root, ".env.local"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
}

const user = env.SMTP_USER || "Luminamedispa@gmail.com";
const pass = env.SMTP_PASS;
const to = "Luminamedispa@gmail.com";

if (!pass) {
  console.error("FAIL: SMTP_PASS missing in .env.local");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.gmail.com",
  port: Number(env.SMTP_PORT || 587),
  secure: false,
  requireTLS: true,
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log("SMTP connection: OK");

  const info = await transporter.sendMail({
    from: `"Lumina Medi Spa" <${user}>`,
    to,
    subject: "TEST — Booking inquiry email check",
    text: "This is a test booking notification. If you received this, booking emails are working.",
    html: "<p>This is a <strong>test booking notification</strong>. If you received this, booking emails to Luminamedispa@gmail.com are working.</p>",
  });

  console.log("OK: Test booking email sent to", to);
  console.log("Message ID:", info.messageId);
} catch (err) {
  console.error("FAIL:", err.message || err);
  process.exit(1);
}
