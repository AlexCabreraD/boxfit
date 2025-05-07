"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I need any equipment to start boxing?",
    answer:
      "For your first few sessions, you don't need to bring any equipment. We provide all necessary gear for beginners. As you continue, we recommend investing in your own hand wraps and gloves, which we can help you select. For competitive training, additional equipment may be recommended by your coach.",
  },
  {
    question: "I've never boxed before. Is the beginner program right for me?",
    answer:
      "Absolutely! Our beginner program is specifically designed for those with no prior experience. Our coaches will guide you through every step, teaching proper technique and ensuring you learn at your own pace in a supportive environment.",
  },
  {
    question: "How old does my child need to be for the kids' program?",
    answer:
      "Our kids' boxing program is designed for children ages 6-15. We group children by age and size to ensure appropriate training partners. For children younger than 6, we recommend a private assessment with one of our youth coaches to determine readiness.",
  },
  {
    question: "Will I have to spar or fight someone?",
    answer:
      "No, sparring is completely optional at BoxFit Utah. Many of our members train for fitness and skill development without ever sparring. If you're interested in sparring, we have a structured progression that ensures you're properly prepared before stepping into the ring.",
  },
  {
    question: "How often should I train to see results?",
    answer:
      "For noticeable improvements in technique and fitness, we recommend training 2-3 times per week. Consistency is more important than frequency. One quality session per week will still provide benefits, while serious competitors typically train 4-5 times weekly under coach guidance.",
  },
  {
    question:
      "What's the difference between the Fitness and Beginner programs?",
    answer:
      "Our Boxing Fitness program focuses primarily on conditioning, using boxing techniques in a high-intensity workout format without as much technical instruction. The Beginner program has a stronger emphasis on proper boxing technique, fundamentals, and skill development, with fitness as a secondary benefit.",
  },
];

const ProgramFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            FREQUENTLY ASKED <span className="text-boxing-red">QUESTIONS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Everything you need to know before getting started
          </p>
        </div>

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

        <div className="text-center mt-10">
          <p className="text-caption-text mb-4">
            Don&#39;t see your question? Contact us directly
          </p>
          <a
            href="/contact"
            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramFAQ;
