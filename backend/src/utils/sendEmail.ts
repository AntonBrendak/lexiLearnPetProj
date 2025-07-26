import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `http://localhost:5173/confirm?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"LexiLearn" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Confirm your registration',
    html: `<p>Please click <a href="${confirmUrl}">here</a> to confirm your account.</p>`
  });
}