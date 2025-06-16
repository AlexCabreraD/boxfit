import ProgramFAQClient from "./ProgramFAQClient";

export type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I know which program is right for me?",
    answer:
      "If you're new to boxing, we recommend starting with our Beginner classes. These are designed to teach fundamentals in a supportive environment. If you have prior experience, our Adult or Advanced classes might be appropriate. For children ages 6-15, our Kids program is the perfect fit. You're also welcome to contact us for personalized recommendations.",
  },
  {
    question: "How does your membership pricing work?",
    answer:
      "Our membership is based on how many days per week you want to access the gym. We offer 2-day access for $75/month and 4-day access for $100/month. Additional access may be granted based on your skill progression, competition preparation needs, or by request to Coach Pablo. This flexible approach ensures you only pay for the access you need.",
  },
  {
    question: "Can I get more than 4 days of access per week?",
    answer:
      "Yes! Additional access beyond your membership level can be granted by Coach Pablo based on your skill development, improvement, competition preparation needs, or by request. We believe in supporting our members' growth and will work with you to ensure you have the access needed to achieve your goals.",
  },
  {
    question: "Do I need any equipment to start boxing?",
    answer:
      "For your first few sessions, you don't need to bring any equipment. We provide all necessary gear for beginners. As you continue, we recommend investing in your own hand wraps and gloves, which we can help you select. For advanced and elite training, additional equipment may be recommended by your coach.",
  },
  {
    question:
      "What's the difference between Adult, Advanced, and Elite Boxing?",
    answer:
      "Our Adult Boxing program is designed for all skill levels and focuses on technique, conditioning, and practical skills in a group setting. Advanced Boxing is for experienced boxers wanting to refine their skills and technique through more challenging training. Elite Boxing is specifically focused on competition preparation for serious boxers looking to compete at amateur or professional levels.",
  },
  {
    question: "How old does my child need to be for the Kids Boxing program?",
    answer:
      "Our Kids Boxing program is designed for children ages 6-15. We group children by age and size to ensure appropriate training partners. For children younger than 6, we recommend a private assessment with one of our youth coaches to determine readiness.",
  },
  {
    question: "Will I have to spar or fight someone?",
    answer:
      "No, sparring is completely optional at BoxFit Utah. Many of our members train for fitness and skill development without ever sparring. If you're interested in sparring, we have a structured progression that ensures you're properly prepared before stepping into the ring. Sparring is typically only introduced in Advanced and Elite programs for those who are interested.",
  },
  {
    question: "Can I switch between different programs as I progress?",
    answer:
      "Absolutely! We encourage members to advance through our programs as their skills develop. Many members start in our Beginner program and progress to Adult, Advanced, and sometimes Elite programs. Our coaches will help guide your progression and let you know when you're ready to transition to more advanced training. Your access level can also be adjusted as you progress.",
  },
  {
    question: "How often should I train to see results?",
    answer:
      "For noticeable improvements in technique and fitness, we recommend training 2-3 times per week, which aligns perfectly with our membership options. Consistency is more important than frequency. Our 2-day access membership is perfect for beginners, while our 4-day access works well for those wanting more intensive training. Serious competitors may request additional access for more frequent training.",
  },
  {
    question: "Do I need to be in good shape to start boxing?",
    answer:
      "Not at all. Our programs are designed to meet you at your current fitness level. Many members start boxing specifically to improve their fitness. Our Beginner program gradually builds your conditioning, and all our coaches can modify exercises to accommodate different fitness levels. You'll be surprised how quickly your stamina and strength improve through consistent training.",
  },
];

const ProgramFAQ = () => {
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

        <ProgramFAQClient faqs={faqs} />

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
