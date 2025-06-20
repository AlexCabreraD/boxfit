// src/components/membership/SimplifiedMembershipForm.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiUpload,
} from "react-icons/fi";
import Link from "next/link";

interface SimplifiedFormData {
  // Personal Information
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

  // ID Files
  memberIdFile: File | null;
  guardianIdFile: File | null;

  // Membership Type
  membershipType: string;
  membershipLevel: string; // Monthly, Semi-Annual, Annual
  totalDue: string;

  // Payment Information
  startDate: string;
  initiationFee: string;

  // Guardian Information (for minors)
  isMinor: boolean;
  participantAge: string;
  guardianName: string;
  guardianSignature: string;

  // Member Signature
  memberSignature: string;
  agreementDate: string;
}

const SimplifiedMembershipForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const memberCanvasRef = useRef<HTMLCanvasElement>(null);
  const guardianCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingMember, setIsDrawingMember] = useState(false);
  const [isDrawingGuardian, setIsDrawingGuardian] = useState(false);

  const [formData, setFormData] = useState<SimplifiedFormData>({
    firstName: "",
    lastName: "",
    middleInitial: "",
    birthdate: "",
    dlNumber: "",
    address: "",
    city: "",
    state: "UT",
    zipCode: "",
    email: "",
    cellPhone: "",
    employer: "",
    workPhone: "",
    emergencyContact: "",
    emergencyPhone: "",
    membershipType: "",
    membershipLevel: "Monthly",
    startDate: "",
    initiationFee: "0",
    totalDue: "- -",
    isMinor: false,
    participantAge: "",
    guardianName: "",
    guardianSignature: "",
    memberSignature: "",
    agreementDate: new Date().toISOString().split("T")[0],
    memberIdFile: null,
    guardianIdFile: null,
  });

  // Form validation function
  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Required personal information
    if (!formData.firstName.trim()) errors.push("First Name is required");
    if (!formData.lastName.trim()) errors.push("Last Name is required");
    if (!formData.birthdate) errors.push("Birthdate is required");
    if (!formData.address.trim()) errors.push("Address is required");
    if (!formData.city.trim()) errors.push("City is required");
    if (!formData.zipCode.trim()) errors.push("ZIP Code is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.cellPhone.trim()) errors.push("Cell Phone is required");
    if (!formData.emergencyContact.trim())
      errors.push("Emergency Contact is required");
    if (!formData.emergencyPhone.trim())
      errors.push("Emergency Phone is required");

    // Membership selection
    if (!formData.membershipType)
      errors.push("Membership Type must be selected");

    // Payment information
    if (!formData.startDate) errors.push("Start Date is required");

    // Signatures
    if (!formData.memberSignature) errors.push("Member signature is required");
    if (formData.isMinor && !formData.guardianSignature)
      errors.push("Guardian signature is required");
    if (formData.isMinor && !formData.guardianName.trim())
      errors.push("Guardian Name is required");

    // ID Files
    if (!formData.isMinor && !formData.memberIdFile) {
      errors.push("Member ID upload is required");
    }
    if (formData.isMinor && !formData.guardianIdFile) {
      errors.push("Guardian ID upload is required");
    }

    return errors;
  };

  // Canvas signature handling
  React.useEffect(() => {
    const initCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2; // Higher resolution for better quality
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(2, 2); // Scale for high DPI
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    initCanvas(memberCanvasRef.current);
    if (formData.isMinor) {
      initCanvas(guardianCanvasRef.current);
    }
  }, [formData.isMinor]);

  const getMousePos = (
    canvas: HTMLCanvasElement,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    isGuardian: boolean,
  ) => {
    e.preventDefault();
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : memberCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);

    if (isGuardian) {
      setIsDrawingGuardian(true);
    } else {
      setIsDrawingMember(true);
    }

    // Start a new path - this prevents connecting to previous strokes
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    isGuardian: boolean,
  ) => {
    e.preventDefault();
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : memberCanvasRef.current;
    const isDrawing = isGuardian ? isDrawingGuardian : isDrawingMember;

    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);

    // Draw line to current position
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (isGuardian: boolean) => {
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : memberCanvasRef.current;

    if (isGuardian) {
      setIsDrawingGuardian(false);
    } else {
      setIsDrawingMember(false);
    }

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // End the current path
        ctx.beginPath();
      }

      // Update form data with signature
      setFormData((prev) => ({
        ...prev,
        [isGuardian ? "guardianSignature" : "memberSignature"]:
          canvas.toDataURL(),
      }));
    }
  };

  const clearSignature = (isGuardian: boolean) => {
    const canvas = isGuardian
      ? guardianCanvasRef.current
      : memberCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setFormData((prev) => ({
        ...prev,
        [isGuardian ? "guardianSignature" : "memberSignature"]: "",
      }));
    }
  };

  // Calculate if user is a minor based on birthdate
  React.useEffect(() => {
    if (formData.birthdate) {
      const today = new Date();
      const birthDate = new Date(formData.birthdate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      const calculatedAge =
        age -
        (monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ? 1
          : 0);
      const isMinor = calculatedAge < 18;

      setFormData((prev) => ({
        ...prev,
        isMinor,
        participantAge: calculatedAge.toString(),
      }));
    }
  }, [formData.birthdate]);

  // Calculate membership pricing
  React.useEffect(() => {
    if (formData.membershipType) {
      let totalAmount = 0;
      if (formData.membershipType === "2-day") {
        totalAmount = 75; // Post-tax price
      } else if (formData.membershipType === "4-day") {
        totalAmount = 100; // Post-tax price
      }

      // Calculate pre-tax amount (reverse calculate from total)
      const preTaxAmount = Math.round((totalAmount / 1.0725) * 100) / 100;

      setFormData((prev) => ({
        ...prev,
        monthlyDues: preTaxAmount.toString(),
        totalDue: totalAmount.toString(),
      }));
    }
  }, [formData.membershipType]);

  React.useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    setFormData((prev) => ({
      ...prev,
      startDate: prev.startDate || nextWeek.toISOString().split("T")[0],
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "member" | "guardian",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fileType === "member" ? "memberIdFile" : "guardianIdFile"]: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    setValidationErrors(errors);

    if (errors.length > 0) {
      return; // Don't submit if there are validation errors
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Convert ID files to base64 if they exist
      let memberIdFileBase64 = "";
      let guardianIdFileBase64 = "";

      if (!formData.isMinor && formData.memberIdFile) {
        memberIdFileBase64 = await fileToBase64(formData.memberIdFile);
      }

      if (formData.isMinor && formData.guardianIdFile) {
        guardianIdFileBase64 = await fileToBase64(formData.guardianIdFile);
      }

      // Use the new PDF API endpoint
      const response = await fetch("/api/generate-membership-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          agreementDate: new Date().toLocaleDateString(),
          memberSignature: formData.memberSignature,
          guardianSignature: formData.guardianSignature,
          memberIdFile: memberIdFileBase64,
          guardianIdFile: guardianIdFileBase64,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      console.log("PDF generated successfully:", result.filename);
      console.log("Signatures attached:", result.signaturesAttached);
      console.log("ID files attached:", result.idFilesAttached);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const isFormValid = validateForm().length === 0;

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for joining BoxFit Utah! We&#39;ve received your
            membership application.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-blue-800 mb-3">
              🔒 Complete Your Payment Setup
            </h4>
            <p className="text-blue-700 text-sm mb-4">
              Set up your payment information using our secure portal. You will
              not be charged until after your free trial class.
            </p>
            <a
              href="https://collectcheckout.com/r/f1tii0puusd8nfr5zchzdxpcozhnf2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Set Up Payment Information
            </a>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-green-800 mb-3">
              📄 Download Your Agreement
            </h4>
            <p className="text-green-700 text-sm mb-4">
              Download a copy of your completed membership agreement for your
              records.
            </p>
            <button
              onClick={() =>
                window.open(
                  `/api/download-membership-pdf?id=${Date.now()}`,
                  "_blank",
                )
              }
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Download Agreement PDF
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-2">Questions? Contact us:</p>
            <p className="font-semibold text-lg">
              <a
                href="tel:+13856263514"
                className="text-red-600 hover:text-red-700"
              >
                (385) 626-3514
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Back to Home
            </Link>
            <Link
              href="/schedule"
              className="border border-red-600 text-red-600 px-6 py-3 rounded-md hover:bg-red-50 transition-colors font-medium"
            >
              View Class Schedule
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BoxFit Utah Membership Agreement
          </h1>
          <p className="text-lg text-gray-600">
            Complete your membership application
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {submitError}
            </div>
          )}

          {validationErrors.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Please complete the following required fields:
              </h4>
              <ul className="text-yellow-700 text-sm list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b pb-8">
              <div className="flex items-center mb-6">
                <FiUser className="text-red-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MI
                  </label>
                  <input
                    type="text"
                    name="middleInitial"
                    value={formData.middleInitial}
                    onChange={handleChange}
                    maxLength={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birthdate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DL #
                  </label>
                  <input
                    type="text"
                    name="dlNumber"
                    value={formData.dlNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="UT">Utah</option>
                    <option value="ID">Idaho</option>
                    <option value="WY">Wyoming</option>
                    <option value="CO">Colorado</option>
                    <option value="NV">Nevada</option>
                    <option value="AZ">Arizona</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cell Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Phone
                  </label>
                  <input
                    type="tel"
                    name="workPhone"
                    value={formData.workPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer
                  </label>
                  <input
                    type="text"
                    name="employer"
                    value={formData.employer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Photo ID Upload Section */}
            <div className="border-b pb-8">
              <div className="flex items-center mb-6">
                <FiUpload className="text-red-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Photo Identification
                </h2>
              </div>

              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Legal Requirement:</strong> We are required by law to
                  have a valid government-issued photo ID on file for all
                  members. For minors under 18, we need the guardian&#39;s ID
                  instead.
                </p>
              </div>

              {!formData.isMinor ? (
                // Member ID Upload (for adults)
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Your Photo ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "member")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Accepted formats: JPG, PNG, PDF (max 10MB). Please upload a
                    clear photo of your driver&#39;s license, state ID, or
                    passport.
                  </p>
                  {formData.memberIdFile && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ File uploaded: {formData.memberIdFile.name}
                    </p>
                  )}
                </div>
              ) : (
                // Guardian ID Upload (for minors)
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Guardian/Parent Photo ID{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "guardian")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Accepted formats: JPG, PNG, PDF (max 10MB). Please upload a
                    clear photo of the parent/guardian&#39;s driver&#39;s
                    license, state ID, or passport.
                  </p>
                  {formData.guardianIdFile && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ File uploaded: {formData.guardianIdFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Membership Type Section */}
            <div className="border-b pb-8">
              <div className="flex items-center mb-6">
                <FiCalendar className="text-red-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Membership Type
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Membership <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="membershipType"
                          value="2-day"
                          checked={formData.membershipType === "2-day"}
                          onChange={handleChange}
                          className="mr-2"
                          required
                        />
                        <span>2-Day Access - $75/month (includes tax)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="membershipType"
                          value="4-day"
                          checked={formData.membershipType === "4-day"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>4-Day Access - $100/month (includes tax)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Schedule
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="membershipLevel"
                          value="Monthly"
                          checked={formData.membershipLevel === "Monthly"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Monthly</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="membershipLevel"
                          value="Semi-Annual"
                          checked={formData.membershipLevel === "Semi-Annual"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Semi-Annual</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="membershipLevel"
                          value="Annual"
                          checked={formData.membershipLevel === "Annual"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Annual</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between">
                  <h3 className="font-semibold mb-3">Membership Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Monthly:</span>
                      <span>${formData.totalDue}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm">
                      <strong>🎉 Free Trial:</strong> Your first class is
                      completely free! You will only be charged starting from
                      your second visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information Section */}
            <div className="border-b pb-8">
              <div className="flex items-center mb-6">
                <FiDollarSign className="text-red-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date of Membership{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initiation Fee
                  </label>
                  <input
                    type="number"
                    name="initiationFee"
                    value={formData.initiationFee}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Payment Authorization Agreement */}
            <div className="border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Payment Authorization Agreement
              </h2>

              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
                <div className="text-sm text-gray-800 space-y-4">
                  <p>
                    <strong>
                      PURSUANT TO THE TERMS OF THIS MEMBERSHIP CONTRACT AND IN
                      ACCORDANCE WITH THE STATED TERMS AND CONDITIONS HEREIN, I
                      HEREBY AUTHORIZE BOXFITUTAH, LLC (&#34;Boxfit&#34;) OR ITS
                      ASSIGNS TO INITIATE DEBIT PAYMENTS TO THE BANK AND MY
                      ACCOUNT INDICATED BELOW.
                    </strong>
                  </p>

                  <p>
                    You may stop the payment of a pre-authorized electronic fund
                    transfer by notifying BOXFIT in writing at any time up to
                    three (3) business days preceding the scheduled date of such
                    transfer.
                  </p>

                  <p>
                    A late fee of $20 will be charged for all checks, electronic
                    payments, or other payments that are not honored upon first
                    presentment. Interest will accrue at eighteen (18) percent
                    per annum for all late and/or missed payments. It is agreed
                    that on any past due account sent to an attorney for
                    collection or if collected through suit, probate, bankruptcy
                    proceeding or by collection agency, there are paid in
                    addition to all other charges due, the actual collection and
                    attorney fees and court cost incurred.
                  </p>
                </div>
              </div>
            </div>

            {/* Liability Waiver and Release Agreement */}
            <div className="border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Liability Waiver and Release of Claims
              </h2>

              <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
                <div className="text-sm text-gray-800 space-y-4 leading-relaxed">
                  <p>
                    In consideration of my participating in activities and my
                    use of the facilities and equipment, owned, rented and/or
                    operated by Boxfit Utah, LLC (&#34;Boxfit&#34;), I, the
                    undersigned, hereby enter into this injury waiver and
                    release of liability agreement.
                  </p>

                  <p>
                    I understand and am aware that boxing, full contact sports,
                    and other related physical activities provided by Boxfit in
                    which I intend to participate are potentially hazardous
                    activities. I also understand that these activities involve
                    risk of injury or even death, and that I am voluntarily
                    participating in these activities I acknowledge and agree
                    that if I engage in any such activities at Boxfit, I do so
                    at my own risk and{" "}
                    <strong>SPECIFICALLY ASSUME ALL SUCH RISKS</strong>. I
                    specifically agree that Boxfit is not responsible for any
                    injury, however minor, major, or catastrophic, including
                    death, loss, or property damages suffered while on
                    Boxfit&#39;s premises or while participating in any Boxfit
                    related activities. This includes specifically, but without
                    limitation, all gym activities, use of the lockers, parking
                    area, sidewalk, group or other exercise areas, or any
                    equipment in the facilities, and my participating in any
                    activity, class, program, or instruction.
                  </p>

                  <p>
                    I CERTIFY that I am physically fit, and have sufficiently
                    prepared or trained for participation in the programs,
                    activities, or events offered by Boxfit. I acknowledge that
                    I have and am hereby advised to seek and obtain any
                    necessary medical clearances from my physician and to
                    undertake the physical examination prior to beginning any
                    Boxfit activity. I certify that I have obtained the
                    necessary medical clearances to participate in Boxfit
                    activities and programs and that there are no physical,
                    mental or emotional, health-related reasons or problems
                    which preclude my participation in any Boxfit activity. I
                    acknowledge that Boxfit is relying upon this certification
                    of my current health and fitness in allowing me to
                    participate in any Boxfit activity.
                  </p>

                  <p>
                    I, on behalf on myself, my family, representatives, assigns,
                    and heirs, do hereby{" "}
                    <strong>WAIVE, RELEASE, AND DISCHARGE</strong> from any and
                    all liability, including but not limited to, liability
                    arising from the negligence or fault of the entities or
                    persons released, for my death, disability, personal injury,
                    property damage, property theft, or actions of any kind
                    which may have hereafter occur to me including my traveling
                    to or from any Boxfit program, activity, or event, the
                    following entities or persons: Boxfit, and/or its directors,
                    officers, employees, volunteers, representatives, agents,
                    program instructors, activity or event holders, activity or
                    event sponsors, and activity or event volunteers.
                  </p>

                  <p>
                    I hereby agree to{" "}
                    <strong>INDEMNIFY, DEFEND, AND HOLD HARMLESS</strong>{" "}
                    Boxfit, and or its directors, officers, employees,
                    volunteers, representatives, agents, program instructors,
                    activity or event holders, activity or event sponsors, and
                    activity or event volunteers from any and all liabilities or
                    claims made as a result of my participation in any Boxfit
                    activity.
                  </p>

                  <p>
                    I agree that any legal dispute is subject to Utah Law, and
                    Utah jurisdiction venue for any claim subject to the
                    agreements I have entered into with Boxfit and my
                    participation in any Boxfit activity. I must provide notice
                    of any claim to Boxfit within three months of the date of
                    occurrence that gives rise to the claim. Prior to any formal
                    action, the parties must mediate within 60 days of notice of
                    claim provided to Boxfit. If the dispute is not resolved at
                    mediation, the claim will be subject to litigation or
                    arbitration at Boxfit&#39;s sole discretion, with any
                    arbitrator chosen solely by Boxfit.
                  </p>

                  <p>
                    I acknowledge and agree that this injury waiver and release
                    of liability is intended to be as broad and inclusive as
                    permitted by the laws of the state of Utah and that if any
                    portion hereof is held invalid the balance must continue in
                    full legal force and effect with any modifications needed to
                    remedy the enforceability of any portion.
                  </p>
                </div>
              </div>

              {/* Consumer Rights Notice */}
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>
                    YOU, THE CONSUMER, MAY CANCEL THIS CONTRACT AT ANY TIME
                    PRIOR TO MIDNIGHT OF THE THIRD BUSINESS DAY AFTER THE DATE
                    ON WHICH THE CONTRACT IS EXECUTED.
                  </strong>
                </p>
              </div>
            </div>

            {/* Guardian Waiver for Minors */}
            {formData.isMinor && (
              <div className="border-b pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Parent/Guardian Waiver for Minors
                </h2>

                <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-6">
                  <div className="text-sm text-gray-800 space-y-4">
                    <p>
                      <strong>
                        PARENT/GUARDIAN WAIVER FOR MINORS (Under 18 years of
                        age)
                      </strong>
                    </p>

                    <p>
                      The undersigned parent and/or natural guardian does hereby
                      represent that he/she/they are in fact, acting in such
                      capacity, has consented to his/her/their child&#39;s or
                      ward&#39;s participation in Boxfit activities and has
                      agreed individually and on behalf of the child or ward, to
                      the terms of the injury waiver and release of liability
                      set forth above. The undersigned parent and/or guardian
                      further agrees to save, hold harmless, and indemnify each
                      and all the parties referred to above from all liability,
                      loss, cost, attorney fees, claim, or damage whatsoever
                      which may be imposed upon said parties because of any
                      defect in or lack of such capacity to so indemnify and
                      release said parties on behalf of the minor and the
                      parents and/or guardian.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Signatures Section */}
            <div className="border-b pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Signatures
              </h2>

              {/* Participant Information and Signature */}
              <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Participant Information and Signature
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Print Name of Participant
                    </label>
                    <input
                      type="text"
                      value={`${formData.firstName} ${formData.lastName}`}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      value={formData.participantAge}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="agreementDate"
                      value={formData.agreementDate}
                      onChange={handleChange}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature of Participant{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-gray-300 rounded-md p-2 bg-white touch-none">
                    <canvas
                      ref={memberCanvasRef}
                      className="w-full h-32 cursor-crosshair touch-none"
                      onMouseDown={(e) => startDrawing(e, false)}
                      onMouseMove={(e) => draw(e, false)}
                      onMouseUp={() => stopDrawing(false)}
                      onMouseLeave={() => stopDrawing(false)}
                      onTouchStart={(e) => startDrawing(e, false)}
                      onTouchMove={(e) => draw(e, false)}
                      onTouchEnd={() => stopDrawing(false)}
                      onTouchCancel={() => stopDrawing(false)}
                    />
                  </div>
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => clearSignature(false)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear Signature
                    </button>
                    {formData.memberSignature && (
                      <span className="text-sm text-green-600">
                        ✓ Signature captured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sign above using your mouse or finger
                  </p>
                </div>
              </div>

              {/* Guardian Signature Section for Minors */}
              {formData.isMinor && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Parent/Guardian Information and Signature
                  </h3>
                  <p className="text-amber-800 text-sm mb-4">
                    <strong>
                      Required for participants under 18 years of age
                    </strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Print Name of Parent/Guardian{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required={formData.isMinor}
                        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.agreementDate}
                        readOnly
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Signature{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-gray-300 rounded-md p-2 bg-white touch-none">
                      <canvas
                        ref={guardianCanvasRef}
                        className="w-full h-32 cursor-crosshair touch-none"
                        onMouseDown={(e) => startDrawing(e, true)}
                        onMouseMove={(e) => draw(e, true)}
                        onMouseUp={() => stopDrawing(true)}
                        onMouseLeave={() => stopDrawing(true)}
                        onTouchStart={(e) => startDrawing(e, true)}
                        onTouchMove={(e) => draw(e, true)}
                        onTouchEnd={() => stopDrawing(true)}
                        onTouchCancel={() => stopDrawing(true)}
                      />
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button
                        type="button"
                        onClick={() => clearSignature(true)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Clear Signature
                      </button>
                      {formData.guardianSignature && (
                        <span className="text-sm text-green-600">
                          ✓ Signature captured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Parent/guardian must sign above
                    </p>
                  </div>
                </div>
              )}

              {/* Agreement Acknowledgment */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>By signing above, I acknowledge that:</strong>
                </p>
                <ul className="text-blue-700 text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>I have read and understand all terms and conditions</li>
                  <li>
                    I agree to the payment authorization and membership terms
                  </li>
                  <li>
                    I acknowledge all liability waivers and assumption of risk
                  </li>
                  <li>
                    I understand my consumer rights regarding contract
                    cancellation
                  </li>
                  {formData.isMinor && (
                    <li>
                      As parent/guardian, I consent to my child&#39;s
                      participation and agree to all terms on their behalf
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Form Validation Notice and Submit Button */}
            <div className="text-center">
              {!isFormValid && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium mb-2">
                    ⚠️ Please complete all required fields before submitting
                  </p>
                  <p className="text-yellow-700 text-sm">
                    All fields marked with a red asterisk (*) are required,
                    including signatures and ID upload.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`px-8 py-3 rounded-md font-bold text-lg transition-colors ${
                  isSubmitting || !isFormValid
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSubmitting
                  ? "Submitting Application..."
                  : "Submit Membership Application"}
              </button>

              <p className="text-sm text-gray-600 mt-4">
                By submitting this form, you agree to all terms and conditions
                outlined above.
                <br />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedMembershipForm;
