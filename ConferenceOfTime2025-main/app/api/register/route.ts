import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, language } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const LogoPath = process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/logo.png`
        : path.join(process.cwd(), "public", "logo.png");

    const html =
        language === "en"
            ? `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Conference of Time 2025 – Confirmation</title>
    <style>
      body { margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;color:#333; }
      .container { max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1); }
      .header { background:#000000;padding:20px;text-align:center;color:#fff; }
      .header img { max-width:120px;margin-bottom:10px; }
      .content { padding:30px; }
      .button { display:inline-block;padding:12px 24px;font-size:16px;color:#fff;background:#472915;text-decoration:none;border-radius:30px;font-weight:bold; }
      .footer { background:#000000;padding:15px;text-align:center;color:#fff;font-size:12px; }
      @media (prefers-color-scheme: dark) {
        body { background:#121212 !important;color:#ddd !important; }
        .container { background:#1e1e1e !important;box-shadow:none !important; }
        .header { background:#000 !important;color:#fff !important; }
        .content { color:#ddd !important; }
        .footer { background:#000 !important;color:#aaa !important; }
        .button { background:#472915 !important; }
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header">
          <img src="cid:logo" alt="Conference of Time 2025" />
        </td>
      </tr>
      <tr>
        <td class="content">
          <h2>Dear ${firstName},</h2>
          <p>Thank you for registering for the <strong>Conference of Time 2025</strong>! 🎉</p>
          <p>The event will take place <strong>September 20–22, 2025</strong> at the <em>South Bohemian Museum</em> in České Budějovice.</p>
          <p>We’re excited to welcome you and look forward to inspiring discussions on how the world would look without watches.</p>
          <p style="text-align:center;margin:30px 0;">
            <a href="https://example.com/program" target="_blank" class="button">View Program</a>
          </p>
          <p style="font-size:14px;color:#777;">If you have any questions, simply reply to this email.</p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          © 2025 Conference of Time · South Bohemian Museum, České Budějovice
        </td>
      </tr>
    </table>
  </body>
</html>
`
            : `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Konference času 2025 – Potvrzení registrace</title>
    <style>
      body { margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;color:#333; }
      .container { max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1); }
      .header { background:#000000;padding:20px;text-align:center;color:#fff; }
      .header img { max-width:120px;margin-bottom:10px; }
      .content { padding:30px; }
      .button { display:inline-block;padding:12px 24px;font-size:16px;color:#fff;background:#472915;text-decoration:none;border-radius:30px;font-weight:bold; }
      .footer { background:#000000;padding:15px;text-align:center;color:#fff;font-size:12px; }
      @media (prefers-color-scheme: dark) {
        body { background:#121212 !important;color:#ddd !important; }
        .container { background:#1e1e1e !important;box-shadow:none !important; }
        .header { background:#000 !important;color:#fff !important; }
        .content { color:#ddd !important; }
        .footer { background:#000 !important;color:#aaa !important; }
        .button { background:#472915 !important; }
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header">
          <img src="cid:logo" alt="Konference času 2025" />
        </td>
      </tr>
      <tr>
        <td class="content">
          <h2>Vážený/á ${firstName},</h2>
          <p>Děkujeme za registraci na <strong>Konferenci času 2025</strong>! 🎉</p>
          <p>Událost se koná <strong>20.–22. září 2025</strong> v <em>Jihočeském muzeu</em> v Českých Budějovicích.</p>
          <p>Těšíme se na vás a na inspirativní diskuse o tom, jak by vypadal svět bez hodinek.</p>
          <p style="text-align:center;margin:30px 0;">
            <a href="https://example.com/program" target="_blank" class="button">Zobrazit program</a>
          </p>
          <p style="font-size:14px;color:#777;">Máte dotazy? Stačí odpovědět na tento e-mail.</p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          © 2025 Konference času
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: language === "en"
          ? "Conference of Time 2025 – Registration Confirmation"
          : "Konference času 2025 – potvrzení registrace",
      html,
      attachments: [
        {
          filename: "logo.png",
          path: LogoPath,
          cid: "logo", // stejné jako v <img src="cid:logo">
        },
      ],
    });

    console.log("Message sent:", info.messageId);

    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 });
  }
}
