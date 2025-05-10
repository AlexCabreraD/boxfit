import { FiTarget, FiUsers, FiAward, FiHeart, FiZap } from "react-icons/fi";
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
  schedule: string;
};

const programs: ProgramType[] = [
  {
    id: "beginners",
    title: "Beginner Boxing",
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
    schedule:
      "Tuesday & Thursday 5:00-6:00 PM and 6:00-7:00 PM, Friday 5:00-6:00 PM",
  },
  {
    id: "kids",
    title: "Kids Boxing",
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
    schedule: "Monday & Wednesday 5:00-6:00 PM",
  },
  {
    id: "adult",
    title: "Adult Boxing",
    icon: <FiTarget size={42} className="text-boxing-red" />,
    description:
      "A comprehensive boxing program for adults of all skill levels focusing on technique, conditioning, and practical boxing skills.",
    details: [
      "Comprehensive boxing technique development",
      "Personalized instruction in a group setting",
      "Challenging workouts that improve overall fitness",
      "Opportunities for partner drills and controlled practice",
      "Supportive environment for continuous improvement",
    ],
    suitable:
      "Great for adults of varying fitness levels who want to learn boxing in a structured, supportive group environment.",
    image: "/images/adult-boxing.jpg",
    schedule:
      "Monday & Wednesday 6:00-7:00 PM, Morning sessions Monday & Wednesday 6:30-7:30 AM (by appointment)",
  },
  {
    id: "advanced",
    title: "Advanced Boxing",
    icon: <FiAward size={42} className="text-boxing-red" />,
    description:
      "For experienced boxers looking to refine their skills and technique through more challenging training.",
    details: [
      "Advanced technical development and combination work",
      "Tactical boxing strategies and counter techniques",
      "Focused pad work and technical sparring options",
      "Performance conditioning specifically for boxing",
      "Preparation for more intensive training",
    ],
    suitable:
      "Ideal for boxers with previous experience who want to elevate their skills without necessarily focusing on competition.",
    image: "/images/advanced-boxing.jpg",
    schedule: "Monday, Wednesday & Friday 6:00-7:00 PM",
  },
  {
    id: "elite",
    title: "Elite Boxing",
    icon: <FiZap size={42} className="text-boxing-red" />,
    description:
      "Our competition-focused program for serious boxers preparing for amateur or professional bouts.",
    details: [
      "Competition-specific strategy and technique",
      "Advanced sparring and fight simulation",
      "Personalized competition preparation",
      "Mental preparation and fight psychology",
      "Comprehensive training plans for peak performance",
    ],
    suitable:
      "Designed for dedicated boxers with significant experience who are looking to compete or already competing at amateur or professional levels.",
    image: "/images/elite-boxing.jpg",
    schedule: "Monday, Wednesday & Friday 6:00-7:30 PM",
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

        <div className="space-y-20">
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
