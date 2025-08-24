interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface RegistrationData {
  id: string
  firstName: string
  lastName: string
  email: string
  company?: string
  position?: string
  country?: string
  phone?: string
  dietaryRequirements?: string
  newsletter: boolean
  registeredAt: string
}

export class EmailService {
  private static instance: EmailService

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendConfirmationEmail(registration: RegistrationData, language: "en" | "cs" = "en"): Promise<boolean> {
    try {
      const template = this.generateConfirmationTemplate(registration, language)

      // In a real application, you would integrate with an email service like:
      // - Resend, SendGrid, Mailgun, AWS SES, etc.
      // For now, we'll simulate sending and log the email

      console.log("📧 Sending confirmation email...")
      console.log("To:", registration.email)
      console.log("Subject:", template.subject)
      console.log("HTML Content:", template.html)

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In production, replace this with actual email service integration:
      /*
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'noreply@techfuture2024.com',
          to: registration.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        }),
      })
      
      return response.ok
      */

      console.log("✅ Email sent successfully (simulated)")
      return true
    } catch (error) {
      console.error("❌ Failed to send confirmation email:", error)
      return false
    }
  }

  private generateConfirmationTemplate(registration: RegistrationData, language: "en" | "cs"): EmailTemplate {
    const content = {
      en: {
        subject: "Registration Confirmed - TechFuture Conference 2024",
        greeting: `Dear ${registration.firstName} ${registration.lastName},`,
        title: "Registration Confirmed!",
        message:
          "Thank you for registering for TechFuture Conference 2024. We are excited to have you join us in Prague!",
        details: "Event Details:",
        date: "Date: March 15-17, 2024",
        location: "Location: Prague Convention Center, Czech Republic",
        nextSteps: "What's Next:",
        step1: "• You will receive additional information about the venue and schedule closer to the event date",
        step2: "• Please save this email for your records",
        step3: "• If you have any questions, feel free to contact us",
        contact: "Contact Information:",
        email: "Email: info@techfuture2024.com",
        phone: "Phone: +420 123 456 789",
        footer: "We look forward to seeing you at TechFuture Conference 2024!",
        signature: "Best regards,<br>The TechFuture Conference Team",
        registrationId: `Registration ID: ${registration.id}`,
      },
      cs: {
        subject: "Registrace potvrzena - Konference TechFuture 2024",
        greeting: `Vážený/á ${registration.firstName} ${registration.lastName},`,
        title: "Registrace potvrzena!",
        message: "Děkujeme za registraci na konferenci TechFuture 2024. Těšíme se, že se k nám připojíte v Praze!",
        details: "Detaily akce:",
        date: "Datum: 15.-17. března 2024",
        location: "Místo: Prague Convention Center, Česká republika",
        nextSteps: "Další kroky:",
        step1: "• Další informace o místě konání a programu obdržíte blíže k datu akce",
        step2: "• Prosím uschovejte si tento e-mail pro své záznamy",
        step3: "• Pokud máte jakékoli otázky, neváhejte nás kontaktovat",
        contact: "Kontaktní informace:",
        email: "E-mail: info@techfuture2024.com",
        phone: "Telefon: +420 123 456 789",
        footer: "Těšíme se na vás na konferenci TechFuture 2024!",
        signature: "S pozdravem,<br>Tým konference TechFuture",
        registrationId: `ID registrace: ${registration.id}`,
      },
    }

    const t = content[language]

    const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #6366f1;
        }
        .title {
            color: #374151;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }
        .subtitle {
            color: #6366f1;
            font-size: 18px;
            margin: 10px 0 0 0;
        }
        .content {
            margin: 30px 0;
        }
        .section {
            margin: 25px 0;
        }
        .section-title {
            color: #374151;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .details {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #6366f1;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .registration-id {
            background-color: #f3f4f6;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            margin-top: 20px;
        }
        ul {
            padding-left: 0;
            list-style: none;
        }
        li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">TechFuture 2024</h1>
            <p class="subtitle">${t.title}</p>
        </div>
        
        <div class="content">
            <p>${t.greeting}</p>
            <p>${t.message}</p>
            
            <div class="section">
                <h3 class="section-title">${t.details}</h3>
                <div class="details">
                    <p><strong>${t.date}</strong></p>
                    <p><strong>${t.location}</strong></p>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">${t.nextSteps}</h3>
                <ul>
                    <li>${t.step1}</li>
                    <li>${t.step2}</li>
                    <li>${t.step3}</li>
                </ul>
            </div>
            
            <div class="section">
                <h3 class="section-title">${t.contact}</h3>
                <p>${t.email}</p>
                <p>${t.phone}</p>
            </div>
            
            <p>${t.footer}</p>
            <p>${t.signature}</p>
        </div>
        
        <div class="registration-id">
            ${t.registrationId}
        </div>
        
        <div class="footer">
            <p>&copy; 2024 TechFuture Conference. ${language === "en" ? "All rights reserved." : "Všechna práva vyhrazena."}</p>
        </div>
    </div>
</body>
</html>
    `

    const text = `
${t.greeting}

${t.title}

${t.message}

${t.details}
${t.date}
${t.location}

${t.nextSteps}
${t.step1}
${t.step2}
${t.step3}

${t.contact}
${t.email}
${t.phone}

${t.footer}

${t.signature.replace("<br>", "\n")}

${t.registrationId}

© 2024 TechFuture Conference. ${language === "en" ? "All rights reserved." : "Všechna práva vyhrazena."}
    `

    return {
      subject: t.subject,
      html: html.trim(),
      text: text.trim(),
    }
  }
}
