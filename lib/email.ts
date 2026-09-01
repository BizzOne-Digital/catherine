import nodemailer from "nodemailer";
import { getAdminInbox, SPA_INBOX } from "@/lib/adminEmail";

const SMTP_USER = process.env.SMTP_USER?.trim() || SPA_INBOX;

function getTransporter() {
  const pass = process.env.SMTP_PASS?.trim();
  if (!pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_PASS (Gmail App Password) in .env.local / Vercel."
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass,
    },
  });
}

function money(n: number) {
  return `$${Number(n || 0).toFixed(2)} CAD`;
}

function escapeHtml(s: string) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  interestedService?: string;
  message: string;
  source?: string;
}) {
  const transporter = getTransporter();
  const isLead = data.source === "lead_popup";
  const to = getAdminInbox();

  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${SMTP_USER}>`,
    to,
    replyTo: data.email,
    subject: isLead
      ? `New Lead Capture from ${data.name}`
      : `New Contact Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">Lumina Medi Spa</h1>
          <p style="color: #A99782; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">${
            isLead ? "Lead Capture Pop-up" : "New Contact Inquiry"
          }</p>
        </div>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 24px;">
          <p><strong style="color: #D6B56D;">Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong style="color: #D6B56D;">Email:</strong> ${escapeHtml(data.email)}</p>
          ${data.phone ? `<p><strong style="color: #D6B56D;">Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
          ${data.location ? `<p><strong style="color: #D6B56D;">Location:</strong> ${escapeHtml(data.location)}</p>` : ""}
          ${data.interestedService ? `<p><strong style="color: #D6B56D;">Offer / Service:</strong> ${escapeHtml(data.interestedService)}</p>` : ""}
          <p><strong style="color: #D6B56D;">Message:</strong></p>
          <p style="color: #A99782;">${escapeHtml(data.message)}</p>
        </div>
      </div>
    `,
  });
}

