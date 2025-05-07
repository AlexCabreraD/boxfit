import { FiAward, FiUsers } from "react-icons/fi";

interface TrainerCardProps {
  name: string;
  role: string;
  imageSrc: string;
  experience: string;
  specialties: string[];
  bio: string;
}

const TrainerCard = ({
  name,
  role,
  // imageSrc,
  experience,
  specialties,
  bio,
}: TrainerCardProps) => {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-lg transition-all">
      <div className="h-80 relative">
        {/* Replace with actual image when available */}
        <div className="w-full h-full bg-steel-gray opacity-40 flex items-center justify-center">
          <span className="text-white text-lg">{name}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl mb-1">{name}</h3>
        <p className="text-boxing-red font-medium mb-4">{role}</p>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FiAward className="text-boxing-red mr-2" size={18} />
            <p className="text-caption-text">{experience}</p>
          </div>
          <div className="flex items-start">
            <FiUsers className="text-boxing-red mr-2 mt-1" size={18} />
            <p className="text-caption-text">
              Specializes in: {specialties.join(", ")}
            </p>
          </div>
        </div>

        <p className="text-body-text mb-4">{bio}</p>

        <div className="w-12 h-1 bg-boxing-red"></div>
      </div>
    </div>
  );
};

export default TrainerCard;
