import { FiCheck } from "react-icons/fi";
import { ProgramType } from "./ProgramsList";

type ProgramCardProps = {
  program: ProgramType;
  reverse?: boolean;
};

const ProgramCard = ({ program, reverse = false }: ProgramCardProps) => {
  return (
    <div
      id={program.id}
      className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="mb-4 flex items-center">
          {program.icon}
          <h3 className="font-primary font-bold text-2xl ml-4">
            {program.title}
          </h3>
        </div>

        <p className="text-lg mb-6">{program.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-boxing-black">
            What You&#39;ll Learn:
          </h4>
          <ul className="space-y-2">
            {program.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <FiCheck className="text-boxing-red mr-2 mt-1 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-boxing-black">
            Who This Is For:
          </h4>
          <p>{program.suitable}</p>
        </div>

        <a
          href="/free-trial"
          className="inline-block bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors shadow-button"
        >
          Try a Free Class
        </a>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
          <div className="absolute inset-0 border-2 border-boxing-red z-10 rounded-lg transform translate-x-4 translate-y-4"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
          <div className="absolute inset-0 bg-steel-gray">
            {/* Replace with actual image when available */}
            <div className="w-full h-full placeholder-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
