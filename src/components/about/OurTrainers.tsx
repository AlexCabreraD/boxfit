import Link from "next/link";
import { FiAward, FiUsers, FiCheck } from "react-icons/fi";

const trainers = [
  {
    name: "Coach Martinez",
    role: "Head Boxing Coach & Founder",
    experience: "20+ Years Professional Experience",
    clientTypes: "Trained Both Amateur & Professional Boxers",
    specializations: [
      "Technical Boxing Skills",
      "Competition Strategy",
      "Elite Performance Training",
      "Youth Development",
    ],
    bio: "With over two decades of boxing expertise, Coach Martinez has trained champions at all levels of competition. His deep knowledge, personalized approach, and dedication to the sport have helped countless athletes reach their full potential.",
  },
  {
    name: "Coach Rodriguez",
    role: "Youth Program Coach",
    experience: "15+ Years Working with Children",
    clientTypes: "Specializes in Ages 8-17",
    specializations: [
      "Youth Boxing Fundamentals",
      "Character Development",
      "Discipline & Focus Training",
      "Confidence Building",
    ],
    bio: "Coach Rodriguez brings a unique approach to youth boxing, focusing not just on technique but on building character. His engaging teaching style makes learning boxing fun while instilling values of respect, discipline, and perseverance.",
  },
  {
    name: "Coach Ramirez",
    role: "Fitness & Conditioning Coach",
    experience: "12+ Years in Fitness",
    clientTypes: "All Levels from Beginners to Advanced",
    specializations: [
      "Boxing Fitness Programs",
      "Weight Management",
      "Strength & Conditioning",
      "Cardio Performance",
    ],
    bio: "Coach Ramirez specializes in helping members achieve their fitness goals through boxing-inspired workouts. Her energetic approach and expertise in conditioning make every session challenging yet accessible for all fitness levels.",
  },
];

const OurTrainers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            MEET OUR <span className="text-boxing-red">TRAINERS</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Learn from experienced professionals dedicated to your boxing
            success
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-card shadow-card overflow-hidden border border-gray-100"
            >
              <div className="h-64 bg-boxing-black relative">
                <div className="absolute inset-0 bg-steel-gray opacity-40"></div>
                <div className="absolute bottom-0 left-0 bg-boxing-red px-4 py-2 text-white font-semibold">
                  {trainer.role}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-primary font-bold text-2xl mb-2">
                  {trainer.name}
                </h3>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FiAward className="text-boxing-red mr-3" size={20} />
                    <p className="text-sm font-semibold">
                      {trainer.experience}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="text-boxing-red mr-3" size={20} />
                    <p className="text-sm font-semibold">
                      {trainer.clientTypes}
                    </p>
                  </div>
                </div>

                <p className="text-caption-text mb-4">{trainer.bio}</p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm uppercase text-steel-gray">
                    Specializations:
                  </h4>
                  <ul className="space-y-1">
                    {trainer.specializations.map((item, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <FiCheck className="text-boxing-red mr-2 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/trainers"
            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            Meet Our Full Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurTrainers;
