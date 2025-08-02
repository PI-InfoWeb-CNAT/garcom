import "dotenv/config";
import { createTransport, Transporter } from "nodemailer";
import path from "path";
import fs from "fs";

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter: Transporter = createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

export async function sendMail({
  to,
  subject,
  text,
  html,
}: SendMailOptions): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: process.env.BREVO_SMTP_SENDER,
      to,
      subject,
      text,
      html,
    });

    console.log("Email enviado:", info.response);
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
}

export function loadEmailTemplate(
  filename: string,
  vars: Record<string, string>,
): string {
  const filePath = path.resolve(process.cwd(), "src", "lib", "templates", filename);

  let html = fs.readFileSync(filePath, "utf8");

  for (const [key, value] of Object.entries(vars)) {
    html = html.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
  }

  return html;
}