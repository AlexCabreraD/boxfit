"use client";

import { useState } from "react";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import MembershipFormClient from "./MembershipFormClient";

const MembershipOptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
      color: "bg-boxing-red",
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
      color: "bg-accent-gold",
      description: "Most popular choice for serious training",
    },
  ];

  if (selectedPlan) {
    const plan = pricingPlans.find((p) => p.id === selectedPlan);
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => setSelectedPlan(null)}
            className="flex items-center text-boxing-red hover:text-boxing-black transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to membership options
          </button>

          <div className="bg-white rounded-card shadow-card p-8">
            <div className="text-center mb-8">
              <h2 className="font-accent text-3xl mb-2 text-boxing-black">
                JOIN{" "}
                <span className="text-boxing-red">
                  {plan?.name.toUpperCase()}
                </span>
              </h2>
              <p className="text-lg text-caption-text">{plan?.description}</p>
              <div className="flex items-center justify-center mt-4">
                <span className="text-4xl font-bold text-boxing-black">
                  {plan?.price}
                </span>
                <span className="text-caption-text ml-2">{plan?.period}</span>
              </div>
            </div>

            <MembershipFormClient selectedPlan={plan} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-8 text-boxing-red hover:text-boxing-black transition-colors"
          >
            <FiArrowLeft className="inline mr-2" />
            Back to Home
          </Link>

          <h1 className="font-accent text-4xl md:text-5xl mb-4 text-boxing-black">
            CHOOSE YOUR <span className="text-boxing-red">MEMBERSHIP</span>
          </h1>
          <p className="text-xl text-caption-text max-w-3xl mx-auto">
            Flexible access-based memberships designed to fit your schedule and
            commitment level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`${
                plan.recommended
                  ? "transform md:scale-105 z-10 ring-4 ring-accent-gold ring-opacity-30"
                  : ""
              } bg-white rounded-card shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg relative`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 bg-accent-gold text-boxing-black text-center text-sm py-2 font-bold">
                  MOST POPULAR CHOICE
                </div>
              )}

              <div
                className={`${plan.color} h-2 w-full`}
                aria-hidden="true"
              ></div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="font-accent text-2xl mb-2 text-boxing-black">
                    {plan.name}
                  </h2>
                  <p className="text-caption-text mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-boxing-black">
                      {plan.price}
                    </span>
                    <span className="text-caption-text ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck
                        className={`${
                          plan.recommended
                            ? "text-accent-gold"
                            : "text-boxing-red"
                        } mr-3 mt-1 flex-shrink-0`}
                        size={18}
                      />
                      <span className="text-body-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-center py-3 rounded-button font-bold text-lg transition-colors ${
                    plan.recommended
                      ? "bg-accent-gold text-boxing-black hover:bg-opacity-90"
                      : "bg-boxing-red text-white hover:bg-opacity-90"
                  }`}
                >
                  Select {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-card shadow-card max-w-4xl mx-auto">
          <h3 className="font-accent text-2xl mb-4 text-boxing-black text-center">
            <span className="text-boxing-red">ADDITIONAL ACCESS</span>{" "}
            OPPORTUNITIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <FiCheck className="text-boxing-red mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Skill-Based Access
                </h4>
                <p className="text-caption-text">
                  As you progress and demonstrate improvement, Coach Pablo may
                  grant additional access days to support your development.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FiCheck className="text-boxing-red mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Competition Preparation
                </h4>
                <p className="text-caption-text">
                  Members preparing for competitions may receive expanded access
                  to support intensive training schedules.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-caption-text mb-4">
            Questions about our membership options?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembershipOptions;
