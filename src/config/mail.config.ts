import nodemailer from "nodemailer";

import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM
} from "./env.config.js";

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
  throw new Error("SMTP configuration is missing");
}

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 587),
  secure: Number(SMTP_PORT ?? 587) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

export const mailFrom = MAIL_FROM ?? SMTP_USER;