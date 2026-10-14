import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export async function POST(request: Request) {
  try {
    const { SMTP_USER, SMTP_PASS, CAREERS_EMAIL } = process.env;

    if (!SMTP_USER || !SMTP_PASS || !CAREERS_EMAIL) {
      console.error("Missing careers email environment variables.");

      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    // These fields match CareersPage.tsx exactly.
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const position = String(formData.get("position") ?? "").trim();
    const cv = formData.get("cv");

    // Validate required text fields.
    if (!name || !email || !position) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 254 || position.length > 150) {
      return NextResponse.json(
        { message: "One or more fields are too long." },
        { status: 400 },
      );
    }

    // Validate email address.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Validate CV upload.
    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json(
        { message: "Please upload your CV in PDF format." },
        { status: 400 },
      );
    }

    if (cv.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Your CV must not exceed 4 MB." },
        { status: 400 },
      );
    }

    if (!cv.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { message: "Only PDF files are accepted." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    // Check the actual PDF signature.
    if (buffer.subarray(0, 5).toString() !== "%PDF-") {
      return NextResponse.json(
        { message: "The uploaded file is not a valid PDF." },
        { status: 400 },
      );
    }

    // Configure cPanel SMTP.
    const transporter = nodemailer.createTransport({
      host: "constrally.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Send the application to the configured receiving inbox.
    await transporter.sendMail({
      from: {
        name: "Constrally Careers",
        address: SMTP_USER,
      },
      to: CAREERS_EMAIL,
      replyTo: email,
      subject: `Job Application: ${position}`,
      text: [
        "New Job Application",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Position: ${position}`,
        "",
        `CV: ${cv.name}`,
      ].join("\n"),
      html: `
        <h2>New Job Application</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(email)}</p>
        <p><strong>Position:</strong> ${escapeHtml(position)}</p>
        <p><strong>CV:</strong> Attached as a PDF.</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: buffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json(
      {
        message: "Your application has been submitted successfully!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Careers API error:", error);

    return NextResponse.json(
      {
        message:
          "Unable to submit your application right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
