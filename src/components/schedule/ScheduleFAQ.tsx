import ScheduleFAQClient from "./ScheduleFAQClient";
import { FAQItem } from "./types";

const faqs: FAQItem[] = [
  {
    question: "How do I know which class is right for me?",
    answer:
      "If you're new to boxing, we recommend starting with our Beginner classes. These are designed to teach fundamentals in a supportive environment. If you have prior experience, our Adult or Advanced classes might be appropriate. For children ages 6-15, our Kids program is the perfect fit. You're also welcome to contact us for personalized recommendations.",
  },
  {
    question: "How does your access-based membership work?",
    answer:
      "Our membership is based on how many days per week you want to access the gym. We offer 2-day access for $75/month and 4-day access for $100/month. This means you can attend any appropriate classes within your access days. Additional access may be granted based on skill progression, competition preparation, or by request to Coach Pablo.",
  },
  {
    question: "Can I attend any class with my membership?",
    answer:
      "You can attend any class that's appropriate for your skill level within your access days. For example, with 2-day access, you can choose any 2 days per week to attend classes. With 4-day access, you have more flexibility. As you progress, you may gain access to more advanced classes regardless of your membership level.",
  },
  {
    question: "Can I get more access days if I need them?",
    answer:
      "Yes! Additional access beyond your membership can be granted by Coach Pablo based on your improvement, competition preparation needs, or by request. We want to support your boxing journey and will work with you to ensure you have the access needed to reach your goals.",
  },
  {
    question: "Do I need to register for classes in advance?",
    answer:
      "While drop-ins are welcome for most classes, we recommend registering in advance, especially for popular class times that may reach capacity. Morning classes (6:30 AM) require advance booking. You can register through our website, by phone, or in person at the gym.",
  },
  {
    question: "What if I can't make my usual class time?",
    answer:
      "Life happens! With our access-based membership, you have flexibility to attend different classes within your access days. If you typically attend Monday and Wednesday but need to switch to Tuesday and Thursday one week, that's perfectly fine as long as you stay within your access limit. This flexibility is one of the benefits of our day-based membership structure.",
  },
  {
    question: "Are there any age restrictions for classes?",
    answer:
      "Our Kids program is designed for children ages 6-15. Adult classes are for individuals 16 and older. Advanced and Elite classes typically require prior boxing experience and coach approval, regardless of age. Your access level doesn't restrict which age-appropriate classes you can attend.",
  },
  {
    question: "How often should I attend classes to see progress?",
    answer:
      "For noticeable improvement, we recommend attending at least 2-3 classes per week, which aligns perfectly with our membership options. Our 2-day access ($75/month) is great for beginners, while 4-day access ($100/month) provides more intensive training opportunities. Consistency within your access level is key to seeing results.",
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
            Common questions about our class schedule and access-based
            memberships
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
