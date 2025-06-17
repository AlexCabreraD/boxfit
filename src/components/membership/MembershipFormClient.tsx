"use client";

import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiCheck } from "react-icons/fi";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
}

interface MembershipFormClientProps {
  selectedPlan: Plan | undefined;
}

const MembershipFormClient = ({ selectedPlan }: MembershipFormClientProps) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    experience: "",
    goals: "",
    medicalConditions: "",
    agreeToTerms: false,
    agreeToWaiver: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: `Thank you for choosing ${selectedPlan?.name}! We'll contact you within 24 hours to schedule your free trial class and complete your membership setup.`,
      });

      // Reset form after successful submission
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        emergencyContact: "",
        emergencyPhone: "",
        experience: "",
        goals: "",
        medicalConditions: "",
        agreeToTerms: false,
        agreeToWaiver: false,
      });

      // Clear success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus({});
      }, 10000);
    }, 1500);
  };

  const isFormValid =
    formState.firstName &&
    formState.lastName &&
    formState.email &&
    formState.phone &&
    formState.emergencyContact &&
    formState.emergencyPhone &&
    formState.agreeToTerms &&
    formState.agreeToWaiver;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus.message && (
        <div
          className={`p-4 rounded-card ${
            submitStatus.success
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-start">
            {submitStatus.success && (
              <FiCheck className="mr-2 mt-1 flex-shrink-0" />
            )}
            <p>{submitStatus.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 font-semibold flex items-center"
          >
            <FiUser className="mr-2 text-boxing-red" />
            First Name <span className="text-boxing-red ml-1">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formState.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 font-semibold">
            Last Name <span className="text-boxing-red">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formState.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-semibold flex items-center"
          >
            <FiMail className="mr-2 text-boxing-red" />
            Email Address <span className="text-boxing-red ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-semibold flex items-center"
          >
            <FiPhone className="mr-2 text-boxing-red" />
            Phone Number <span className="text-boxing-red ml-1">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formState.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="emergencyContact"
            className="block mb-2 font-semibold"
          >
            Emergency Contact Name <span className="text-boxing-red">*</span>
          </label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            required
            value={formState.emergencyContact}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="Emergency contact name"
          />
        </div>
        <div>
          <label htmlFor="emergencyPhone" className="block mb-2 font-semibold">
            Emergency Contact Phone <span className="text-boxing-red">*</span>
          </label>
          <input
            type="tel"
            id="emergencyPhone"
            name="emergencyPhone"
            required
            value={formState.emergencyPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="block mb-2 font-semibold">
          Boxing Experience
        </label>
        <select
          id="experience"
          name="experience"
          value={formState.experience}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
        >
          <option value="">Select your experience level</option>
          <option value="Complete beginner">
            Complete beginner - No experience
          </option>
          <option value="Some experience">
            Some experience - Trained before
          </option>
          <option value="Intermediate">Intermediate - Regular training</option>
          <option value="Advanced">Advanced - Extensive training</option>
          <option value="Competitive">
            Competitive - Competition experience
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="goals" className="block mb-2 font-semibold">
          What are your boxing goals?
        </label>
        <textarea
          id="goals"
          name="goals"
          value={formState.goals}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
          placeholder="Tell us about your fitness goals, what you hope to achieve..."
        ></textarea>
      </div>

      <div>
        <label htmlFor="medicalConditions" className="block mb-2 font-semibold">
          Medical Conditions or Injuries
        </label>
        <textarea
          id="medicalConditions"
          name="medicalConditions"
          value={formState.medicalConditions}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
          placeholder="Please list any medical conditions, injuries, or physical limitations we should be aware of (or write 'None')"
        ></textarea>
      </div>

      <div className="bg-gray-50 p-6 rounded-card border border-gray-200">
        <h3 className="font-semibold text-lg mb-4">Required Agreements</h3>

        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formState.agreeToTerms}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-boxing-red border-gray-300 rounded focus:ring-boxing-red"
              required
            />
            <span className="text-sm">
              I agree to the terms and conditions of BoxFit Utah membership,
              including monthly billing for {selectedPlan?.price}
              {selectedPlan?.period} and understand that I can cancel with 30
              days notice. <span className="text-boxing-red">*</span>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToWaiver"
              checked={formState.agreeToWaiver}
              onChange={handleChange}
              className="mt-1 mr-3 w-5 h-5 text-boxing-red border-gray-300 rounded focus:ring-boxing-red"
              required
            />
            <span className="text-sm">
              I acknowledge that boxing training involves physical activity and
              potential risk of injury. I agree to the liability waiver and
              assume responsibility for my participation.{" "}
              <span className="text-boxing-red">*</span>
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={`w-full py-4 rounded-button font-bold text-lg transition-all ${
          isFormValid && !isSubmitting
            ? "bg-boxing-red hover:bg-opacity-90 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
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
            Processing...
          </span>
        ) : (
          `Complete ${selectedPlan?.name} Membership`
        )}
      </button>

      <div className="text-center text-sm text-caption-text">
        <p>
          Questions? Call us at{" "}
          <a
            href="tel:+13856263514"
            className="text-boxing-red hover:text-boxing-black transition-colors font-semibold"
          >
            (385) 626-3514
          </a>
        </p>
      </div>
    </form>
  );
};

export default MembershipFormClient;
