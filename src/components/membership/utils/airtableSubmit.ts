import { FormData } from "@/components/membership/types/membershipTypes";

export const submitToAirtable = async (formData: FormData): Promise<void> => {
  const airtableData = {
    // Personal Information
    "First Name": formData.firstName,
    "Last Name": formData.lastName,
    "Date of Birth": formData.dateOfBirth,
    Email: formData.email,
    Phone: formData.phone,
    Address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,

    // Emergency Contact
    "Emergency Contact Name": formData.emergencyContactName,
    "Emergency Contact Phone": formData.emergencyContactPhone,
    "Emergency Contact Relationship": formData.emergencyContactRelationship,

    // Medical Information
    "Medical Conditions":
      [
        formData.hasHeartCondition && "Heart Condition",
        formData.hasSeizureDisorder && "Seizure Disorder",
        formData.hasHeadInjuries && "Head Injuries",
        formData.hasBreathingProblems && "Breathing Problems",
        formData.hasDiabetes && "Diabetes",
        formData.hasHighBloodPressure && "High Blood Pressure",
      ]
        .filter(Boolean)
        .join(", ") || "None",
    "Other Medical Conditions": formData.otherMedicalConditions || "None",
    "Current Medications": formData.currentMedications || "None",
    Allergies: formData.allergies || "None",
    "Previous Injuries": formData.previousInjuries || "None",
    "Physical Limitations": formData.physicalLimitations || "None",
    "Requires Physician Clearance": formData.requiresPhysicianClearance,

    // Experience
    "Boxing Experience": formData.boxingExperience,
    "Other Combat Sports": formData.otherCombatSportsExperience || "None",
    "Fitness Level": formData.fitnessLevel,
    Goals: formData.goals,

    // Membership
    "Membership Plan":
      formData.membershipPlan === "2-day"
        ? "2-Day Access ($75)"
        : "4-Day Access ($100)",
    "Start Date": formData.startDate,
    "Is Minor": formData.isMinor,

    // Legal Agreements
    "Liability Waiver": formData.agreeToLiabilityWaiver,
    "Assumption of Risk": formData.agreeToAssumptionOfRisk,
    "Membership Terms": formData.agreeToMembershipTerms,
    "Gym Rules": formData.agreeToGymRules,
    "Code of Conduct": formData.agreeToCodeOfConduct,
    "Equipment Guidelines": formData.agreeToEquipmentGuidelines,
    "Photo Release": formData.agreeToPhotoRelease,
    "Cancellation Policy": formData.agreeToCancellationPolicy,
    "Payment Terms": formData.agreeToPaymentTerms,

    // Billing
    "Cardholder Name": formData.cardholderName,
    "Billing Address": `${formData.billingAddress}, ${formData.billingCity}, ${formData.billingState} ${formData.billingZipCode}`,

    // Status
    "Application Status": "Pending Review",
    "Application Date": new Date().toISOString(),
    "Signature Date": formData.signatureDate,

    // Signatures
    "Boxer Signature": formData.boxerSignature ? "Yes" : "No",
    "Guardian Signature":
      formData.isMinor && formData.guardianSignature ? "Yes" : "No",

    // Documents
    "ID Provided": formData.isMinor
      ? "Guardian ID"
      : formData.boxerIdFile
        ? "Yes"
        : "No",
    "Physician Clearance": formData.physicianClearanceFile ? "Yes" : "No",
  };

  // Add guardian information if minor
  if (formData.isMinor) {
    Object.assign(airtableData, {
      "Guardian First Name": formData.guardianFirstName,
      "Guardian Last Name": formData.guardianLastName,
      "Guardian Email": formData.guardianEmail,
      "Guardian Phone": formData.guardianPhone,
      "Guardian Relationship": formData.guardianRelationship,
      "Guardian Address": formData.guardianAddress
        ? `${formData.guardianAddress}, ${formData.guardianCity}, ${formData.guardianState} ${formData.guardianZipCode}`
        : "Same as minor",
    });
  }

  // In a real implementation, you would:
  // 1. Upload files (IDs, physician clearance) to a file storage service
  // 2. Include the file URLs in the Airtable record
  // 3. Make the actual API call to Airtable

  // For now, we'll simulate the API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success
      console.log("Submitting to Airtable:", airtableData);
      console.log(reject);
      resolve();

      // In production, you would make the actual API call here:
      // const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ fields: airtableData }),
      // });
    }, 1500);
  });
};
