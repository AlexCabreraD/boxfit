import { FiCheck } from "react-icons/fi";
import Link from "next/link";

const SchedulePricing = () => {
  const pricingPlans = [
    {
      name: "Beginner",
      price: "$99",
      period: "/month",
      features: [
        "2 classes per week",
        "Basic equipment provided",
        "Access to beginner classes",
        "Monthly progress assessment",
        "Gym access during class times",
      ],
      recommended: false,
      color: "bg-boxing-red",
    },
    {
      name: "Standard",
      price: "$149",
      period: "/month",
      features: [
        "Unlimited classes",
        "Basic equipment provided",
        "Access to all regular classes",
        "Bi-weekly progress assessment",
        "Full gym access during open hours",
        "One personal training session monthly",
      ],
      recommended: true,
      color: "bg-accent-gold",
    },
    {
      name: "Elite",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited classes",
        "Premium equipment provided",
        "Access to all classes including elite",
        "Weekly progress assessment",
        "Full gym access 24/7",
        "Two personal training sessions monthly",
        "Competition preparation support",
      ],
      recommended: false,
      color: "bg-boxing-black",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            MEMBERSHIP <span className="text-boxing-red">OPTIONS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Choose the plan that fits your goals and schedule
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.recommended
                  ? "transform md:-translate-y-4 md:scale-105 z-10"
                  : ""
              } bg-white rounded-card shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg relative`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 bg-accent-gold text-white text-center text-sm py-1 font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div
                className={`${plan.color} h-2 w-full`}
                aria-hidden="true"
              ></div>
              <div className="p-6">
                <h3 className="font-accent text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-caption-text ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck
                        className={`${
                          plan.recommended
                            ? "text-accent-gold"
                            : "text-boxing-red"
                        } mr-2 mt-1 flex-shrink-0`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full block text-center py-3 rounded-button font-bold ${
                    plan.recommended
                      ? "bg-accent-gold text-boxing-black hover:bg-opacity-90"
                      : "bg-boxing-black text-white hover:bg-steel-gray"
                  } transition-colors`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-caption-text mb-4">
            We also offer special rates for students, military, and family
            memberships
          </p>
          <Link
            href="/contact"
            className="inline-block bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
          >
            Contact Us for Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SchedulePricing;
