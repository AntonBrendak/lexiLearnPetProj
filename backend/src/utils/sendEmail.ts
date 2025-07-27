import nodemailer from 'nodemailer';


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; // заміни на свій
const FROM_EMAIL = process.env.MAIL_USER || 'noreply@example.com';

export async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `${FRONTEND_URL}/confirm?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: FROM_EMAIL,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"LexiLearn" <${FROM_EMAIL}>`,
    to: email,
    subject: 'Confirm your registration',
    html: `<p>Please click <a href="${confirmUrl}">here</a> to confirm your account.</p>`
  });
}


export const sendResetPasswordEmail = async (to: string, token: string) => {
  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset for LexiLearn.</p>
      <p>Click the link below to set a new password:</p>
      <a href="${link}">${link}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });

  console.log(`📧 Reset password email sent to: ${to}`);
};