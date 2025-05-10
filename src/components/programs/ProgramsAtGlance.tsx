import React from "react";
import Link from "next/link";
import {
  FiUsers,
  FiHeart,
  FiTarget,
  FiAward,
  FiZap,
  FiClock,
} from "react-icons/fi";

const ProgramsAtGlance = () => {
  const programCards = [
    {
      id: "beginners",
      title: "Beginner Boxing",
      icon: <FiUsers size={36} className="text-boxing-red" />,
      description:
        "Learn boxing fundamentals in a supportive environment. Perfect for those with no prior experience.",
      schedule: "Tue/Thu 5-7PM, Fri 5-6PM",
    },
    {
      id: "kids",
      title: "Kids Boxing",
      icon: <FiHeart size={36} className="text-boxing-red" />,
      description:
        "Age-appropriate training focused on discipline, confidence, and having fun for children ages 6-15.",
      schedule: "Mon/Wed 5-6PM",
    },
    {
      id: "adult",
      title: "Adult Boxing",
      icon: <FiTarget size={36} className="text-boxing-red" />,
      description:
        "Comprehensive boxing training for adults of all skill levels in a supportive group environment.",
      schedule: "Mon/Wed 6-7PM, AM by appt",
    },
    {
      id: "advanced",
      title: "Advanced Boxing",
      icon: <FiAward size={36} className="text-boxing-red" />,
      description:
        "Refined techniques and challenging training for experienced boxers looking to elevate their skills.",
      schedule: "Mon/Wed/Fri 6-7PM",
    },
    {
      id: "elite",
      title: "Elite Boxing",
      icon: <FiZap size={36} className="text-boxing-red" />,
      description:
        "Competition-focused program for serious boxers preparing for amateur or professional bouts.",
      schedule: "Mon/Wed/Fri 6-7:30PM",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            PROGRAMS AT A <span className="text-boxing-red">GLANCE</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Quick overview of our boxing programs designed for all ages and
            skill levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programCards.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-card shadow-card p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full border-t-4 border-boxing-red hover:transform hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center">
                  {React.cloneElement(program.icon, {
                    className: "text-boxing-red",
                  })}
                </div>
              </div>
              <h3 className="font-primary font-semibold text-xl mb-3">
                {program.title}
              </h3>
              <p className="text-caption-text mb-4 flex-grow">
                {program.description}
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-12 h-12 bg-boxing-red opacity-5 rounded-full transform translate-x-4 translate-y-4"></div>
                <FiClock className="text-boxing-red mr-2 z-10" size={16} />
                <span className="text-sm z-10">{program.schedule}</span>
              </div>
              <Link
                href={`#${program.id}`}
                className="text-boxing-red font-semibold hover:text-black transition-colors inline-flex items-center group"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/schedule"
            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsAtGlance;
