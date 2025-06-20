// src/app/api/download-membership-pdf/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real implementation, you'd retrieve the form data from your database using the ID
    // For now, we'll create a sample PDF content
    const sampleFormData = {
      firstName: "Sample",
      lastName: "Member",
      middleInitial: "M",
      birthdate: "1990-01-01",
      dlNumber: "SAMPLE123",
      address: "123 Sample St",
      city: "Clearfield",
      state: "UT",
      zipCode: "84015",
      email: "sample@example.com",
      cellPhone: "(555) 123-4567",
      employer: "Sample Company",
      workPhone: "(555) 987-6543",
      emergencyContact: "Emergency Contact",
      emergencyPhone: "(555) 111-2222",
      membershipType: "2-day",
      membershipLevel: "Monthly",
      startDate: new Date().toISOString().split("T")[0],
      initiationFee: "0",
      monthlyDues: "75",
      salesTax: "5.44",
      totalDue: "80.44",
      paymentMethod: "ACH",
      creditCardType: "",
      paymentType: "In full",
      paymentBeginning: new Date().toISOString().split("T")[0],
      isMinor: false,
      participantAge: "34",
      guardianName: "",
      agreementDate: new Date().toISOString().split("T")[0],
    };

    const htmlContent = generateMembershipAgreementHTML(sampleFormData);

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="BoxFit_Utah_Agreement_${sampleFormData.firstName}_${sampleFormData.lastName}_${new Date().toISOString().split("T")[0]}.html"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}

function generateMembershipAgreementHTML(formData: any): string {
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
    @media print {
      body { -webkit-print-color-adjust: exact; }
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
      font-size: 10px;
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
      font-size: 10px;
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
    .page-break {
      page-break-before: always;
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
      Sales Tax: $<span class="form-field">${formData.salesTax}</span> 
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

  <!-- Page 2: Payment Authorization -->
  <div class="page-break"></div>
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

  <!-- Page 3: Liability Waiver -->
  <div class="page-break"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div class="liability-text">
    <p>In consideration of my participating in activities and my use of the facilities and equipment, owned, rented and/or operated by Boxfit Utah, LLC ("Boxfit"), I, the undersigned, hereby enter into this injury waiver and release of liability agreement.</p>

    <p>I understand and am aware that boxing, full contact sports, and other related physical activities provided by Boxfit in which I intend to participate are potentially hazardous activities. I also understand that these activities involve risk of injury or even death, and that I am voluntarily participating in these activities I acknowledge and agree that if I engage in any such activities at Boxfit, I do so at my own risk and <strong>SPECIFICALLY ASSUME ALL SUCH RISKS</strong>. I specifically agree that Boxfit is not responsible for any injury, however minor, major, or catastrophic, including death, loss, or property damages suffered while on Boxfit's premises or while participating in any Boxfit related activities.</p>

    <p>I CERTIFY that I am physically fit, and have sufficiently prepared or trained for participation in the programs, activities, or events offered by Boxfit. I acknowledge that I have and am hereby advised to seek and obtain any necessary medical clearances from my physician and to undertake the physical examination prior to beginning any Boxfit activity.</p>

    <p>I, on behalf on myself, my family, representatives, assigns, and heirs, do hereby <strong>WAIVE, RELEASE, AND DISCHARGE</strong> from any and all liability, including but not limited to, liability arising from the negligence or fault of the entities or persons released, for my death, disability, personal injury, property damage, property theft, or actions of any kind which may have hereafter occur to me including my traveling to or from any Boxfit program, activity, or event, the following entities or persons: Boxfit, and/or its directors, officers, employees, volunteers, representatives, agents, program instructors, activity or event holders, activity or event sponsors, and activity or event volunteers.</p>

    <p>I hereby agree to <strong>INDEMNIFY, DEFEND, AND HOLD HARMLESS</strong> Boxfit, and or its directors, officers, employees, volunteers, representatives, agents, program instructors, activity or event holders, activity or event sponsors, and activity or event volunteers from any and all liabilities or claims made as a result of my participation in any Boxfit activity.</p>

    <p>I agree that any legal dispute is subject to Utah Law, and Utah jurisdiction venue for any claim subject to the agreements I have entered into with Boxfit and my participation in any Boxfit activity. I must provide notice of any claim to Boxfit within three months of the date of occurrence that gives rise to the claim. Prior to any formal action, the parties must mediate within 60 days of notice of claim provided to Boxfit.</p>

    <p>I acknowledge and agree that this injury waiver and release of liability is intended to be as broad and inclusive as permitted by the laws of the state of Utah and that if any portion hereof is held invalid the balance must continue in full legal force and effect with any modifications needed to remedy the enforceability of any portion.</p>
  </div>

  ${
    formData.isMinor
      ? `
  <div class="page-break"></div>
  <div class="header">BOXFIT UTAH LLC AGREEMENT</div>
  
  <div class="section">
    <p><strong>PARENT/GUARDIAN WAIVER FOR MINORS (Under 18 years of age)</strong></p>
    <p>The undersigned parent and/or natural guardian does hereby represent that he/she/they are in fact, acting in such capacity, has consented to his/her/their child's or ward's participation in Boxfit activities and has agreed individually and on behalf of the child or ward, to the terms of the injury waiver and release of liability set forth above.</p>
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
    <p>Please use your SmartPhone's Camera or QR Code Reading App to complete payment setup at collectcheckout.com</p>
  </div>
</body>
</html>
  `;
}
