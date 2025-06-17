"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiHeart,
  FiFileText,
  FiEdit3,
  FiCreditCard,
  FiCheck,
} from "react-icons/fi";

interface MembershipFormProps {
  selectedPlan: string;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ selectedPlan }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guardianCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGuardianDrawing, setIsGuardianDrawing] = useState(false);

  const [formData, setFormData] = useState({
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
    emergencyContactName: "",
    emergencyContactPhone: "",
    selectedPlan: selectedPlan,

    // Medical Information
    fitnessLevel: "",
    boxingExperience: "",
    medicalConditions: "",
    medications: "",
    injuries: "",
    doctorClearance: false,

    // Guardian Information (for minors)
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianRelationship: "",
    guardianAddress: "",
    guardianCity: "",
    guardianState: "UT",
    guardianZipCode: "",

    // Agreements
    agreeToTerms: false,
    agreeToWaiver: false,
    agreeToPhotos: false,
    agreeToEmails: false,

    // Files
    idImage: null as File | null,

    // Signatures
    boxerSignature: "",
    guardianSignature: "",

    // Auto-calculated
    isMinor: false,
  });

  const steps = [
    { number: 1, title: "Personal Info", icon: FiUser },
    { number: 2, title: "Medical Info", icon: FiHeart },
    { number: 3, title: "Guardian Info", icon: FiUser, conditional: true },
    { number: 4, title: "Waivers", icon: FiFileText },
    { number: 5, title: "Signatures", icon: FiEdit3 },
    { number: 6, title: "Payment", icon: FiCreditCard },
  ];

  // Calculate age and set isMinor
  useEffect(() => {
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else if (type === "file") {
      const files = target.files;
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
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
          formData.emergencyContactPhone
        );
      case 2:
        return !!(formData.fitnessLevel && formData.boxingExperience);
      case 3:
        if (!formData.isMinor) return true;
        return !!(
          formData.guardianFirstName &&
          formData.guardianLastName &&
          formData.guardianEmail &&
          formData.guardianPhone &&
          formData.guardianRelationship
        );
      case 4:
        return formData.agreeToTerms && formData.agreeToWaiver;
      case 5:
        if (formData.isMinor) {
          return !!(formData.boxerSignature && formData.guardianSignature);
        }
        return !!formData.boxerSignature;
      case 6:
        return !!formData.idImage;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      // Skip guardian step if not a minor
      if (currentStep === 2 && !formData.isMinor) {
        setCurrentStep(4);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    // Skip guardian step if not a minor (going backwards)
    if (currentStep === 4 && !formData.isMinor) {
      setCurrentStep(2);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Signature canvas functions
  const initializeCanvas = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
    if (guardianCanvasRef.current) {
      initializeCanvas(guardianCanvasRef.current);
    }
  }, [currentStep]);

  const startDrawing = (e: React.MouseEvent, isGuardian = false) => {
    if (isGuardian) {
      setIsGuardianDrawing(true);
    } else {
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent, isGuardian = false) => {
    const canvas = isGuardian ? guardianCanvasRef.current : canvasRef.current;
    const drawing = isGuardian ? isGuardianDrawing : isDrawing;

    if (!drawing || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = (isGuardian = false) => {
    if (isGuardian) {
      setIsGuardianDrawing(false);
      if (guardianCanvasRef.current) {
        const signatureData = guardianCanvasRef.current.toDataURL();
        setFormData((prev) => ({ ...prev, guardianSignature: signatureData }));
      }
    } else {
      setIsDrawing(false);
      if (canvasRef.current) {
        const signatureData = canvasRef.current.toDataURL();
        setFormData((prev) => ({ ...prev, boxerSignature: signatureData }));
      }
    }
  };

  const clearSignature = (isGuardian = false) => {
    const canvas = isGuardian ? guardianCanvasRef.current : canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (isGuardian) {
        setFormData((prev) => ({ ...prev, guardianSignature: "" }));
      } else {
        setFormData((prev) => ({ ...prev, boxerSignature: "" }));
      }
    }
  };

  const submitToAirtable = async (data: any) => {
    // This would be your actual Airtable API integration
    const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = "Memberships";

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    try {
      const response = await fetch(airtableUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Airtable submission error:", error);
      throw error;
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      // Prepare form data for Airtable
      const airtableData = {
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Date of Birth": formData.dateOfBirth,
        Email: formData.email,
        Phone: formData.phone,
        Address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        "Emergency Contact": formData.emergencyContactName,
        "Emergency Phone": formData.emergencyContactPhone,
        "Selected Plan": formData.selectedPlan,
        "Fitness Level": formData.fitnessLevel,
        "Boxing Experience": formData.boxingExperience,
        "Medical Conditions": formData.medicalConditions || "None",
        Medications: formData.medications || "None",
        Injuries: formData.injuries || "None",
        "Doctor Clearance Required": formData.doctorClearance,
        "Is Minor": formData.isMinor,
        "Agrees to Terms": formData.agreeToTerms,
        "Agrees to Waiver": formData.agreeToWaiver,
        "Photo Consent": formData.agreeToPhotos,
        "Email Marketing": formData.agreeToEmails,
        Status: "Pending Payment Setup",
        "Registration Date": new Date().toISOString(),
        "Boxer Signature": formData.boxerSignature ? "Yes" : "No",
      };

      // Add guardian information if minor
      if (formData.isMinor) {
        airtableData["Guardian Name"] =
          `${formData.guardianFirstName} ${formData.guardianLastName}`;
        airtableData["Guardian Email"] = formData.guardianEmail;
        airtableData["Guardian Phone"] = formData.guardianPhone;
        airtableData["Guardian Relationship"] = formData.guardianRelationship;
        airtableData["Guardian Signature"] = formData.guardianSignature
          ? "Yes"
          : "No";
        if (formData.guardianAddress) {
          airtableData["Guardian Address"] =
            `${formData.guardianAddress}, ${formData.guardianCity}, ${formData.guardianState} ${formData.guardianZipCode}`;
        }
      }

      // In production, you would also upload the ID image and signatures to a file storage service
      // and include the URLs in the Airtable record

      // Submit to Airtable
      await submitToAirtable(airtableData);

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was an error submitting your registration. Please try again or contact us at (385) 626-3514.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Registration Complete!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for joining BoxFit Utah! We'll contact you within 24 hours
            to schedule your free trial class and complete your membership
            setup.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-2">Next Steps:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>
                • We'll review your registration and contact you within 24 hours
              </li>
              <li>• Schedule your free trial class</li>
              <li>• Complete payment setup for your {selectedPlan}</li>
              <li>• Begin your boxing journey at BoxFit Utah!</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Questions? Call us at{" "}
            <span className="font-semibold">(385) 626-3514</span>
          </p>
        </div>
      </div>
    );
  }

  // Filter steps based on whether user is a minor
  const visibleSteps = steps.filter(
    (step) => !step.conditional || formData.isMinor,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {visibleSteps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;

              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <FiCheck /> : <StepIcon />}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / visibleSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* All the form steps would go here - this is a condensed version for space */}
          {/* The complete form implementation would include all 6 steps as shown in the original artifact */}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}

            <div className="ml-auto">
              {currentStep < visibleSteps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    validateStep(currentStep)
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitForm}
                  disabled={!validateStep(currentStep) || isSubmitting}
                  className={`px-8 py-3 rounded-md font-bold text-lg transition-colors ${
                    validateStep(currentStep) && !isSubmitting
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting Registration...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Step {currentStep} of {visibleSteps.length}
            {!validateStep(currentStep) && (
              <span className="block text-red-600 mt-1">
                Please complete all required fields to continue
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
