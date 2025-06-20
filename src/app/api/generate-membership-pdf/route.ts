import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
  // ID Files
  memberIdFile?: string; // base64 encoded file
  guardianIdFile?: string; // base64 encoded file
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

    // Extract signature images if they exist
    const signatures = extractSignatureFiles(formData);

    // Extract ID files if they exist
    const idFiles = extractIdFiles(formData);

    // Generate a clean HTML version that can be printed
    const htmlContent = generatePrintableHTML(formData);

    // Convert HTML to base64
    const htmlBase64 = Buffer.from(htmlContent).toString("base64");

    // Generate notification email
    const emailHtml = generateNotificationEmailHTML(
      formData,
      signatures.length > 0,
    );

    const filename = `BoxFit_Utah_Agreement_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.html`;

    // Prepare email attachments
    const attachments = [
      {
        filename: filename,
        content: htmlBase64,
      },
      ...signatures, // Add signature PNG files
      ...idFiles, // Add ID files
    ];

    // Send email with HTML and all attachments
    const { data, error } = await resend.emails.send({
      from: "BoxFit Utah Membership <membership@boxfit-utah.com>",
      to: ["BoxfitUtah@gmail.com"], // Replace with your email
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

  // Extract member signature
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

  // Extract guardian signature if it exists
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

  // Extract member ID file (for adults)
  if (!formData.isMinor && formData.memberIdFile) {
    // Assume the ID file is already base64 encoded
    let fileExtension = "jpg"; // default
    let base64Content = formData.memberIdFile;

    // If it's a data URL, extract the extension and content
    if (formData.memberIdFile.startsWith("data:")) {
      const matches = formData.memberIdFile.match(/data:([^;]+);base64,(.+)/);
      if (matches) {
        const mimeType = matches[1];
        base64Content = matches[2];

        // Determine file extension from mime type
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

  // Extract guardian ID file (for minors)
  if (formData.isMinor && formData.guardianIdFile) {
    let fileExtension = "jpg"; // default
    let base64Content = formData.guardianIdFile;

    // If it's a data URL, extract the extension and content
    if (formData.guardianIdFile.startsWith("data:")) {
      const matches = formData.guardianIdFile.match(/data:([^;]+);base64,(.+)/);
      if (matches) {
        const mimeType = matches[1];
        base64Content = matches[2];

        // Determine file extension from mime type
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

function generatePrintableHTML(formData: MembershipFormData): string {
  const submissionDate = new Date().toLocaleDateString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BoxFit Utah LLC Agreement - ${formData.firstName} ${formData.lastName}</title>
  <style>
    @media print {
      @page { 
        size: 8.5in 11in; 
        margin: 0.5in; 
      }
      body { -webkit-print-color-adjust: exact; }
      .print-instructions { display: none !important; }
      .page-break { page-break-before: always; }
    }
    
    body { 
      font-family: Arial, sans-serif; 
      font-size: 11px; 
      line-height: 1.3; 
      margin: 0; 
      padding: 15px;
      color: #000;
      background: white;
    }
    
    .header { 
      background-color: #5B7FC7; 
      color: white; 
      text-align: center; 
      padding: 12px; 
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 14px;
    }
    
    .form-field { 
      border-bottom: 1px solid #000;
      display: inline-block;
      min-width: 100px;
      padding: 2px 5px;
      margin: 0 3px;
      font-weight: normal;
    }
    
    .checkbox { 
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 1px solid #000;
      margin: 0 3px;
      text-align: center;
      line-height: 12px;
      font-size: 10px;
    }
    
    .signature-box {
      border: 2px solid #000;
      padding: 10px;
      margin: 15px 0;
      background-color: #f9f9f9;
    }
    
    .signature-area {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    
    .signature-image {
      border: 1px solid #000;
      height: 60px;
      width: 200px;
      display: inline-block;
      margin-left: 10px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: white;
    }
    
    .payment-section {
      border: 2px solid #000;
      padding: 12px;
      margin: 15px 0;
    }
    
    .membership-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    
    .membership-table td {
      border: 1px solid #000;
      padding: 8px;
      min-height: 25px;
    }
    
    .print-instructions {
      background-color: #e3f2fd;
      border: 2px dashed #1976d2;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    
    .page-break { 
      page-break-before: always; 
    }
    
    .notice-box {
      border: 2px solid #000;
      padding: 10px;
      margin: 15px 0;
      font-weight: bold;
      background-color: #fff3cd;
      text-align: center;
    }
    
    .liability-text {
      text-align: justify;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    
    .liability-text p {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

  <div class="print-instructions">
    <h3>📄 PRINTING INSTRUCTIONS:</h3>
    <p><strong>To convert this to PDF with signatures:</strong></p>
    <ol>
      <li>Press <strong>Ctrl+P</strong> (or Cmd+P on Mac)</li>
      <li>Select <strong>"Save as PDF"</strong> as the destination</li>
      <li>Click <strong>"Save"</strong></li>
      <li>The signatures will be preserved in the PDF!</li>
    </ol>
    <p><em>This instruction box will not appear in the printed version.</em></p>
  </div>

  <!-- PAGE 1: MAIN AGREEMENT -->
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div style="margin-bottom: 15px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 40%;">
          Name <span class="form-field" style="min-width: 180px;">${formData.firstName} ${formData.middleInitial} ${formData.lastName}</span>
        </td>
        <td style="width: 30%;">
          Birthdate <span class="form-field">${formData.birthdate}</span>
        </td>
        <td style="width: 30%;">
          DL # <span class="form-field">${formData.dlNumber || "_____________"}</span>
        </td>
      </tr>
    </table>
    <div style="margin: 5px 0; font-size: 9px;">First &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; M/Date/Year</div>
  </div>

  <div style="margin-bottom: 15px;">
    <div>Address <span class="form-field" style="min-width: 220px;">${formData.address}</span> &nbsp;&nbsp; Email: <span class="form-field" style="min-width: 180px;">${formData.email}</span></div>
    <div style="margin: 5px 0;">City <span class="form-field" style="min-width: 120px;">${formData.city}</span> ST <span class="form-field" style="min-width: 30px;">${formData.state}</span> Zip <span class="form-field" style="min-width: 60px;">${formData.zipCode}</span> Cell Phn <span class="form-field" style="min-width: 120px;">${formData.cellPhone}</span></div>
    <div style="margin: 5px 0;">Employer <span class="form-field" style="min-width: 200px;">${formData.employer || ""}</span> Work Phn <span class="form-field" style="min-width: 120px;">${formData.workPhone || ""}</span></div>
    <div style="margin: 5px 0;">Emergency Contact: <span class="form-field" style="min-width: 150px;">${formData.emergencyContact}</span> Phn <span class="form-field" style="min-width: 120px;">${formData.emergencyPhone}</span></div>
  </div>

  <div style="margin-bottom: 15px;">
    <strong>MEMBERSHIP TYPE:</strong>
    <table class="membership-table">
      <tr>
        <td style="width: 60%;">[Full Name and description of each class]</td>
        <td style="width: 40%;">Monthly <span class="checkbox"></span> Semi-Annual <span class="checkbox"></span> Annual <span class="checkbox"></span></td>
      </tr>
      <tr>
        <td>[Full Name and description of each class]</td>
        <td>Monthly <span class="checkbox"></span> Semi-Annual <span class="checkbox"></span> Annual <span class="checkbox"></span></td>
      </tr>
      <tr>
        <td>[Full Name and description of each class]</td>
        <td>Monthly <span class="checkbox"></span> Semi-Annual <span class="checkbox"></span> Annual <span class="checkbox"></span></td>
      </tr>
      <tr>
        <td>[Full Name and description of each class]</td>
        <td>Monthly <span class="checkbox"></span> Semi-Annual <span class="checkbox"></span> Annual <span class="checkbox"></span></td>
      </tr>
    </table>
  </div>

  <div class="payment-section">
    <div><strong>Payment: The Undersigned agrees to and understands the following payment terms.</strong></div>
    <div style="margin: 8px 0;">Start date of Membership: <span class="form-field">${formData.startDate}</span></div>
    <table style="width: 100%; margin: 5px 0;">
      <tr>
        <td style="width: 50%;">
          Initiation Fee: $<span class="form-field">${formData.initiationFee}</span><br/>
          Monthly Dues: $<br/>
          Sales Tax: $<br/>
          Total Due: $<span class="form-field">${formData.totalDue}</span>
        </td>
        <td style="width: 50%; text-align: left;">
          Payment made by: Cash <span class="checkbox">${formData.paymentMethod === "Cash" ? "✓" : ""}</span> Check <span class="checkbox">${formData.paymentMethod === "Check" ? "✓" : ""}</span> ACH <span class="checkbox">${formData.paymentMethod === "ACH" ? "✓" : ""}</span><br/>
          Credit Card: AMEX <span class="checkbox">${formData.creditCardType === "AMEX" ? "✓" : ""}</span> Visa <span class="checkbox">${formData.creditCardType === "Visa" ? "✓" : ""}</span> MC <span class="checkbox">${formData.creditCardType === "MC" ? "✓" : ""}</span> Discover <span class="checkbox">${formData.creditCardType === "Discover" ? "✓" : ""}</span><br/>
          Payment Method: In full <span class="checkbox">${formData.paymentType === "In full" ? "✓" : ""}</span> Instalments <span class="checkbox">${formData.paymentType === "Instalments" ? "✓" : ""}</span><br/>
          Beginning <span class="form-field">___/___/_____</span>
        </td>
      </tr>
    </table>
  </div>

  <div class="notice-box">
    <strong>MEMBER ACKNOWLEDGES HAVING READ AND RECEIVED A FILLED IN SIGNED COPY OF THIS AGREEMENT:</strong> DATE <span class="form-field">${formData.agreementDate}</span>
  </div>

  <div class="signature-box">
    <div class="signature-area">
      <strong>BY: X</strong>
      ${
        formData.memberSignature
          ? `<div class="signature-image" style="background-image: url(${formData.memberSignature});"></div>`
          : `<div class="signature-image" style="background-color: #f5f5f5;"><center style="line-height: 60px; color: #888;">No signature captured</center></div>`
      }
      <div style="margin-left: 20px;"><strong>Printed Name:</strong> <span class="form-field" style="min-width: 200px;">${formData.firstName} ${formData.lastName}</span></div>
    </div>
  </div>

  <div class="notice-box">
    <strong>YOU, THE CONSUMER, MAY CANCEL THIS CONTRACT AT ANY TIME PRIOR TO MIDNIGHT OF THE THIRD BUSINESS DAY AFTER THE DATE ON WHICH THE CONTRACT IS EXECUTED.</strong>
  </div>

  <!-- PAGE 2: PAYMENT AUTHORIZATION -->
  <div class="page-break"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div class="liability-text">
    <p><strong>PURSUANT TO THE TERMS OF THIS MEMBERSHIP CONTRACT AND IN ACCORDANCE WITH THE STATED TERMS AND CONDITIONS HEREIN, I HEREBY AUTHORIZE BOXFITUTAH, LLC ("Boxfit") OR ITS ASSIGNS TO INITIATE DEBIT PAYMENTS TO THE BANK AND MY ACCOUNT INDICATED BELOW.</strong></p>
    
    <p>You may stop the payment of a pre-authorized electronic fund transfer by notifying BOXFIT in writing at any time up to three (3) business days preceding the scheduled date of such transfer.</p>
  </div>

  <div style="margin: 15px 0;">
    <div>DATE: <span class="form-field">${submissionDate}</span></div>
    <div>MEMBER NAME(S) <span class="form-field" style="min-width: 250px;">${formData.firstName} ${formData.lastName}</span></div>
    <div>CURRENT ADDRESS <span class="form-field" style="min-width: 300px;">${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</span></div>
    <div>HOME PHONE <span class="form-field">${formData.cellPhone}</span></div>
    <div>PAYMENTS: AMT $<span class="form-field">${formData.totalDue}</span> DUE <span class="form-field">1st</span> of the month beginning <span class="form-field">___/___/_____</span></div>
  </div>

  <div class="liability-text">
    <p>A late fee of $20 will be charged for all checks, electronic payments, or other payments that are not honored upon first presentment. Interest will accrue at eighteen (18) percent per annum for all late and/or missed payments. It is agreed that on any past due account sent to an attorney for collection or if collected through suit, probate, bankruptcy proceeding or by collection agency, there are paid in addition to all other charges due, the actual collection and attorney fees and court cost incurred.</p>
  </div>

  <div style="border: 1px solid #000; padding: 10px; margin: 12px 0;">
    <p><strong>ACH</strong></p>
    <p><strong>Checking/Savings Account Information:</strong></p>
    <p>Checking Account <span class="checkbox"></span> Savings Account <span class="checkbox"></span></p>
    <p>Bank Name: <span class="form-field" style="min-width: 200px;"></span></p>
    <p>Address: <span class="form-field" style="min-width: 200px;"></span></p>
    <p><span class="form-field" style="min-width: 200px;"></span></p>
    <p>Routing Number: <span class="form-field" style="min-width: 120px;"></span> Account Number: <span class="form-field" style="min-width: 120px;"></span></p>
  </div>

  <div class="signature-box">
    <p><strong>MEMBER ACKNOWLEDGES HAVING READ AND RECEIVED A FILLED IN SIGNED COPY OF THIS AGREEMENT:</strong> DATE <span class="form-field">${formData.agreementDate}</span></p>
    <div class="signature-area">
      <strong>BY: X</strong>
      ${
        formData.memberSignature
          ? `<div class="signature-image" style="background-image: url(${formData.memberSignature});"></div>`
          : `<div class="signature-image" style="background-color: #f5f5f5;"><center style="line-height: 60px; color: #888;">No signature captured</center></div>`
      }
      <div style="margin-left: 20px;"><strong>Printed Name:</strong> <span class="form-field" style="min-width: 200px;">${formData.firstName} ${formData.lastName}</span></div>
    </div>
  </div>

  <!-- PAGE 3: LIABILITY WAIVER -->
  <div class="page-break"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div class="liability-text">
    <p>In consideration of my participating in activities and my use of the facilities and equipment, owned, rented and/or operated by Boxfit Utah, LLC ("Boxfit"), I, the undersigned, hereby enter into this injury waiver and release of liability agreement.</p>

    <p>I understand and am aware that boxing, full contact sports, and other related physical activities provided by Boxfit in which I intend to participate are potentially hazardous activities. I also understand that these activities involve risk of injury or even death, and that I am voluntarily participating in these activities I acknowledge and agree that if I engage in any such activities at Boxfit, I do so at my own risk and <strong>SPECIFICALLY ASSUME ALL SUCH RISKS</strong>. I specifically agree that Boxfit is not responsible for any injury, however minor, major, or catastrophic, including death, loss, or property damages suffered while on Boxfit's premises or while participating in any Boxfit related activities. This includes specifically, but without limitation, all gym activities, use of the lockers, parking area, sidewalk, group or other exercise areas, or any equipment in the facilities, and my participating in any activity, class, program, or instruction.</p>

    <p>I CERTIFY that I am physically fit, and have sufficiently prepared or trained for participation in the programs, activities, or events offered by Boxfit. I acknowledge that I have and am hereby advised to seek and obtain any necessary medical clearances from my physician and to undertake the physical examination prior to beginning any Boxfit activity. I certify that I have obtained the necessary medical clearances to participate in Boxfit activities and programs and that there are no physical, mental or emotional, health-related reasons or problems which preclude my participation in any Boxfit activity. I acknowledge that Boxfit is relying upon this certification of my current health and fitness in allowing me to participate in any Boxfit activity.</p>

    <p>I, on behalf on myself, my family, representatives, assigns, and heirs, do hereby <strong>WAIVE, RELEASE, AND DISCHARGE</strong> from any and all liability, including but not limited to, liability arising from the negligence or fault of the entities or persons released, for my death, disability, personal injury, property damage, property theft, or actions of any kind which may have hereafter occur to me including my traveling to or from any Boxfit program, activity, or event, the following entities or persons: Boxfit, and/or its directors, officers, employees, volunteers, representatives, agents, program instructors, activity or event holders, activity or event sponsors, and activity or event volunteers.</p>

    <p>I hereby agree to <strong>INDEMNIFY, DEFEND, AND HOLD HARMLESS</strong> Boxfit, and or its directors, officers, employees, volunteers, representatives, agents, program instructors, activity or event holders, activity or event sponsors, and activity or event volunteers from any and all liabilities or claims made as a result of my participation in any Boxfit activity.</p>

    <p>I agree that any legal dispute is subject to Utah Law, and Utah jurisdiction venue for any claim subject to the agreements I have entered into with Boxfit and my participation in any Boxfit activity. I must provide notice of any claim to Boxfit within three months of the date of occurrence that gives rise to the claim. Prior to any formal action, the parties must mediate within 60 days of notice of claim provided to Boxfit. If the dispute is not resolved at mediation, the claim will be subject to litigation or arbitration at Boxfit's sole discretion, with any arbitrator chosen solely by Boxfit.</p>

    <p>I acknowledge and agree that this injury waiver and release of liability is intended to be as broad and inclusive as permitted by the laws of the state of Utah and that if any portion hereof is held invalid the balance must continue in full legal force and effect with any modifications needed to remedy the enforceability of any portion.</p>
  </div>

  ${
    formData.isMinor
      ? `
  <!-- PAGE 4: GUARDIAN SECTION FOR MINORS -->
  <div class="page-break"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div style="border: 1px solid #000; padding: 10px; margin: 12px 0;">
    <p><strong>PARENT/GUARDIAN WAIVER FOR MINORS (Under 18 years of age)</strong></p>
    <p>The undersigned parent and/or natural guardian does hereby represent that he/she/they are in fact, acting in such capacity, has consented to his/her/their child's or ward's participation in Boxfit activities and has agreed individually and on behalf of the child or ward, to the terms of the injury waiver and release of liability set forth above. The undersigned parent and/or guardian further agrees to save, hold harmless, and indemnify each and all the parties referred to above from all liability, loss, cost, attorney fees, claim, or damage whatsoever which may be imposed upon said parties because of any defect in or lack of such capacity to so indemnify and release said parties on behalf of the minor and the parents and/or guardian.</p>
  </div>

  <div class="signature-box">
    <table style="width: 100%; margin: 15px 0;">
      <tr>
        <td style="width: 33%; vertical-align: top;">
          <span class="form-field" style="min-width: 120px;">${formData.firstName} ${formData.lastName}</span><br/>
          <small>Print Name of Participant</small>
        </td>
        <td style="width: 17%; vertical-align: top;">
          <span class="form-field" style="min-width: 40px;">${formData.participantAge}</span><br/>
          <small>Age</small>
        </td>
        <td style="width: 50%; vertical-align: top;">
          X
          ${
            formData.memberSignature
              ? `<div class="signature-image" style="background-image: url(${formData.memberSignature}); width: 150px; height: 50px;"></div>`
              : `<div class="signature-image" style="background-color: #f5f5f5; width: 150px; height: 50px;"><center style="line-height: 50px; color: #888;">No signature</center></div>`
          }<br/>
          <small>Signature of Participant</small>
        </td>
      </tr>
    </table>
    
    <table style="width: 100%; margin: 15px 0;">
      <tr>
        <td style="width: 50%; vertical-align: top;">
          <span class="form-field" style="min-width: 180px;">${formData.guardianName}</span><br/>
          <small>Print Name of Parent/Guardian</small>
        </td>
        <td style="width: 50%; vertical-align: top;">
          X
          ${
            formData.guardianSignature
              ? `<div class="signature-image" style="background-image: url(${formData.guardianSignature});"></div>`
              : `<div class="signature-image" style="background-color: #f5f5f5;"><center style="line-height: 60px; color: #888;">No signature captured</center></div>`
          }<br/>
          <small>If under the age of 18, Parent/Guardian Signature</small>
        </td>
      </tr>
    </table>
  </div>
  `
      : ""
  }

  <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ccc; padding-top: 20px;">
    <p><strong>Document generated electronically on ${submissionDate}</strong></p>
    <p>BoxFit Utah LLC - 1740 S 300th W, Clearfield, UT 84015 - (385) 626-3514</p>
    <p>This document contains electronic signatures and is legally binding</p>
  </div>

</body>
</html>
  `;
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
    .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .signature-alert { background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .instructions { background-color: #e3f2fd; border: 1px solid #1976d2; padding: 15px; border-radius: 5px; margin: 20px 0; }
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
