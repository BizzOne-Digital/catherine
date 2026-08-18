/** Primary spa inbox for bookings, contact, and order notifications. */
export const SPA_INBOX = "Luminamedispa@gmail.com";

/** Spa inbox for all customer inquiry / order notifications (never the dev login email). */
export function getAdminInbox() {
  return SPA_INBOX;
}
