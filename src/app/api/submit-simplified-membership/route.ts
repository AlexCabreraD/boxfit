// src/app/api/submit-simplified-membership/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SimplifiedFormData {
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

    const formData: SimplifiedFormData = await request.json();

    // Generate PDF content (HTML that can be converted to PDF)
    const pdfHtml = generateMembershipAgreementHTML(formData);

    // Create PDF attachment (base64 encoded HTML)
    const pdfBase64 = Buffer.from(pdfHtml).toString("base64");

    // Generate email content
    const emailHtml = generateNotificationEmailHTML(formData);

    const { data, error } = await resend.emails.send({
      from: "BoxFit Utah Membership <membership@boxfit-utah.com>",
      to: ["AlexCabreraD22@gmail.com"],
      subject: `🥊 New Membership Application - ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
      attachments: [
        {
          filename: `BoxFit_Utah_Agreement_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.html`,
          content: pdfBase64,
        },
      ],
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

function generateMembershipAgreementHTML(formData: SimplifiedFormData): string {
  const submissionDate = new Date().toLocaleDateString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BoxFit Utah LLC Agreement</title>
  <style>
    @page { 
      size: 8.5in 11in; 
      margin: 0.5in; 
    }
    body { 
      font-family: Arial, sans-serif; 
      font-size: 11px; 
      line-height: 1.3; 
      margin: 0; 
      padding: 0;
      color: #000;
    }
    .header { 
      background-color: #4a90e2; 
      color: white; 
      text-align: center; 
      padding: 10px; 
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 14px;
    }
    .form-field { 
      display: inline-block; 
      border-bottom: 1px solid #000; 
      min-width: 100px; 
      padding-bottom: 2px;
      margin: 0 5px;
    }
    .checkbox { 
      display: inline-block; 
      width: 12px; 
      height: 12px; 
      border: 1px solid #000; 
      margin: 0 3px;
      text-align: center;
      vertical-align: middle;
    }
    .section { 
      margin-bottom: 15px; 
    }
    .membership-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 10px 0;
    }
    .membership-table th, .membership-table td { 
      border: 1px solid #000; 
      padding: 5px; 
      text-align: left;
    }
    .payment-section { 
      background-color: #f9f9f9; 
      padding: 10px; 
      border: 1px solid #ccc; 
      margin: 10px 0;
    }
    .signature-section { 
      margin-top: 20px; 
      padding: 10px; 
      border: 1px solid #000;
    }
    .notice-box { 
      background-color: #fff3cd; 
      border: 1px solid #ffeaa7; 
      padding: 8px; 
      margin: 10px 0;
      font-size: 10px;
    }
    .liability-text {
      font-size: 9px;
      text-align: justify;
      margin: 10px 0;
      line-height: 1.2;
    }
  </style>
</head>
<body>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <!-- Page 1: Member Information and Payment -->
  <div class="section">
    <p>
      Name <span class="form-field">${formData.firstName}</span> 
      <span class="form-field">${formData.middleInitial}</span> 
      <span class="form-field">${formData.lastName}</span> 
      Birthdate <span class="form-field">${formData.birthdate}</span> 
      DL # <span class="form-field">${formData.dlNumber}</span>
    </p>
    <p style="margin-left: 60px; font-size: 9px;">First &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; M/Date/Year</p>
  </div>

  <div class="section">
    <p>
      Address <span class="form-field">${formData.address}</span> 
      Email: <span class="form-field">${formData.email}</span>
    </p>
  </div>

  <div class="section">
    <p>
      City <span class="form-field">${formData.city}</span> 
      ST <span class="form-field">${formData.state}</span> 
      Zip <span class="form-field">${formData.zipCode}</span> 
      Cell Phn <span class="form-field">${formData.cellPhone}</span>
    </p>
  </div>

  <div class="section">
    <p>
      Employer <span class="form-field">${formData.employer}</span> 
      Work Phn <span class="form-field">${formData.workPhone}</span>
    </p>
  </div>

  <div class="section">
    <p>
      Emergency Contact: <span class="form-field">${formData.emergencyContact}</span> 
      Phn <span class="form-field">${formData.emergencyPhone}</span>
    </p>
  </div>

  <div class="section">
    <strong>MEMBERSHIP TYPE:</strong>
    <table class="membership-table">
      <tr>
        <td style="width: 60%;">[Full Name and description of each class]</td>
        <td style="width: 40%;">
          Monthly <span class="checkbox">${formData.membershipLevel === "Monthly" ? "✓" : ""}</span> 
          Semi-Annual <span class="checkbox">${formData.membershipLevel === "Semi-Annual" ? "✓" : ""}</span> 
          Annual <span class="checkbox">${formData.membershipLevel === "Annual" ? "✓" : ""}</span>
        </td>
      </tr>
      <tr>
        <td><strong>${formData.membershipType === "2-day" ? "2-Day Access Program" : "4-Day Access Program"}</strong> - ${formData.membershipType === "2-day" ? "2 days per week access with coaching and equipment" : "4 days per week access with enhanced training opportunities"}</td>
        <td>
          Monthly <span class="checkbox">${formData.membershipLevel === "Monthly" ? "✓" : ""}</span> 
          Semi-Annual <span class="checkbox">${formData.membershipLevel === "Semi-Annual" ? "✓" : ""}</span> 
          Annual <span class="checkbox">${formData.membershipLevel === "Annual" ? "✓" : ""}</span>
        </td>
      </tr>
    </table>
  </div>

  <div class="payment-section">
    <p><strong>Payment: The Undersigned agrees to and understands the following payment terms.</strong></p>
    <p>Start date of Membership: <span class="form-field">${formData.startDate}</span></p>
    <p>
      Initiation Fee: $<span class="form-field">${formData.initiationFee}</span> 
      Payment made by: 
      Cash <span class="checkbox">${formData.paymentMethod === "Cash" ? "✓" : ""}</span> 
      Check <span class="checkbox">${formData.paymentMethod === "Check" ? "✓" : ""}</span> 
      ACH <span class="checkbox">${formData.paymentMethod === "ACH" ? "✓" : ""}</span>
    </p>
    <p>
      Monthly Dues: $<span class="form-field">${formData.monthlyDues}</span> 
      Credit Card: 
      AMEX <span class="checkbox">${formData.creditCardType === "AMEX" ? "✓" : ""}</span> 
      Visa <span class="checkbox">${formData.creditCardType === "Visa" ? "✓" : ""}</span> 
      MC <span class="checkbox">${formData.creditCardType === "MC" ? "✓" : ""}</span> 
      Discover <span class="checkbox">${formData.creditCardType === "Discover" ? "✓" : ""}</span>
    </p>
    <p>
      Payment Method: 
      In full <span class="checkbox">${formData.paymentType === "In full" ? "✓" : ""}</span> 
      Instalments <span class="checkbox">${formData.paymentType === "Instalments" ? "✓" : ""}</span>
    </p>
    <p>
      Total Due: $<span class="form-field">${formData.totalDue}</span> 
      Beginning <span class="form-field">${formData.paymentBeginning}</span>
    </p>
  </div>

  <div class="notice-box">
    <strong>MEMBER ACKNOWLEDGES HAVING READ AND RECEIVED A FILLED IN SIGNED COPY OF THIS AGREEMENT:</strong> 
    DATE <span class="form-field">${formData.agreementDate}</span>
  </div>

  <div class="signature-section">
    <p>BY: X<span class="form-field" style="min-width: 200px;">Signed Electronically</span> 
    Printed Name: <span class="form-field">${formData.firstName} ${formData.lastName}</span></p>
  </div>

  <div class="notice-box">
    <strong>YOU, THE CONSUMER, MAY CANCEL THIS CONTRACT AT ANY TIME PRIOR TO MIDNIGHT OF THE THIRD BUSINESS DAY AFTER THE DATE ON WHICH THE CONTRACT IS EXECUTED.</strong>
  </div>

  <!-- Page Break -->
  <div style="page-break-before: always;"></div>

  <!-- Page 2: Payment Authorization -->
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <p><strong>PURSUANT TO THE TERMS OF THIS MEMBERSHIP CONTRACT AND IN ACCORDANCE WITH THE STATED TERMS AND CONDITIONS HEREIN, I HEREBY AUTHORIZE BOXFITUTAH, LLC ("Boxfit") OR ITS ASSIGNS TO INITIATE DEBIT PAYMENTS TO THE BANK AND MY ACCOUNT INDICATED BELOW.</strong></p>

  <p>You may stop the payment of a pre-authorized electronic fund transfer by notifying BOXFIT in writing at any time up to three (3) business days preceding the scheduled date of such transfer.</p>

  <div class="section">
    <p>DATE: <span class="form-field">${submissionDate}</span></p>
    <p>MEMBER NAME(S) <span class="form-field">${formData.firstName} ${formData.lastName}</span></p>
    <p>CURRENT ADDRESS <span class="form-field">${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</span></p>
    <p>HOME PHONE <span class="form-field">${formData.cellPhone}</span></p>
    <p>PAYMENTS: AMT $<span class="form-field">${formData.totalDue}</span> DUE <span class="form-field">1st</span> of the month beginning <span class="form-field">${formData.paymentBeginning || formData.startDate}</span></p>
  </div>

  <p>A late fee of $20 will be charged for all checks, electronic payments, or other payments that are not honored upon first presentment. Interest will accrue at eighteen (18) percent per annum for all late and/or missed payments. It is agreed that on any past due account sent to an attorney for collection or if collected through suit, probate, bankruptcy proceeding or by collection agency, there are paid in addition to all other charges due, the actual collection and attorney fees and court cost incurred.</p>

  <div class="section">
    <p><strong>ACH</strong></p>
    <p><strong>Checking/Savings Account Information:</strong></p>
    <p>Checking Account <span class="checkbox"></span> Savings Account <span class="checkbox"></span></p>
    <p>Bank Name: <span class="form-field" style="min-width: 200px;"></span></p>
    <p>Address: <span class="form-field" style="min-width: 200px;"></span></p>
    <p><span class="form-field" style="min-width: 200px;"></span></p>
    <p>Routing Number: <span class="form-field" style="min-width: 150px;"></span> Account Number: <span class="form-field" style="min-width: 150px;"></span></p>
  </div>

  <div class="signature-section">
    <p><strong>MEMBER ACKNOWLEDGES HAVING READ AND RECEIVED A FILLED IN SIGNED COPY OF THIS AGREEMENT:</strong> 
    DATE <span class="form-field">${formData.agreementDate}</span></p>
    <p>BY: X<span class="form-field" style="min-width: 200px;">Signed Electronically</span> 
    Printed Name: <span class="form-field">${formData.firstName} ${formData.lastName}</span></p>
  </div>

  <!-- Page Break -->
  <div style="page-break-before: always;"></div>

  <!-- Page 3: Liability Waiver -->
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

  <!-- Guardian Section for Minors -->
  ${
    formData.isMinor
      ? `
  <div style="page-break-before: always;"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div class="section">
    <p><strong>PARENT/GUARDIAN WAIVER FOR MINORS (Under 18 years of age)</strong></p>
    <p>The undersigned parent and/or natural guardian does hereby represent that he/she/they are in fact, acting in such capacity, has consented to his/her/their child's or ward's participation in Boxfit activities and has agreed individually and on behalf of the child or ward, to the terms of the injury waiver and release of liability set forth above. The undersigned parent and/or guardian further agrees to save, hold harmless, and indemnify each and all the parties referred to above from all liability, loss, cost, attorney fees, claim, or damage whatsoever which may be imposed upon said parties because of any defect in or lack of such capacity to so indemnify and release said parties on behalf of the minor and the parents and/or guardian.</p>
  </div>

  <div class="signature-section">
    <p><span class="form-field" style="min-width: 200px;">${formData.firstName} ${formData.lastName}</span> 
    <span class="form-field" style="min-width: 50px;">${formData.participantAge}</span> 
    X<span class="form-field" style="min-width: 200px;">Signed Electronically</span></p>
    <p>Print Name of Participant &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signature of Participant</p>
    
    <p><span class="form-field" style="min-width: 200px;">${formData.guardianName}</span> 
    X<span class="form-field" style="min-width: 200px;">Signed Electronically</span></p>
    <p>Print Name of Parent/Guardian &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If under the age of 18, Parent/Guardian Signature</p>
  </div>
  `
      : ""
  }

  <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #666;">
    <p>Document generated electronically on ${submissionDate}</p>
    <p>BoxFit Utah LLC - 1740 S 300th W, Clearfield, UT 84015 - (385) 626-3514</p>
  </div>
</body>
</html>
  `;
}

function generateNotificationEmailHTML(formData: SimplifiedFormData): string {
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
    .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Membership Application 🥊</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Application received: ${submissionDate}</p>
    </div>

    ${formData.isMinor ? '<div class="alert"><strong>⚠️ MINOR APPLICATION:</strong> This application is for a minor and requires guardian supervision.</div>' : ""}

    <div class="section">
      <h2>👤 Member Information</h2>
      <div class="info-item"><span class="label">Name:</span> <span class="value">${formData.firstName} ${formData.middleInitial} ${formData.lastName}</span></div>
      <div class="info-item"><span class="label">Date of Birth:</span> <span class="value">${formData.birthdate} ${formData.isMinor ? `(Age: ${formData.participantAge})` : ""}</span></div>
      <div class="info-item"><span class="label">Email:</span> <span class="value">${formData.email}</span></div>
      <div class="info-item"><span class="label">Phone:</span> <span class="value">${formData.cellPhone}</span></div>
      <div class="info-item"><span class="label">Address:</span> <span class="value">${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}</span></div>
      ${formData.dlNumber ? `<div class="info-item"><span class="label">Driver's License:</span> <span class="value">${formData.dlNumber}</span></div>` : ""}
      ${formData.employer ? `<div class="info-item"><span class="label">Employer:</span> <span class="value">${formData.employer}</span></div>` : ""}
    </div>

    <div class="section">
      <h2>🚨 Emergency Contact</h2>
      <div class="info-item"><span class="label">Contact:</span> <span class="value">${formData.emergencyContact}</span></div>
      <div class="info-item"><span class="label">Phone:</span> <span class="value">${formData.emergencyPhone}</span></div>
    </div>

    ${
      formData.isMinor
        ? `
    <div class="section">
      <h2>👨‍👩‍👧‍👦 Guardian Information</h2>
      <div class="info-item"><span class="label">Guardian Name:</span> <span class="value">${formData.guardianName}</span></div>
      <div class="info-item"><span class="label">Participant Age:</span> <span class="value">${formData.participantAge} years old</span></div>
    </div>
    `
        : ""
    }

    <div class="section">
      <h2>💳 Membership & Payment Details</h2>
      <div class="info-item"><span class="label">Membership Type:</span> <span class="value">${formData.membershipType === "2-day" ? "2-Day Access" : "4-Day Access"} (${formData.membershipLevel})</span></div>
      <div class="info-item"><span class="label">Start Date:</span> <span class="value">${formData.startDate}</span></div>
      <div class="info-item"><span class="label">Monthly Dues:</span> <span class="value">${formData.monthlyDues}</span></div>
      <div class="info-item"><span class="label">Sales Tax:</span> <span class="value">${formData.salesTax}</span></div>
      <div class="info-item"><span class="label">Total Due:</span> <span class="value">${formData.totalDue}</span></div>
      ${formData.paymentMethod ? `<div class="info-item"><span class="label">Payment Method:</span> <span class="value">${formData.paymentMethod}</span></div>` : ""}
      ${formData.creditCardType ? `<div class="info-item"><span class="label">Credit Card:</span> <span class="value">${formData.creditCardType}</span></div>` : ""}
      <div class="info-item"><span class="label">Payment Type:</span> <span class="value">${formData.paymentType}</span></div>
      ${formData.paymentBeginning ? `<div class="info-item"><span class="label">Beginning:</span> <span class="value">${formData.paymentBeginning}</span></div>` : ""}
    </div>

    <div class="section">
      <h2>📄 Agreement Status</h2>
      <div class="info-item"><span class="label">Agreement Date:</span> <span class="value">${formData.agreementDate}</span></div>
      <div class="info-item"><span class="label">Member Signature:</span> <span class="value">✅ Signed Electronically</span></div>
      ${formData.isMinor ? `<div class="info-item"><span class="label">Guardian Signature:</span> <span class="value">✅ Signed Electronically</span></div>` : ""}
      <div class="info-item"><span class="label">Completed Agreement:</span> <span class="value">📎 Attached as HTML file for printing</span></div>
    </div>

    <div class="alert">
      <h3 style="margin-top: 0;">📋 Next Steps for Coach Pablo:</h3>
      <ol style="margin-bottom: 0;">
        <li><strong>Print Agreement:</strong> Download and print the attached HTML file for physical records</li>
        <li><strong>Contact Member:</strong> Reach out to schedule their first class</li>
        <li><strong>Payment Setup:</strong> Ensure member completes payment setup via the secure link</li>
        <li><strong>Welcome to BoxFit:</strong> Prepare for their first training session</li>
      </ol>
    </div>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="text-align: center; color: #888; font-size: 14px;">
      BoxFit Utah Membership System • Application received on ${submissionDate}<br>
      Printable agreement attached • Member contact: ${formData.email} • ${formData.cellPhone}
    </p>
  </div>
</body>
</html>
  `;
}
