import { FiTarget, FiUsers, FiAward, FiHeart } from "react-icons/fi";
import ProgramCard from "./ProgramCard";
import { JSX } from "react";

export type ProgramType = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  details: string[];
  suitable: string;
  image: string;
};

const programs: ProgramType[] = [
  {
    id: "beginners",
    title: "Boxing for Beginners",
    icon: <FiUsers size={42} className="text-boxing-red" />,
    description:
      "Our beginner program provides a solid foundation in boxing fundamentals in a supportive, non-intimidating environment.",
    details: [
      "Learn proper stance, footwork, and basic punches",
      "Develop coordination and defensive techniques",
      "Build cardiovascular endurance through boxing-specific exercises",
      "Experience the mental benefits of boxing training",
      "Train in a supportive community of fellow beginners",
    ],
    suitable:
      "Perfect for those with no prior boxing experience who want to learn the sport in a welcoming environment.",
    image: "/images/beginners-boxing.jpg",
  },
  {
    id: "kids",
    title: "Kids' Boxing Program",
    icon: <FiHeart size={42} className="text-boxing-red" />,
    description:
      "Our children's program focuses on discipline, confidence, and fun while teaching age-appropriate boxing skills.",
    details: [
      "Age-appropriate boxing fundamentals and techniques",
      "Focus on discipline, respect, and confidence-building",
      "Develop coordination, balance, and fitness",
      "Learn teamwork and sportsmanship",
      "Build healthy habits and self-discipline",
    ],
    suitable:
      "Designed for children ages 6-15, our program creates a positive environment for kids to grow physically and mentally.",
    image: "/images/kids-boxing.jpg",
  },
  {
    id: "competitive",
    title: "Competitive Boxing",
    icon: <FiAward size={42} className="text-boxing-red" />,
    description:
      "For serious boxers looking to compete, our program offers advanced training, strategy, and competition preparation.",
    details: [
      "Advanced techniques and combinations",
      "Strategic sparring and fight preparation",
      "Performance conditioning and strength training",
      "Competition mindset and mental preparation",
      "Personalized coaching from experienced professionals",
    ],
    suitable:
      "Ideal for experienced boxers who want to take their skills to the competitive level under professional guidance.",
    image: "/images/competitive-boxing.jpg",
  },
  {
    id: "fitness",
    title: "Boxing Fitness",
    icon: <FiTarget size={42} className="text-boxing-red" />,
    description:
      "Get in the best shape of your life with our high-intensity boxing fitness classes that build strength, endurance, and confidence.",
    details: [
      "High-intensity cardio workouts using boxing techniques",
      "Core strengthening and full-body conditioning",
      "Boxing-inspired circuit training",
      "No contact/sparring - focus is on fitness",
      "Burn calories while learning practical skills",
    ],
    suitable:
      "Perfect for those focused primarily on fitness goals who want the benefits of boxing training without competitive fighting.",
    image: "/images/fitness-boxing.jpg",
  },
];

const ProgramsList = () => {
  return (
    <section className="py-20 bg-white" id="programs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            OUR <span className="text-boxing-red">PROGRAMS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Designed by professional coaches with 20+ years of experience
          </p>
        </div>

        <div className="space-y-16">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsList;
