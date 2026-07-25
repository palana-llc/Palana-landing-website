import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, university, role, subject, message, type } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const tag = type === "bug" ? "[Bug Report]" : "[General Inquiry]";
  const extra = university || role
    ? `University: ${university || "N/A"}\nRole: ${role || "N/A"}\n`
    : "";

  const { error } = await resend.emails.send({
    from: "Palana Contact Form <onboarding@resend.dev>",
    to: "imlimasi@uw.edu",
    replyTo: email,
    subject: `${tag} ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n${extra}\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
