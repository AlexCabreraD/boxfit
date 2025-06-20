import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateMembershipAgreementHTML } from "@/lib/generateMembershipPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

interface MembershipFormData {
  firstName: string;
  lastName: string;
  middleInitial: string;
  birthdate: string;
  dlNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  cellPhone: string;
  employer: string;
  workPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  membershipType: string;
  membershipLevel: string;
  startDate: string;
  initiationFee: string;
  monthlyDues: string;
  salesTax: string;
  totalDue: string;
  paymentMethod: string;
  creditCardType: string;
  paymentType: string;
  paymentBeginning: string;
  isMinor: boolean;
  participantAge: string;
  guardianName: string;
  guardianSignature: string;
  memberSignature: string;
  agreementDate: string;
  memberIdFile?: string;
  guardianIdFile?: string;
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

    const formData: MembershipFormData = await request.json();

    const signatures = extractSignatureFiles(formData);
    const idFiles = extractIdFiles(formData);

    const htmlContent = generateMembershipAgreementHTML(formData);
    const htmlBase64 = Buffer.from(htmlContent).toString("base64");
    const emailHtml = generateNotificationEmailHTML(
      formData,
      signatures.length > 0,
    );

    const filename = `BoxFit_Utah_Agreement_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.html`;

    const attachments = [
      {
        filename: filename,
        content: htmlBase64,
      },
      ...signatures,
      ...idFiles,
    ];

    const { data, error } = await resend.emails.send({
      from: "BoxFit Utah Membership <membership@boxfit-utah.com>",
      to: ["BoxfitUtah@gmail.com"],
      subject: `🥊 New Membership Application - ${formData.firstName} ${formData.lastName} (WITH SIGNATURES)`,
      html: emailHtml,
      attachments: attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
      filename: filename,
      signaturesAttached: signatures.length,
      idFilesAttached: idFiles.length,
      note: "HTML file sent - you can print this to PDF from your browser",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function extractSignatureFiles(formData: MembershipFormData) {
  const signatures = [];

  if (
    formData.memberSignature &&
    formData.memberSignature.startsWith("data:image/png;base64,")
  ) {
    const memberSignatureBase64 = formData.memberSignature.split(",")[1];
    signatures.push({
      filename: `${formData.firstName}_${formData.lastName}_Member_Signature.png`,
      content: memberSignatureBase64,
    });
  }

  if (
    formData.isMinor &&
    formData.guardianSignature &&
    formData.guardianSignature.startsWith("data:image/png;base64,")
  ) {
    const guardianSignatureBase64 = formData.guardianSignature.split(",")[1];
    signatures.push({
      filename: `${formData.firstName}_${formData.lastName}_Guardian_Signature.png`,
      content: guardianSignatureBase64,
    });
  }

  return signatures;
}

function extractIdFiles(formData: MembershipFormData) {
  const idFiles = [];

  if (!formData.isMinor && formData.memberIdFile) {
    let fileExtension = "jpg";
    let base64Content = formData.memberIdFile;

    if (formData.memberIdFile.startsWith("data:")) {
      const matches = formData.memberIdFile.match(/data:([^;]+);base64,(.+)/);
      if (matches) {
        const mimeType = matches[1];
        base64Content = matches[2];

        if (mimeType.includes("jpeg") || mimeType.includes("jpg")) {
          fileExtension = "jpg";
        } else if (mimeType.includes("png")) {
          fileExtension = "png";
        } else if (mimeType.includes("pdf")) {
          fileExtension = "pdf";
        }
      }
    }

    idFiles.push({
      filename: `${formData.firstName}_${formData.lastName}_ID.${fileExtension}`,
      content: base64Content,
    });
  }

  if (formData.isMinor && formData.guardianIdFile) {
    let fileExtension = "jpg";
    let base64Content = formData.guardianIdFile;

    if (formData.guardianIdFile.startsWith("data:")) {
      const matches = formData.guardianIdFile.match(/data:([^;]+);base64,(.+)/);
      if (matches) {
        const mimeType = matches[1];
        base64Content = matches[2];

        if (mimeType.includes("jpeg") || mimeType.includes("jpg")) {
          fileExtension = "jpg";
        } else if (mimeType.includes("png")) {
          fileExtension = "png";
        } else if (mimeType.includes("pdf")) {
          fileExtension = "pdf";
        }
      }
    }

    idFiles.push({
      filename: `${formData.guardianName}_Guardian_ID.${fileExtension}`,
      content: base64Content,
    });
  }

  return idFiles;
}

function generateNotificationEmailHTML(
  formData: MembershipFormData,
  hasSignatures: boolean,
): string {
  const submissionDate = new Date().toLocaleString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Membership Application</title>
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🥊 New Membership Application</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Received: ${submissionDate}</p>
    </div>

    <div class="section">
      <h2>📋 Member Information</h2>
      <div class="info-item"><span class="label">Name:</span> <span class="value">${formData.firstName} ${formData.middleInitial} ${formData.lastName}</span></div>
      <div class="info-item"><span class="label">Email:</span> <span class="value">${formData.email}</span></div>
      <div class="info-item"><span class="label">Phone:</span> <span class="value">${formData.cellPhone}</span></div>
      <div class="info-item"><span class="label">Address:</span> <span class="value">${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</span></div>
      <div class="info-item"><span class="label">Birthdate:</span> <span class="value">${formData.birthdate}</span></div>
      <div class="info-item"><span class="label">Emergency Contact:</span> <span class="value">${formData.emergencyContact} - ${formData.emergencyPhone}</span></div>
      ${formData.isMinor ? `<div class="info-item"><span class="label">Minor (Age ${formData.participantAge}):</span> <span class="value">Guardian: ${formData.guardianName}</span></div>` : ""}
    </div>

    <div class="section">
      <h2>💪 Membership Details</h2>
      <div class="info-item"><span class="label">Membership Type:</span> <span class="value">${formData.membershipType}</span></div>
      <div class="info-item"><span class="label">Start Date:</span> <span class="value">${formData.startDate}</span></div>
      <div class="info-item"><span class="label">Total Due:</span> <span class="value">${formData.totalDue}</span></div>
      <div class="info-item"><span class="label">Payment Method:</span> <span class="value">${formData.paymentMethod}</span></div>
    </div>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="text-align: center; color: #888; font-size: 14px;">
      BoxFit Utah Membership System • Application received on ${submissionDate}<br>
      Complete agreement with ${hasSignatures ? "embedded signatures" : "electronic agreement"} attached • Member contact: ${formData.email} • ${formData.cellPhone}
    </p>
  </div>
</body>
</html>
  `;
}
