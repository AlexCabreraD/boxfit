import { FiCheck } from "react-icons/fi";
import Link from "next/link";

const SchedulePricing = () => {
  const pricingPlans = [
    {
      name: "2-Day Access",
      price: "$75",
      period: "/month",
      features: [
        "2 days per week gym access",
        "Access to beginner and appropriate skill level classes",
        "Basic equipment provided",
        "Monthly progress assessment",
        "Supportive community environment",
      ],
      recommended: false,
      color: "bg-boxing-red",
    },
    {
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
      ],
      recommended: true,
      color: "bg-accent-gold",
    },
    {
      name: "Advanced Access",
      price: "Contact Us",
      period: "",
      features: [
        "Additional access based on skill level",
        "Competition preparation access",
        "Advanced training opportunities",
        "Coach discretion for increased access",
        "Personalized training plans",
        "Premium coaching attention",
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
            Choose the access level that fits your schedule and commitment
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
                  {plan.period && (
                    <span className="text-caption-text ml-1">
                      {plan.period}
                    </span>
                  )}
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

        <div className="mt-12 bg-white p-8 rounded-card shadow-card">
          <h3 className="font-accent text-2xl mb-4 text-boxing-black text-center">
            <span className="text-boxing-red">ADDITIONAL ACCESS</span>{" "}
            OPPORTUNITIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">Skill-Based Access</h4>
              <p className="text-caption-text">
                As you progress and demonstrate improvement, Coach Pablo may
                grant additional access days to support your development and
                training goals at his discretion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Competition Preparation
              </h4>
              <p className="text-caption-text">
                Members preparing for competitions may receive expanded access
                to support intensive training schedules and competition
                readiness, or can request additional access.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-caption-text">
              <strong>Note:</strong> Additional access beyond your membership
              level is granted based on skill progression, competition
              preparation needs, or by request to Coach Pablo. We believe in
              supporting our members&#39; growth and will work with you to
              ensure you have the access you need to achieve your goals.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          {/*<p className="text-caption-text mb-4">*/}
          {/*  We also offer special rates for students, military, and family*/}
          {/*  memberships*/}
          {/*</p>*/}
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
