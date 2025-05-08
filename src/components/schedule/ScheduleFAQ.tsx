import ScheduleFAQClient from "./ScheduleFAQClient";
import { FAQItem } from "./types";

const faqs: FAQItem[] = [
  {
    question: "How do I know which class is right for me?",
    answer:
      "If you're new to boxing, we recommend starting with our Beginner classes. These are designed to teach fundamentals in a supportive environment. If you have prior experience, our Adult or Advanced classes might be appropriate. For children ages 6-15, our Kids program is the perfect fit. You're also welcome to contact us for personalized recommendations.",
  },
  {
    question: "Can I switch between different class times?",
    answer:
      "Absolutely! Your membership gives you access to all classes appropriate for your skill level. If you're a beginner, you can attend any beginner class on the schedule. This flexibility helps you maintain your training even when your personal schedule changes.",
  },
  {
    question: "Do I need to register for classes in advance?",
    answer:
      "While drop-ins are welcome for most classes, we recommend registering in advance, especially for popular class times that may reach capacity. Morning classes (6:30 AM) require advance booking. You can register through our website, by phone, or in person at the gym.",
  },
  {
    question: "What if I can't make my usual class time?",
    answer:
      "Life happens! If you can't make your regular class, feel free to attend another session that fits your schedule and skill level. For members who consistently miss classes due to schedule conflicts, we offer make-up sessions and personal training options.",
  },
  {
    question: "Are there any age restrictions for classes?",
    answer:
      "Our Kids program is designed for children ages 6-15. Adult classes are for individuals 16 and older. Advanced and Elite classes typically require prior boxing experience and coach approval, regardless of age.",
  },
  {
    question: "How often should I attend classes to see progress?",
    answer:
      "For noticeable improvement, we recommend attending at least 2-3 classes per week. Consistency is key in boxing training. Even attending once a week will provide benefits, while serious competitors typically train 4-5 times weekly under coach guidance.",
  },
];

const ScheduleFAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            FREQUENTLY ASKED <span className="text-boxing-red">QUESTIONS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Common questions about our class schedule and booking
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ScheduleFAQClient faqs={faqs} />

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
      </div>
    </section>
  );
};

export default ScheduleFAQ;
