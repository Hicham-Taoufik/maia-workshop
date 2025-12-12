// Email service integration with Gmail SMTP
import { Registration } from '@/types/registration';
import nodemailer from 'nodemailer';

function getGmailTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass, // App-specific password
    },
  });
}

/**
 * Send confirmation email to workshop registrant
 */
export async function sendConfirmationEmail(registration: Registration): Promise<void> {
  try {
    // Only send if credentials are configured
    const transporter = getGmailTransporter();
    if (!transporter) {
      console.log('⚠️ Gmail credentials not configured. Email would be sent to:', registration.email);
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
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .details h3 { color: #4f46e5; margin-top: 0; }
            .detail-item { margin: 10px 0; padding: 10px; border-left: 3px solid #4f46e5; padding-left: 15px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
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
              
              <p>Thank you for registering for the MAIA 2025 Professional AI Workshops. We're excited to have you join us.</p>
              
              <div class="details">
                <h3>📅 Workshop Details</h3>
                
                <div class="detail-item">
                  <strong>📍 Location:</strong><br/>
                  ENS-Tetouan (Higher Normal School)<br/>
                  Tetouan, Morocco
                </div>
                
                <div class="detail-item">
                  <strong>🗓️ Date:</strong><br/>
                  December 20, 2025
                </div>
                
                <div class="detail-item">
                  <strong>🏫 Conference:</strong><br/>
                  Part of MAIA 2025 Conference (December 18-20, 2025)
                </div>
                
                ${registration.organization ? `
                <div class="detail-item">
                  <strong>🏢 Organization:</strong><br/>
                  ${registration.organization}
                </div>
                ` : ''}
                
                ${registration.jobTitleDegree ? `
                <div class="detail-item">
                  <strong>💼 Position:</strong><br/>
                  ${registration.jobTitleDegree}
                </div>
                ` : ''}
              </div>
              
              <div style="text-align: center;">
                <a href="https://icmaia.ens-tetouan.com" class="button">Visit MAIA 2025 Conference</a>
              </div>
              
              <div class="footer">
                <p>If you have any questions, contact us at:</p>
                <p><strong>📧 hichame.taoufik1@gmail.com</strong></p>
                <p><strong>📱 +212 697 068 234</strong></p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                <p style="font-size: 12px;">
                  © ${new Date().getFullYear()} MAIA Conference. All rights reserved.<br/>
                  International Conference on Mathematics Artificial Intelligence And Its Applications
                </p>
              </div>
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

/**
 * Send contact form message to admin
 */
export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    // Only send if credentials are configured
    const transporter = getGmailTransporter();
    if (!transporter) {
      console.log('⚠️ Gmail credentials not configured. Contact form message from:', data.email);
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"MAIA Workshop Contact" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `[MAIA Workshop Contact] ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); color: white; padding: 20px; border-radius: 8px; }
            .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .field { margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 6px; }
            .label { font-weight: bold; color: #4f46e5; display: block; margin-bottom: 5px; }
            .message-box { background: white; border: 2px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 New Contact Form Message</h2>
              <p style="margin: 0;">MAIA 2025 Workshop Website</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">👤 Name:</span>
                ${data.name}
              </div>
              
              <div class="field">
                <span class="label">📧 Email:</span>
                <a href="mailto:${data.email}">${data.email}</a>
              </div>
              
              <div class="field">
                <span class="label">📝 Subject:</span>
                ${data.subject}
              </div>
              
              <div class="field">
                <span class="label">💬 Message:</span>
                <div class="message-box">
                  ${data.message.replace(/\n/g, '<br/>')}
                </div>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                <strong>Reply to:</strong> <a href="mailto:${data.email}">${data.email}</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Contact form email sent to admin');
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    throw error;
  }
}

