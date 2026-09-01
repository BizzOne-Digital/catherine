import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { getBookableService } from "@/lib/bookableServices";
import { createCalendarEvent, fetchBusyPeriodsSafe } from "@/lib/googleCalendar";
import {
  generateSlotsForDay,
  torontoLocalToUtc,
  formatLocalDateTime,
} from "@/lib/bookingSlots";
import { sendAppointmentConfirmationEmails } from "@/lib/email";
import { addMinutes } from "date-fns";

export async function computeEndLocal(
  startLocal: string,
  durationMinutes: number
): Promise<string> {
  const [datePart, timePart] = startLocal.split("T");
  const [h, m] = timePart.split(":").map(Number);
  const startUtc = torontoLocalToUtc(datePart, h, m);
  const endUtc = addMinutes(startUtc, durationMinutes);
  const endParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(endUtc);
  const eh = Number(endParts.find((p) => p.type === "hour")?.value);
  const em = Number(endParts.find((p) => p.type === "minute")?.value);
  return formatLocalDateTime(datePart, eh, em);
}

export async function validateSlotAvailable(
  serviceId: string,
  startLocal: string
): Promise<{ ok: true; endLocal: string } | { ok: false; error: string }> {
  const service = getBookableService(serviceId);
  if (!service) return { ok: false, error: "Invalid service" };

  const [datePart, timePart] = startLocal.split("T");
  if (!datePart || !timePart) return { ok: false, error: "Invalid time" };

  const endLocal = await computeEndLocal(startLocal, service.durationMinutes);
  const dayStart = torontoLocalToUtc(datePart, 0, 0);
  const dayEnd = addMinutes(dayStart, 24 * 60);
  const busy = await fetchBusyPeriodsSafe(dayStart, dayEnd);
  const slots = generateSlotsForDay(datePart, service.durationMinutes, busy);

  if (!slots.includes(startLocal)) {
    return {
      ok: false,
      error: "This time is no longer available. Please choose another slot.",
    };
  }

  return { ok: true, endLocal };
}

export async function fulfillAppointmentFromStripeSession(
  sessionId: string
): Promise<{ appointmentId: string; emailSent: boolean; calendarSynced: boolean } | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  const { getStripe } = await import("@/lib/stripe");
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") return null;
  if (session.metadata?.type !== "appointment") return null;

  await connectDB();

  let appointment = await Appointment.findOne({ stripeSessionId: session.id });
  if (!appointment && session.metadata?.appointmentId) {
    appointment = await Appointment.findById(session.metadata.appointmentId);
  }
  if (!appointment) return null;

  appointment.paymentStatus = "paid";
  if (appointment.status !== "confirmed") {
    appointment.status = "confirmed";
  }

  let calendarSynced = Boolean(appointment.googleEventId);

  if (!appointment.googleEventId) {
    try {
      const { eventId, htmlLink } = await createCalendarEvent({
        summary: `${appointment.serviceName} — ${appointment.customerName}`,
        description: [
          `Phone: ${appointment.phone}`,
          `Email: ${appointment.email}`,
          `Deposit paid: $${appointment.depositAmount} CAD`,
          `Booking ID: ${appointment._id}`,
          "",
          "Booked via luminamedispa.ca",
        ].join("\n"),
        startLocal: appointment.startLocal,
        endLocal: appointment.endLocal,
        attendeeEmail: appointment.email,
      });
      appointment.googleEventId = eventId;
      appointment.googleEventLink = htmlLink || "";
      calendarSynced = true;
    } catch (err) {
      console.error("[appointment] Google Calendar sync failed:", err);
    }
  }

  let emailSent = Boolean(appointment.emailSent);
  if (!emailSent) {
    try {
      await sendAppointmentConfirmationEmails({
        customerName: appointment.customerName,
        email: appointment.email,
        phone: appointment.phone,
        serviceName: appointment.serviceName,
        startLocal: appointment.startLocal,
        endLocal: appointment.endLocal,
        depositAmount: appointment.depositAmount,
        appointmentId: appointment._id.toString(),
      });
      appointment.emailSent = true;
      emailSent = true;
    } catch (err) {
      console.error("[appointment] Confirmation email failed:", err);
    }
  }

  await appointment.save();

  return {
    appointmentId: appointment._id.toString(),
    emailSent,
    calendarSynced,
  };
}
