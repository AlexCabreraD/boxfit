import Link from "next/link";
import { FiHome, FiCalendar } from "react-icons/fi";
import { FormData } from "@/components/membership/types/membershipTypes";

interface SuccessMessageProps {
  formData: FormData;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ formData }) => {
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
          Registration Complete!
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Thank you for joining BoxFit Utah! We&#39;re excited to have you as
          part of our boxing community.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-lg mb-3">Next Steps:</h3>
          <ol className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              <span>
                Our team will review your application and contact you within 24
                hours.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>
                We&#39;ll schedule your free trial class at a time that works
                for you.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>
                Complete payment setup for your{" "}
                {formData.membershipPlan === "2-day"
                  ? "2-Day Access ($75/month)"
                  : "4-Day Access ($100/month)"}{" "}
                membership.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Begin training!</span>
            </li>
          </ol>
        </div>

        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              <FiHome className="mr-2" />
              Back to Home
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors font-medium"
            >
              <FiCalendar className="mr-2" />
              View Class Schedule
            </Link>
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
            <p className="text-gray-600">
              <a
                href="mailto:Boxfitutah@gmail.com"
                className="text-red-600 hover:text-red-700"
              >
                Boxfitutah@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
