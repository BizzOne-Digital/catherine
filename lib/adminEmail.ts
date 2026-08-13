/** Primary spa inbox for bookings, contact, and order notifications. */
export const SPA_INBOX = "Luminamedispa@gmail.com";

export function getAdminInbox() {
  return (
    process.env.ADMIN_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    SPA_INBOX
  );
}
