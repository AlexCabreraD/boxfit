import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error: Missing API key" },
        { status: 500 },
      );
    }

    const formData: ContactFormData = await request.json();

    const htmlContent = generateContactEmailHTML(formData);

    const { data, error } = await resend.emails.send({
      from: "BoxFit Utah Contact <contact@boxfit-utah.com>",
      to: ["BoxfitUtah@gmail.com"],
      subject: `🥊 Contact Form: ${formData.subject} - ${formData.name}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function generateContactEmailHTML(formData: ContactFormData): string {
  const submissionDate = new Date().toLocaleString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #d50000, #212121); color: white; padding: 20px; margin: -30px -30px 30px -30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 20px; padding: 15px; border-left: 4px solid #d50000; background-color: #f9f9f9; }
    .section h2 { color: #d50000; margin: 0 0 10px 0; font-size: 18px; }
    .info-item { margin-bottom: 8px; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; }
    .message-box { background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .priority-${formData.subject.toLowerCase().includes("urgent") || formData.subject.toLowerCase().includes("emergency") ? "high" : "normal"} { 
      ${
        formData.subject.toLowerCase().includes("urgent") ||
        formData.subject.toLowerCase().includes("emergency")
          ? "border-left: 4px solid #dc3545; background-color: #f8d7da;"
          : ""
      } 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission 📧</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Received: ${submissionDate}</p>
    </div>

    <div class="section priority-${formData.subject.toLowerCase().includes("urgent") ? "high" : "normal"}">
      <h2>Contact Information</h2>
      <div class="info-item"><span class="label">Name:</span> <span class="value">${formData.name}</span></div>
      <div class="info-item"><span class="label">Email:</span> <span class="value">${formData.email}</span></div>
      ${formData.phone ? `<div class="info-item"><span class="label">Phone:</span> <span class="value">${formData.phone}</span></div>` : ""}
      <div class="info-item"><span class="label">Subject:</span> <span class="value">${formData.subject}</span></div>
    </div>

    <div class="section">
      <h2>Message</h2>
      <div class="message-box">
        ${formData.message.replace(/\n/g, "<br>")}
      </div>
    </div>

    <div class="section">
      <h2>📋 Next Steps</h2>
      <ol style="margin: 0; padding-left: 20px;">
        <li>Review the inquiry and determine the appropriate response</li>
        <li>Reply to <strong>${formData.email}</strong> within 24 hours</li>
        ${formData.phone ? `<li>For urgent matters, you can also call <strong>${formData.phone}</strong></li>` : ""}
        <li>Follow up based on the inquiry type (${formData.subject})</li>
      </ol>
    </div>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="text-align: center; color: #888; font-size: 14px;">
      BoxFit Utah Contact System • Submission received on ${submissionDate}
    </p>
  </div>
</body>
</html>
  `;
}
