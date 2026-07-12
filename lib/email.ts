import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "catherinezhang01@outlook.com";

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  interestedService?: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Contact Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">Lumina Medi Spa</h1>
          <p style="color: #A99782; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">New Contact Inquiry</p>
        </div>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 24px;">
          <p><strong style="color: #D6B56D;">Name:</strong> ${data.name}</p>
          <p><strong style="color: #D6B56D;">Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong style="color: #D6B56D;">Phone:</strong> ${data.phone}</p>` : ""}
          ${data.interestedService ? `<p><strong style="color: #D6B56D;">Service Interest:</strong> ${data.interestedService}</p>` : ""}
          <p><strong style="color: #D6B56D;">Message:</strong></p>
          <p style="color: #A99782;">${data.message}</p>
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
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Booking Inquiry from ${data.fullName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 24px;">Lumina Medi Spa</h1>
          <p style="color: #A99782; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">New Booking Inquiry</p>
        </div>
        <div style="background: rgba(214, 181, 109, 0.05); border: 1px solid rgba(214, 181, 109, 0.2); border-radius: 8px; padding: 24px;">
          <p><strong style="color: #D6B56D;">Name:</strong> ${data.fullName}</p>
          <p><strong style="color: #D6B56D;">Email:</strong> ${data.email}</p>
          <p><strong style="color: #D6B56D;">Phone:</strong> ${data.phone}</p>
          <p><strong style="color: #D6B56D;">Treatment:</strong> ${data.treatmentInterest}</p>
          ${data.preferredDate ? `<p><strong style="color: #D6B56D;">Preferred Date:</strong> ${data.preferredDate}</p>` : ""}
          ${data.preferredTime ? `<p><strong style="color: #D6B56D;">Preferred Time:</strong> ${data.preferredTime}</p>` : ""}
          <p><strong style="color: #D6B56D;">Client Type:</strong> ${data.clientType}</p>
          ${data.message ? `<p><strong style="color: #D6B56D;">Message:</strong> ${data.message}</p>` : ""}
        </div>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(data: {
  customerName: string;
  email: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  orderId: string;
}) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; color: #E8D8C3;">${item.name}</td>
        <td style="padding: 8px; color: #E8D8C3; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; color: #D6B56D; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  // Email to customer
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Order Confirmation — Lumina Medi Spa",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #15110D; color: #E8D8C3; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D6B56D; font-family: 'Playfair Display', serif; font-size: 28px;">Thank You, ${data.customerName}</h1>
          <p style="color: #A99782;">Your order has been confirmed.</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(214,181,109,0.2);">
              <th style="padding: 8px; color: #D6B56D; text-align: left;">Product</th>
              <th style="padding: 8px; color: #D6B56D; text-align: center;">Qty</th>
              <th style="padding: 8px; color: #D6B56D; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr style="border-top: 1px solid rgba(214,181,109,0.2);">
              <td colspan="2" style="padding: 12px; font-weight: bold; color: #D6B56D;">Total</td>
              <td style="padding: 12px; font-weight: bold; color: #D6B56D; text-align: right;">$${data.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <p style="color: #A99782; margin-top: 20px; font-size: 12px;">Order ID: ${data.orderId}</p>
      </div>
    `,
  });

  // Email to admin
  await transporter.sendMail({
    from: `"Lumina Medi Spa" <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Order from ${data.customerName}`,
    html: `<p>New order received from ${data.customerName} (${data.email}). Total: $${data.total.toFixed(2)}. Order ID: ${data.orderId}</p>`,
  });
}
