import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MembershipSelection: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const nextButtonRef = useRef<HTMLDivElement>(null);

  const pricingPlans = [
    {
      id: "2-day",
      name: "2-Day Access",
      price: "$75",
      period: "/month",
      features: [
        "2 days per week gym access",
        "Access to beginner and appropriate skill level classes",
        "Basic equipment provided",
        "Monthly progress assessment",
        "Supportive community environment",
        "Free trial class included",
      ],
      recommended: false,
      color: "bg-red-600",
      description: "Perfect for beginners or those with busy schedules",
    },
    {
      id: "4-day",
      name: "4-Day Access",
      price: "$100",
      period: "/month",
      features: [
        "4 days per week gym access",
        "Access to all appropriate skill level classes",
        "Basic equipment provided",
        "Bi-weekly progress assessment",
        "Priority class scheduling",
        "Enhanced training flexibility",
        "Free trial class included",
      ],
      recommended: true,
      color: "bg-yellow-500",
      description: "Most popular choice for serious training",
    },
  ];

  const handlePlanSelection = (planId: string) => {
    updateFormData({ membershipPlan: planId });
  };

  useEffect(() => {
    if (formData.membershipPlan && nextButtonRef.current) {
      const timer = setTimeout(() => {
        nextButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [formData.membershipPlan]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Membership Plan
        </h2>
        <p className="text-lg text-gray-600">
          Select the access level that fits your schedule and goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`${
              plan.recommended
                ? "transform md:scale-105 z-10 ring-4 ring-yellow-400 ring-opacity-30"
                : ""
            } ${
              formData.membershipPlan === plan.id
                ? "ring-4 ring-red-500 ring-opacity-50"
                : ""
            } bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer relative`}
            onClick={() => handlePlanSelection(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute top-0 inset-x-0 bg-yellow-500 text-gray-900 text-center text-sm py-2 font-bold">
                MOST POPULAR CHOICE
              </div>
            )}

            {formData.membershipPlan === plan.id && (
              <div className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2">
                <FiCheck size={16} />
              </div>
            )}

            <div
              className={`${plan.color} h-2 w-full`}
              aria-hidden="true"
            ></div>

            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <FiCheck
                      className={`${
                        plan.recommended ? "text-yellow-500" : "text-red-600"
                      } mr-3 mt-1 flex-shrink-0`}
                      size={18}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`w-full text-center py-3 rounded-md font-bold text-lg transition-colors ${
                  formData.membershipPlan === plan.id
                    ? "bg-red-600 text-white"
                    : plan.recommended
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                      : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {formData.membershipPlan === plan.id
                  ? "Selected"
                  : `Select ${plan.name}`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {formData.membershipPlan && (
        <div
          ref={nextButtonRef}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg scroll-mt-6"
        >
          <div className="flex items-center mb-2">
            <FiCheck className="text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              {pricingPlans.find((p) => p.id === formData.membershipPlan)?.name}{" "}
              selected
            </span>
          </div>
          <p className="text-green-700 text-sm">
            You can proceed to the next step to complete your membership
            application. Remember, you won&#39;t be charged until after your
            free trial!
          </p>

          <div className="mt-4 text-center">
            <p className="text-sm text-green-600 font-medium">
              ⬇️ Continue below to complete your registration
            </p>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Questions about our membership options?
        </p>
        <Link
          href="/contact"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md font-bold hover:bg-gray-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default MembershipSelection;