export async function sendBookingEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  treatmentInterest: string;
  preferredDate?: string;
  preferredTime?: string;
  clientType: string;
  message?: string;
}) {
  const transporter = getTransporter();
  const adminInbox = SPA_INBOX;
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${SMTP_USER}>`,
    to: adminInbox,
    replyTo: data.email,
    subject: `New Booking Inquiry from ${data.fullName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">Lumina Medi Spa</h1>
          <p style="color: #A99782; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">New Booking Inquiry</p>
        </div>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 24px;">
          <p><strong style="color: #D6B56D;">Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong style="color: #D6B56D;">Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong style="color: #D6B56D;">Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong style="color: #D6B56D;">Treatment:</strong> ${escapeHtml(data.treatmentInterest)}</p>
          ${data.preferredDate ? `<p><strong style="color: #D6B56D;">Preferred Date:</strong> ${escapeHtml(data.preferredDate)}</p>` : ""}
          ${data.preferredTime ? `<p><strong style="color: #D6B56D;">Preferred Time:</strong> ${escapeHtml(data.preferredTime)}</p>` : ""}
          <p><strong style="color: #D6B56D;">Client Type:</strong> ${escapeHtml(data.clientType)}</p>
          ${data.message ? `<p><strong style="color: #D6B56D;">Message:</strong> ${escapeHtml(data.message)}</p>` : ""}
        </div>
      </div>
    `,
  });
}

export async function sendAppointmentConfirmationEmails(data: {
  customerName: string;
  email: string;
  phone: string;
  serviceName: string;
  startLocal: string;
  endLocal: string;
  depositAmount: number;
  appointmentId: string;
}) {
  const transporter = getTransporter();
  const adminInbox = SPA_INBOX;
  const when = data.startLocal.replace("T", " at ").slice(0, 16);

  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${SMTP_USER}>`,
    to: data.email,
    subject: "Your Lumina Medi Spa appointment is confirmed",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 26px;">Appointment Confirmed</h1>
        <p style="color: #A99782; margin-top: 12px;">Thank you, ${escapeHtml(data.customerName)}!</p>
        <div style="margin-top: 24px; padding: 20px; border: 1px solid rgba(214,181,109,0.25); border-radius: 8px;">
          <p><strong style="color: #D6B56D;">Treatment:</strong> ${escapeHtml(data.serviceName)}</p>
          <p><strong style="color: #D6B56D;">When:</strong> ${escapeHtml(when)} (Eastern Time)</p>
          <p><strong style="color: #D6B56D;">Deposit paid:</strong> $${data.depositAmount.toFixed(2)} CAD</p>
          <p style="margin-top: 16px; color: #A99782; font-size: 13px;">
            Your appointment has been added to our clinic calendar. Cancellations with less than 12 hours notice may be charged 100% of the service fee per our no-show policy.
          </p>
        </div>
        <p style="margin-top: 20px; color: #A99782; font-size: 12px;">Reference: ${escapeHtml(data.appointmentId)}</p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${SMTP_USER}>`,
    to: adminInbox,
    replyTo: data.email,
    subject: `New Online Booking — ${data.customerName} — ${data.serviceName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">New Online Booking</h1>
        <div style="margin-top: 20px; padding: 20px; border: 1px solid rgba(214,181,109,0.25); border-radius: 8px;">
          <p><strong style="color: #D6B56D;">Name:</strong> ${escapeHtml(data.customerName)}</p>
          <p><strong style="color: #D6B56D;">Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong style="color: #D6B56D;">Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong style="color: #D6B56D;">Treatment:</strong> ${escapeHtml(data.serviceName)}</p>
          <p><strong style="color: #D6B56D;">Start:</strong> ${escapeHtml(data.startLocal)}</p>
          <p><strong style="color: #D6B56D;">End:</strong> ${escapeHtml(data.endLocal)}</p>
          <p><strong style="color: #D6B56D;">Deposit:</strong> $${data.depositAmount.toFixed(2)} CAD</p>
        </div>
      </div>
    `,
  });
}

export type OrderEmailData = {
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number;
  tax: number;
  total: number;
  orderId: string;
  stripeSessionId?: string;
};

function orderItemsRows(items: OrderEmailData["items"]) {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; color: #E8D8C3; border-bottom: 1px solid rgba(214,181,109,0.1);">${escapeHtml(item.name)}</td>
        <td style="padding: 8px; color: #E8D8C3; text-align: center; border-bottom: 1px solid rgba(214,181,109,0.1);">${item.quantity}</td>
        <td style="padding: 8px; color: #D6B56D; text-align: right; border-bottom: 1px solid rgba(214,181,109,0.1);">${money(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");
}

function totalsFooter(data: OrderEmailData) {
  return `
    <tr>
      <td colspan="2" style="padding: 8px; color: #A99782;">Subtotal</td>
      <td style="padding: 8px; color: #E8D8C3; text-align: right;">${money(data.subtotal)}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 8px; color: #A99782;">HST (13%)</td>
      <td style="padding: 8px; color: #E8D8C3; text-align: right;">${money(data.tax)}</td>
    </tr>
    <tr style="border-top: 1px solid rgba(214,181,109,0.3);">
      <td colspan="2" style="padding: 12px; font-weight: bold; color: #D6B56D;">Total Paid</td>
      <td style="padding: 12px; font-weight: bold; color: #D6B56D; text-align: right;">${money(data.total)}</td>
    </tr>`;
}

/** Customer thank-you + detailed admin notification (to Luminamedispa@gmail.com). */
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const transporter = getTransporter();
  const itemsHtml = orderItemsRows(data.items);
  const totalsHtml = totalsFooter(data);

  // Customer confirmation
  if (data.email) {
    await transporter.sendMail({
      from: `"Lumina Medi Spa" <${SMTP_USER}>`,
      to: data.email,
      subject: "Thank you for your order — Lumina Medi Spa",
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 28px;">Thank You, ${escapeHtml(data.customerName)}</h1>
            <p style="color: #A99782; margin-top: 8px;">Your order has been confirmed and payment received.</p>
            <p style="color: #A99782; font-size: 13px;">We appreciate your purchase from Lumina Medi Spa.</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(214,181,109,0.2);">
                <th style="padding: 8px; color: #D6B56D; text-align: left;">Product</th>
                <th style="padding: 8px; color: #D6B56D; text-align: center;">Qty</th>
                <th style="padding: 8px; color: #D6B56D; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>${totalsHtml}</tfoot>
          </table>
          ${
            data.shippingAddress
              ? `<p style="color: #A99782; margin-top: 20px; font-size: 13px;"><strong style="color:#D6B56D;">Shipping to:</strong><br/>${escapeHtml(data.shippingAddress)}</p>`
              : ""
          }
          <p style="color: #A99782; margin-top: 20px; font-size: 12px;">Order ID: ${escapeHtml(data.orderId)}</p>
          <p style="color: #A99782; font-size: 12px; margin-top: 8px;">Questions? Reply to this email or contact Luminamedispa@gmail.com</p>
        </div>
      `,
    });
  }

  // Admin notification — full customer + order detail
  const adminInbox = getAdminInbox();
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${SMTP_USER}>`,
    to: adminInbox,
    replyTo: data.email || undefined,
    subject: `New Shop Order — ${data.customerName} — ${money(data.total)}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 640px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">New Shop Order</h1>
          <p style="color: #A99782; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Lumina Medi Spa Admin</p>
        </div>

        <h2 style="color: #D6B56D; font-size: 16px; margin: 0 0 12px;">Customer Details</h2>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 6px 0;"><strong style="color: #D6B56D;">Name:</strong> ${escapeHtml(data.customerName)}</p>
          <p style="margin: 6px 0;"><strong style="color: #D6B56D;">Email:</strong> ${escapeHtml(data.email)}</p>
          <p style="margin: 6px 0;"><strong style="color: #D6B56D;">Phone:</strong> ${escapeHtml(data.phone || "—")}</p>
          <p style="margin: 6px 0;"><strong style="color: #D6B56D;">Shipping Address:</strong><br/>${escapeHtml(data.shippingAddress || "—")}</p>
          <p style="margin: 6px 0;"><strong style="color: #D6B56D;">Billing Address:</strong><br/>${escapeHtml(data.billingAddress || "—")}</p>
        </div>

        <h2 style="color: #D6B56D; font-size: 16px; margin: 0 0 12px;">Order Details</h2>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 20px;">
          <p style="margin: 0 0 12px; font-size: 12px; color: #A99782;">Order ID: ${escapeHtml(data.orderId)}${
            data.stripeSessionId
              ? `<br/>Stripe Session: ${escapeHtml(data.stripeSessionId)}`
              : ""
          }</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(214,181,109,0.2);">
                <th style="padding: 8px; color: #D6B56D; text-align: left;">Product</th>
                <th style="padding: 8px; color: #D6B56D; text-align: center;">Qty</th>
                <th style="padding: 8px; color: #D6B56D; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>${totalsHtml}</tfoot>
          </table>
          <p style="margin-top: 16px; color: #A99782; font-size: 13px;">View &amp; manage this order in Admin → Orders.</p>
        </div>
      </div>
    `,
  });
}

/** Verify SMTP credentials (optional health check). */
export async function verifySmtpConnection() {
  const transporter = getTransporter();
  await transporter.verify();
}
