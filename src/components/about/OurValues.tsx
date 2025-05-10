import { FiAward, FiUsers, FiHeart, FiTarget, FiStar } from "react-icons/fi";

const values = [
  {
    icon: <FiAward className="text-boxing-red text-3xl" />,
    title: "Excellence",
    description:
      "We are committed to high-quality instruction and training, pushing our members to achieve their personal best every day.",
  },
  {
    icon: <FiUsers className="text-boxing-red text-3xl" />,
    title: "Inclusivity",
    description:
      "We welcome people of all ages, backgrounds, and skill levels, creating a space where everyone belongs.",
  },
  {
    icon: <FiStar className="text-boxing-red text-3xl" />,
    title: "Expertise",
    description:
      "Our professional coaching team brings decades of experience in both amateur and professional boxing.",
  },
  {
    icon: <FiHeart className="text-boxing-red text-3xl" />,
    title: "Community",
    description:
      "We foster a supportive, motivating environment where members inspire and encourage each other.",
  },
  {
    icon: <FiTarget className="text-boxing-red text-3xl" />,
    title: "Development",
    description:
      "We focus on personal growth, both physically and mentally, helping members build character and confidence.",
  },
];

const OurValues = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            OUR <span className="text-boxing-red">VALUES</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at BoxFit Utah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-card shadow-card p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                {value.icon}
              </div>
              <h3 className="font-primary font-semibold text-xl mb-3">
                {value.title}
              </h3>
              <p className="text-caption-text">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-boxing-black rounded-card text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-accent text-2xl md:text-3xl mb-4">
                OUR <span className="text-boxing-red">MISSION</span>
              </h3>
              <p className="text-lg mb-4">
                To provide high-quality boxing training and fitness programs for
                clients of all ages and skill levels in the Clearfield, Utah
                area.
              </p>
              <p className="text-lg">
                We aim to be the premier boxing training facility in Northern
                Utah, known for developing both competitive boxers and fitness
                enthusiasts in an inclusive, supportive environment.
              </p>
            </div>
            <div className="relative h-64 md:h-full">
              <div className="absolute inset-4 border-2 border-boxing-red">
                <div className="bg-image-mission w-full h-full"></div>
              </div>
              <div className="absolute inset-0 bg-steel-gray opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
