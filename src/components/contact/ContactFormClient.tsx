"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";

const ContactFormClient = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to send message: ${response.status} - ${errorText}`,
        );
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message:
            "Thank you for your message! We'll get back to you within 24 hours.",
        });

        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus({});
        }, 7000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        success: false,
        message:
          "There was an error sending your message. Please try again or call us at (385) 626-3514.",
      });

      setTimeout(() => {
        setSubmitStatus({});
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Your Name <span className="text-boxing-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formState.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email Address <span className="text-boxing-red">*</span>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block mb-2 font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 font-semibold">
            Subject <span className="text-boxing-red">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formState.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="Membership Information">
              Membership Information
            </option>
            <option value="Class Schedule">Class Schedule</option>
            <option value="Personal Training">Personal Training</option>
            <option value="Free Trial">Free Trial</option>
            <option value="Coaching Opportunities">
              Coaching Opportunities
            </option>
            <option value="General Question">General Question</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 font-semibold">
          Your Message <span className="text-boxing-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formState.message}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 border border-steel-gray border-opacity-30 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      {submitStatus.message && (
        <div
          className={`p-4 rounded-card ${
            submitStatus.success
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-button font-bold transition-all flex items-center justify-center ${
          isSubmitting
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-boxing-red hover:bg-opacity-90 text-white"
        }`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
            Sending...
          </span>
        ) : (
          <span className="inline-flex items-center">
            Send Message <FiSend className="ml-2" />
          </span>
        )}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>We typically respond within 24 hours</p>
        <p className="mt-1">
          For urgent matters, call us at{" "}
          <a
            href="tel:+13856263514"
            className="text-boxing-red hover:underline"
          >
            (385) 626-3514
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactFormClient;
