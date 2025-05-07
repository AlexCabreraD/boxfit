"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FAQItem } from "./ProgramFAQ";

type ProgramFAQClientProps = {
  faqs: FAQItem[];
};

const ProgramFAQClient = ({ faqs }: ProgramFAQClientProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mb-4 bg-white rounded-card shadow-card overflow-hidden"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            onClick={() => toggleFAQ(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-semibold text-lg">{faq.question}</span>
            {activeIndex === index ? (
              <FiMinus className="text-boxing-red text-xl flex-shrink-0" />
            ) : (
              <FiPlus className="text-boxing-red text-xl flex-shrink-0" />
            )}
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`px-6 overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? "max-h-96 pb-6 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-caption-text">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramFAQClient;
