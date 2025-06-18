import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailAttachment {
  filename: string;
  content: string;
  type: string;
  disposition: string;
}

interface EmailData {
  memberInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    isMinor: boolean;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  guardianInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relationship: string;
    address: string;
  } | null;
  medicalInfo: {
    conditions: string;
    otherConditions: string;
    medications: string;
    allergies: string;
    previousInjuries: string;
    physicalLimitations: string;
    requiresPhysicianClearance: boolean;
  };
  experience: {
    boxingExperience: string;
    otherCombatSports: string;
    fitnessLevel: string;
    goals: string;
  };
  membership: {
    plan: string;
    desiredStartDate: string;
  };
  legalAgreements: {
    liabilityWaiver: string;
    assumptionOfRisk: string;
    membershipTerms: string;
    gymRules: string;
    codeOfConduct: string;
    equipmentGuidelines: string;
    photoRelease: string;
    cancellationPolicy: string;
    paymentTerms: string;
    claimsProcedures: string;
    indemnification: string;
  };
  billing: {
    name: string;
    address: string;
  };
  documents: {
    boxerSignature: string;
    guardianSignature: string;
    boxerIdProvided: string;
    guardianIdProvided: string;
    physicianClearance: string;
  };
  applicationDate: string;
  paymentLink: string;
  attachments?: EmailAttachment[];
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

    const emailData: EmailData = await request.json();

    const htmlContent = generateEmailHTML(emailData);

    const attachments =
      emailData.attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
      })) || [];

    const { data, error } = await resend.emails.send({
      from: "Boxfit Utah <onboarding@boxfit-utah.com>",
      to: ["BoxfitUtah@gmail.com"],
      subject: `🥊 New Membership Application - ${emailData.memberInfo.firstName} ${emailData.memberInfo.lastName} - ${emailData.membership.plan}`,
      html: htmlContent,
      attachments: attachments,
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

function generateEmailHTML(emailData: EmailData): string {
  const {
    memberInfo,
    emergencyContact,
    guardianInfo,
    medicalInfo,
    experience,
    membership,
    legalAgreements,
    billing,
    documents,
    applicationDate,
    paymentLink,
  } = emailData;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Membership Application</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #d50000, #212121); color: white; padding: 20px; margin: -30px -30px 30px -30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .section { margin-bottom: 25px; padding: 15px; border-left: 4px solid #d50000; background-color: #f9f9f9; }
    .section h2 { color: #d50000; margin: 0 0 15px 0; font-size: 18px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .info-item { margin-bottom: 8px; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; }
    .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .success { background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
    .action-box { background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .legal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .status-complete { color: #28a745; font-weight: bold; }
    .status-missing { color: #dc3545; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Membership Application 🥊</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Application received: ${applicationDate}</p>
    </div>

    ${memberInfo.isMinor ? '<div class="alert"><strong>⚠️ MINOR APPLICATION:</strong> This application is for a minor and requires guardian approval and supervision.</div>' : ""}
    
    ${medicalInfo.requiresPhysicianClearance ? '<div class="alert"><strong>🏥 MEDICAL CLEARANCE REQUIRED:</strong> This member requires physician clearance before participation.</div>' : ""}

    <div class="section">
      <h2>👤 Member Information</h2>
      <div class="info-grid">
        <div class="info-item"><span class="label">Name:</span> <span class="value">${memberInfo.firstName} ${memberInfo.lastName}</span></div>
        <div class="info-item"><span class="label">Date of Birth:</span> <span class="value">${memberInfo.dateOfBirth}</span></div>
        <div class="info-item"><span class="label">Email:</span> <span class="value">${memberInfo.email}</span></div>
        <div class="info-item"><span class="label">Phone:</span> <span class="value">${memberInfo.phone}</span></div>
      </div>
      <div class="info-item"><span class="label">Address:</span> <span class="value">${memberInfo.address}</span></div>
    </div>

    <div class="section">
      <h2>🚨 Emergency Contact</h2>
      <div class="info-grid">
        <div class="info-item"><span class="label">Name:</span> <span class="value">${emergencyContact.name}</span></div>
        <div class="info-item"><span class="label">Phone:</span> <span class="value">${emergencyContact.phone}</span></div>
        <div class="info-item"><span class="label">Relationship:</span> <span class="value">${emergencyContact.relationship}</span></div>
      </div>
    </div>

    ${
      guardianInfo
        ? `
    <div class="section">
      <h2>👨‍👩‍👧‍👦 Guardian Information</h2>
      <div class="info-grid">
        <div class="info-item"><span class="label">Name:</span> <span class="value">${guardianInfo.firstName} ${guardianInfo.lastName}</span></div>
        <div class="info-item"><span class="label">Relationship:</span> <span class="value">${guardianInfo.relationship}</span></div>
        <div class="info-item"><span class="label">Email:</span> <span class="value">${guardianInfo.email}</span></div>
        <div class="info-item"><span class="label">Phone:</span> <span class="value">${guardianInfo.phone}</span></div>
      </div>
      <div class="info-item"><span class="label">Address:</span> <span class="value">${guardianInfo.address}</span></div>
    </div>
    `
        : ""
    }

    <div class="section">
      <h2>🏥 Medical Information</h2>
      <div class="info-item"><span class="label">Medical Conditions:</span> <span class="value">${medicalInfo.conditions}</span></div>
      ${medicalInfo.otherConditions !== "None" ? `<div class="info-item"><span class="label">Other Conditions:</span> <span class="value">${medicalInfo.otherConditions}</span></div>` : ""}
      ${medicalInfo.medications !== "None" ? `<div class="info-item"><span class="label">Current Medications:</span> <span class="value">${medicalInfo.medications}</span></div>` : ""}
      ${medicalInfo.allergies !== "None" ? `<div class="info-item"><span class="label">Allergies:</span> <span class="value">${medicalInfo.allergies}</span></div>` : ""}
      ${medicalInfo.previousInjuries !== "None" ? `<div class="info-item"><span class="label">Previous Injuries:</span> <span class="value">${medicalInfo.previousInjuries}</span></div>` : ""}
      ${medicalInfo.physicalLimitations !== "None" ? `<div class="info-item"><span class="label">Physical Limitations:</span> <span class="value">${medicalInfo.physicalLimitations}</span></div>` : ""}
    </div>

    <div class="section">
      <h2>🥊 Boxing Experience & Goals</h2>
      <div class="info-grid">
        <div class="info-item"><span class="label">Boxing Experience:</span> <span class="value">${experience.boxingExperience}</span></div>
        <div class="info-item"><span class="label">Fitness Level:</span> <span class="value">${experience.fitnessLevel}</span></div>
      </div>
      ${experience.otherCombatSports !== "None" ? `<div class="info-item"><span class="label">Other Combat Sports:</span> <span class="value">${experience.otherCombatSports}</span></div>` : ""}
      <div class="info-item"><span class="label">Goals:</span> <span class="value">${experience.goals}</span></div>
    </div>

    <div class="section">
      <h2>💳 Membership & Billing</h2>
      <div class="info-grid">
        <div class="info-item"><span class="label">Selected Plan:</span> <span class="value">${membership.plan}</span></div>
        <div class="info-item"><span class="label">Desired Start Date:</span> <span class="value">${membership.desiredStartDate}</span></div>
        <div class="info-item"><span class="label">Billing Name:</span> <span class="value">${billing.name}</span></div>
      </div>
      <div class="info-item"><span class="label">Billing Address:</span> <span class="value">${billing.address}</span></div>
    </div>

     <div class="section">
      <h2>📋 Legal Agreements Status</h2>
      <div class="legal-grid">
        <div class="info-item">Liability Waiver: <span class="${legalAgreements.liabilityWaiver.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.liabilityWaiver}</span></div>
        <div class="info-item">Assumption of Risk: <span class="${legalAgreements.assumptionOfRisk.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.assumptionOfRisk}</span></div>
        <div class="info-item">Membership Terms: <span class="${legalAgreements.membershipTerms.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.membershipTerms}</span></div>
        <div class="info-item">Gym Rules: <span class="${legalAgreements.gymRules.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.gymRules}</span></div>
        <div class="info-item">Code of Conduct: <span class="${legalAgreements.codeOfConduct.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.codeOfConduct}</span></div>
        <div class="info-item">Equipment Guidelines: <span class="${legalAgreements.equipmentGuidelines.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.equipmentGuidelines}</span></div>
        <div class="info-item">Photo Release: <span class="${legalAgreements.photoRelease.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.photoRelease}</span></div>
        <div class="info-item">Payment Terms: <span class="${legalAgreements.paymentTerms.includes("✅") ? "status-complete" : "status-missing"}">${legalAgreements.paymentTerms}</span></div>
      </div>
    </div>

    <div class="section">
      <h2>📄 Documents & Signatures</h2>
      <div class="info-grid">
        <div class="info-item">Boxer Signature: <span class="${documents.boxerSignature.includes("✅") ? "status-complete" : "status-missing"}">${documents.boxerSignature}</span></div>
        <div class="info-item">Guardian Signature: <span class="${documents.guardianSignature.includes("✅") ? "status-complete" : "status-missing"}">${documents.guardianSignature}</span></div>
        <div class="info-item">Boxer ID: <span class="${documents.boxerIdProvided.includes("✅") ? "status-complete" : "status-missing"}">${documents.boxerIdProvided}</span></div>
        <div class="info-item">Guardian ID: <span class="${documents.guardianIdProvided.includes("✅") ? "status-complete" : "status-missing"}">${documents.guardianIdProvided}</span></div>
      </div>
    </div>
    
    <div class="action-box">
      <h3 style="margin-top: 0;">💳 Payment Setup Status</h3>
      <p>The member has been provided with the secure payment link and instructed to complete setup by their second class</p>
      <p style="margin-bottom: 0; font-size: 14px; opacity: 0.9;">✅ Member has payment link • ⚠️ Verify setup is complete by second class</p>
    </div>

    <div class="alert success">
      <h3 style="margin-top: 0;">📋 Next Steps for Coach Pablo:</h3>
      <ol style="margin-bottom: 0;">
        <li><strong>Review Application:</strong> Check all information and attachments</li>
        <li><strong>Schedule Free Trial:</strong> Contact member to arrange their first class</li>
        <li><strong>Verify Payment Setup:</strong> Ensure member completes payment setup by their second class</li>
        <li><strong>Prepare for Trial:</strong> Note any medical considerations or special needs</li>
        <li><strong>Follow Up:</strong> After trial, billing will automatically start if member continues</li>
      </ol>
    </div>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="text-align: center; color: #888; font-size: 14px;">
      BoxFit Utah Membership System • Application received on ${applicationDate}
    </p>
  </div>
</body>
</html>
  `;
}
