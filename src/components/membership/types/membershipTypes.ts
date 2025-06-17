export type FormStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;

  // Medical Information
  hasHeartCondition: boolean;
  hasSeizureDisorder: boolean;
  hasHeadInjuries: boolean;
  hasBreathingProblems: boolean;
  hasDiabetes: boolean;
  hasHighBloodPressure: boolean;
  otherMedicalConditions: string;
  currentMedications: string;
  allergies: string;
  previousInjuries: string;
  physicalLimitations: string;
  requiresPhysicianClearance: boolean;

  // Experience
  boxingExperience: string;
  otherCombatSportsExperience: string;
  fitnessLevel: string;
  goals: string;

  // Guardian Information
  isMinor: boolean;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: string;
  guardianAddress: string;
  guardianCity: string;
  guardianState: string;
  guardianZipCode: string;

  // Membership
  membershipPlan: string;
  startDate: string;

  // Legal Agreements
  agreeToLiabilityWaiver: boolean;
  agreeToAssumptionOfRisk: boolean;
  agreeToMembershipTerms: boolean;
  agreeToGymRules: boolean;
  agreeToCodeOfConduct: boolean;
  agreeToEquipmentGuidelines: boolean;
  agreeToPhotoRelease: boolean;
  agreeToCancellationPolicy: boolean;
  agreeToPaymentTerms: boolean;
  agreeToClaimsProcedures: boolean;
  agreeToIndemnification: boolean;

  // Payment
  paymentMethod: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;

  // Files & Signatures
  boxerIdFile: File | null;
  guardianIdFile: File | null;
  physicianClearanceFile: File | null;
  boxerSignature: string;
  guardianSignature: string;
  signatureDate: string;
}
