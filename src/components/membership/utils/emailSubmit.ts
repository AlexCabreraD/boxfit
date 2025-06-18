import { FormData } from "@/components/membership/types/membershipTypes";

const formatBoolean = (value: boolean): string => (value ? "✅ Yes" : "❌ No");

const formatMedicalConditions = (formData: FormData): string => {
  const conditions = [
    formData.hasHeartCondition && "Heart Condition",
    formData.hasSeizureDisorder && "Seizure Disorder",
    formData.hasHeadInjuries && "Head Injuries",
    formData.hasBreathingProblems && "Breathing Problems",
    formData.hasDiabetes && "Diabetes",
    formData.hasHighBloodPressure && "High Blood Pressure",
  ].filter(Boolean);

  return conditions.length > 0 ? conditions.join(", ") : "None reported";
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const submitMembershipApplication = async (
  formData: FormData,
): Promise<void> => {
  try {
    const attachments = [];

    if (formData.boxerIdFile) {
      const base64Content = await fileToBase64(formData.boxerIdFile);
      attachments.push({
        filename: `${formData.firstName}_${formData.lastName}_ID.${formData.boxerIdFile.name.split(".").pop()}`,
        content: base64Content,
        type: formData.boxerIdFile.type,
        disposition: "attachment",
      });
    }

    if (formData.guardianIdFile) {
      const base64Content = await fileToBase64(formData.guardianIdFile);
      attachments.push({
        filename: `${formData.guardianFirstName}_${formData.guardianLastName}_Guardian_ID.${formData.guardianIdFile.name.split(".").pop()}`,
        content: base64Content,
        type: formData.guardianIdFile.type,
        disposition: "attachment",
      });
    }

    if (formData.physicianClearanceFile) {
      const base64Content = await fileToBase64(formData.physicianClearanceFile);
      attachments.push({
        filename: `${formData.firstName}_${formData.lastName}_Physician_Clearance.${formData.physicianClearanceFile.name.split(".").pop()}`,
        content: base64Content,
        type: formData.physicianClearanceFile.type,
        disposition: "attachment",
      });
    }

    const emailData = {
      memberInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email || "Not provided (minor)",
        phone: formData.phone || "Not provided (minor)",
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        isMinor: formData.isMinor,
      },
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship,
      },
      guardianInfo: formData.isMinor
        ? {
            firstName: formData.guardianFirstName,
            lastName: formData.guardianLastName,
            email: formData.guardianEmail,
            phone: formData.guardianPhone,
            relationship: formData.guardianRelationship,
            address: formData.guardianAddress || "Same as minor",
          }
        : null,
      medicalInfo: {
        conditions: formatMedicalConditions(formData),
        otherConditions: formData.otherMedicalConditions || "None",
        medications: formData.currentMedications || "None",
        allergies: formData.allergies || "None",
        previousInjuries: formData.previousInjuries || "None",
        physicalLimitations: formData.physicalLimitations || "None",
      },
      experience: {
        boxingExperience: formData.boxingExperience,
        otherCombatSports: formData.otherCombatSportsExperience || "None",
        fitnessLevel: formData.fitnessLevel,
        goals: formData.goals || "Not specified",
      },
      membership: {
        plan:
          formData.membershipPlan === "2-day"
            ? "2-Day Access ($75/month)"
            : "4-Day Access ($100/month)",
        desiredStartDate: formData.startDate || "To be determined",
      },
      legalAgreements: {
        liabilityWaiver: formatBoolean(formData.agreeToLiabilityWaiver),
        assumptionOfRisk: formatBoolean(formData.agreeToAssumptionOfRisk),
        membershipTerms: formatBoolean(formData.agreeToMembershipTerms),
        gymRules: formatBoolean(formData.agreeToGymRules),
        codeOfConduct: formatBoolean(formData.agreeToCodeOfConduct),
        equipmentGuidelines: formatBoolean(formData.agreeToEquipmentGuidelines),
        photoRelease: formatBoolean(formData.agreeToPhotoRelease),
        cancellationPolicy: formatBoolean(formData.agreeToCancellationPolicy),
        paymentTerms: formatBoolean(formData.agreeToPaymentTerms),
        claimsProcedures: formatBoolean(formData.agreeToClaimsProcedures),
        indemnification: formatBoolean(formData.agreeToIndemnification),
      },
      billing: {
        name: formData.cardholderName,
        address: `${formData.billingAddress}, ${formData.billingCity}, ${formData.billingState} ${formData.billingZipCode}`,
      },
      documents: {
        boxerSignature: formData.boxerSignature ? "✅ Completed" : "❌ Missing",
        guardianSignature: formData.isMinor
          ? formData.guardianSignature
            ? "✅ Completed"
            : "❌ Missing"
          : "N/A",
        boxerIdProvided: formData.boxerIdFile
          ? "✅ Uploaded"
          : formData.isMinor
            ? "N/A"
            : "❌ Missing",
        guardianIdProvided: formData.guardianIdFile
          ? "✅ Uploaded"
          : formData.isMinor
            ? "❌ Missing"
            : "N/A",
        physicianClearance: "Coach will determine if needed",
      },
      applicationDate: new Date().toLocaleString(),
      attachments,
    };

    const response = await fetch("/api/send-membership-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Email sending failed: ${response.status} - ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error submitting membership application:", error);
    throw new Error(
      "Failed to submit application. Please try again or contact us at (385) 626-3514.",
    );
  }
};
