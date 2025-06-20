import { NextRequest, NextResponse } from "next/server";
import { generateMembershipAgreementHTML } from "@/lib/generateMembershipPDF";

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
}

export async function GET() {
  try {
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
      memberSignature: "",
      guardianSignature: "",
    };

    const htmlContent = generateMembershipAgreementHTML(sampleFormData);

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="BoxFit_Utah_Agreement_Sample_${new Date().toISOString().split("T")[0]}.html"`,
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

export async function POST(request: NextRequest) {
  try {
    const formData: MembershipFormData = await request.json();

    const htmlContent = generateMembershipAgreementHTML(formData);

    const filename = `BoxFit_Utah_Agreement_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.html`;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${filename}"`,
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
