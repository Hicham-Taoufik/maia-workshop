# 📧 SMTP Setup Guide - Use Your Own Email

This guide shows you how to send emails using your own email account (Gmail, Outlook, or custom domain).

---

## Option 1: Gmail SMTP

### Requirements
- Gmail account
- 2-Factor Authentication enabled
- App-specific password

### Step 1: Enable 2FA and Get App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Name it: "MAIA Workshop"
6. Copy the 16-character password

### Step 2: Install Nodemailer

```bash
npm install nodemailer
npm install @types/nodemailer --save-dev
```

### Step 3: Update lib/email.ts

Replace entire file with:

```typescript
import { Registration } from '@/types/registration';
import nodemailer from 'nodemailer';

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // App-specific password
  },
});

export async function sendConfirmationEmail(registration: Registration): Promise<void> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('⚠️ Email credentials not configured');
      return;
    }

    await transporter.sendMail({
      from: `"MAIA 2025 Workshops" <${process.env.EMAIL_USER}>`,
      to: registration.email,
      subject: 'Workshop Registration Confirmed - MAIA 2025',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .confirmation-box { background: white; border: 2px solid #4f46e5; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
            .confirmation-number { font-size: 24px; font-weight: bold; color: #4f46e5; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Registration Confirmed!</h1>
              <p>MAIA 2025 Professional AI Workshops</p>
            </div>
            
            <div class="content">
              <p>Dear <strong>${registration.fullName}</strong>,</p>
              
              <p>Thank you for registering for the MAIA 2025 Professional AI Workshops!</p>
              
              <div class="confirmation-box">
                <p style="margin: 0; color: #6b7280;">Your Confirmation Number</p>
                <div class="confirmation-number">${registration.confirmationNumber}</div>
              </div>
              
              <h3>📅 Workshop Details</h3>
              <p><strong>Date:</strong> December 20, 2025</p>
              <p><strong>Location:</strong> ENS-Tetouan, Morocco</p>
              
              <p>We look forward to seeing you there!</p>
              
              <p>Best regards,<br/>
              MAIA 2025 Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Confirmation email sent to:', registration.email);
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    throw error;
  }
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('⚠️ Email credentials not configured');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"MAIA Workshop Contact" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `[MAIA Workshop] ${data.subject}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    console.log('✅ Contact form email sent to admin');
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    throw error;
  }
}
```

### Step 4: Update .env.local

```env
# Gmail SMTP Configuration
EMAIL_USER=hichame.taoufik1@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

### Step 5: Remove Resend (Optional)

```bash
npm uninstall resend
```

### Gmail Limits
- **Free Gmail**: 500 emails/day
- **Google Workspace**: 2,000 emails/day

---

## Option 2: Microsoft 365 / Outlook SMTP

### Step 1: Install Nodemailer
```bash
npm install nodemailer
npm install @types/nodemailer --save-dev
```

### Step 2: Update lib/email.ts

Use the same code as Gmail, but change transporter to:

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Step 3: Update .env.local

```env
EMAIL_USER=hichame.taoufik1@gmail.com
EMAIL_PASSWORD=your_email_password
ADMIN_EMAIL=hichame.taoufik1@gmail.com
```

### Outlook Limits
- **Outlook.com (Free)**: 300 emails/day
- **Microsoft 365**: 10,000 emails/day

---

## Option 3: Custom Domain SMTP

If you have email hosting with your domain:

### Common SMTP Settings

**cPanel/WHM:**
```typescript
host: 'mail.yourdomain.com',
port: 465,
secure: true,
```

**Zoho Mail:**
```typescript
host: 'smtp.zoho.com',
port: 465,
secure: true,
```

**Custom Provider:**
Check your hosting provider's SMTP settings.

---

## Troubleshooting

### Gmail: "Less secure app access"
- Enable 2FA
- Use App Password (not your regular password)

### Outlook: Authentication failed
- Check password is correct
- Ensure account is not locked
- Try turning off 2FA temporarily for testing

### Emails going to spam
- Use verified domain
- Add SPF and DKIM records
- Don't send too many at once
- Warm up your email (start with small batches)

### Rate limiting
- Gmail: Wait and try again (resets daily)
- Add delays between emails:
  ```typescript
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
  ```

---

## Comparison

| Method | Daily Limit | Cost | Setup Time | Deliverability |
|--------|-------------|------|------------|----------------|
| Gmail Free | 500 | $0 | 10 min | Good |
| Google Workspace | 2,000 | $6/month | 10 min | Excellent |
| Outlook Free | 300 | $0 | 10 min | Good |
| Microsoft 365 | 10,000 | $6/month | 10 min | Excellent |
| Custom SMTP | Varies | Varies | 15 min | Varies |

---

## Recommendation

For your workshop:
- **Gmail/Google Workspace**: Best for personal/small business
- **Microsoft 365**: Best for business email
- **Resend with custom domain**: Best overall (easier than SMTP)

