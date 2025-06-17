// src/components/membership/MembershipSignupForm.tsx
import React, { useState } from "react";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import MedicalInfoStep from "./steps/MedicalInfoStep";
import GuardianInfoStep from "./steps/GuardianInfoStep";
import LegalWaiversStep from "./steps/LegalWaiversStep";
import SignaturesStep from "./steps/SignaturesStep";
import PaymentInfoStep from "./steps/PaymentInfoStep";
import { FormData, FormStep } from "./types/membershipTypes";
import { submitToAirtable } from "./utils/airtableSubmit";
import FormProgress from "./components/FormProgress";
import FormNavigation from "./components/FormNavigation";
import SuccessMessage from "./components/SuccessMessage";

const MembershipSignupForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "UT",
    zipCode: "",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",

    // Medical Information
    hasHeartCondition: false,
    hasSeizureDisorder: false,
    hasHeadInjuries: false,
    hasBreathingProblems: false,
    hasDiabetes: false,
    hasHighBloodPressure: false,
    otherMedicalConditions: "",
    currentMedications: "",
    allergies: "",
    previousInjuries: "",
    physicalLimitations: "",
    requiresPhysicianClearance: false,

    // Experience
    boxingExperience: "none",
    otherCombatSportsExperience: "",
    fitnessLevel: "beginner",
    goals: "",

    // Guardian Information (if minor)
    isMinor: false,
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianRelationship: "",
    guardianAddress: "",
    guardianCity: "",
    guardianState: "UT",
    guardianZipCode: "",

    // Membership Selection
    membershipPlan: "2-day", // '2-day' or '4-day'
    startDate: "",

    // Legal Agreements
    agreeToLiabilityWaiver: false,
    agreeToAssumptionOfRisk: false,
    agreeToMembershipTerms: false,
    agreeToGymRules: false,
    agreeToCodeOfConduct: false,
    agreeToEquipmentGuidelines: false,
    agreeToPhotoRelease: false,
    agreeToCancellationPolicy: false,
    agreeToPaymentTerms: false,

    // Payment Information
    paymentMethod: "card",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "UT",
    billingZipCode: "",

    // Files & Signatures
    boxerIdFile: null,
    guardianIdFile: null,
    physicianClearanceFile: null,
    boxerSignature: "",
    guardianSignature: "",
    signatureDate: new Date().toISOString().split("T")[0],
  });

  // Calculate if user is a minor based on date of birth
  React.useEffect(() => {
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      const isMinor =
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 &&
          monthDiff === 0 &&
          today.getDate() < birthDate.getDate());

      setFormData((prev) => ({ ...prev, isMinor }));
    }
  }, [formData.dateOfBirth]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1: // Personal Info
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.dateOfBirth &&
          formData.email &&
          formData.phone &&
          formData.address &&
          formData.city &&
          formData.zipCode &&
          formData.emergencyContactName &&
          formData.emergencyContactPhone &&
          formData.emergencyContactRelationship
        );

      case 2: // Medical Info
        return true; // Medical info is optional but encouraged

      case 3: // Guardian Info
        if (!formData.isMinor) return true;
        return !!(
          formData.guardianFirstName &&
          formData.guardianLastName &&
          formData.guardianEmail &&
          formData.guardianPhone &&
          formData.guardianRelationship &&
          formData.guardianIdFile
        );

      case 4: // Legal Waivers
        return (
          formData.agreeToLiabilityWaiver &&
          formData.agreeToAssumptionOfRisk &&
          formData.agreeToMembershipTerms &&
          formData.agreeToGymRules &&
          formData.agreeToCodeOfConduct &&
          formData.agreeToEquipmentGuidelines &&
          formData.agreeToCancellationPolicy &&
          formData.agreeToPaymentTerms
        );

      case 5: // Signatures
        return !!(
          formData.boxerSignature &&
          (formData.isMinor ? formData.guardianSignature : true) &&
          (formData.isMinor || formData.boxerIdFile)
        );

      case 6: // Payment Info
        return !!(
          formData.membershipPlan &&
          formData.cardholderName &&
          formData.billingAddress &&
          formData.billingCity &&
          formData.billingZipCode
        );

      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      // Skip guardian step if not a minor
      if (currentStep === 2 && !formData.isMinor) {
        setCurrentStep(4);
      } else {
        setCurrentStep((prev) => (prev + 1) as FormStep);
      }
    }
  };

  const handlePrevious = () => {
    // Skip guardian step if not a minor (going backwards)
    if (currentStep === 4 && !formData.isMinor) {
      setCurrentStep(2);
    } else {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitToAirtable(formData);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        "There was an error submitting your application. Please try again or contact us at (385) 626-3514.",
      );
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return <SuccessMessage formData={formData} />;
  }

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Medical Info" },
    { number: 3, title: "Guardian Info", conditional: formData.isMinor },
    { number: 4, title: "Legal Waivers" },
    { number: 5, title: "Signatures" },
    { number: 6, title: "Payment Info" },
  ];

  const visibleSteps = steps.filter(
    (step) => !step.hasOwnProperty("conditional") || step.conditional,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BoxFit Utah Membership Application
          </h1>
          <p className="text-lg text-gray-600">
            Complete all steps to join our boxing community
          </p>
        </div>

        <FormProgress currentStep={currentStep} steps={visibleSteps} />

        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {submitError}
            </div>
          )}

          {currentStep === 1 && (
            <PersonalInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 2 && (
            <MedicalInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 3 && formData.isMinor && (
            <GuardianInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 4 && (
            <LegalWaiversStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 5 && (
            <SignaturesStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 6 && (
            <PaymentInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={visibleSteps.length}
            canProceed={validateCurrentStep()}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipSignupForm;
