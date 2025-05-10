import React from "react";
import { FiCheck, FiClock } from "react-icons/fi";
import { ProgramType } from "./types";
import Link from "next/link";

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
          <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center mr-4">
            {React.cloneElement(program.icon, {
              size: 24,
              className: "text-white",
            })}
          </div>
          <h3 className="font-primary font-bold text-2xl">{program.title}</h3>
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

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-boxing-red">
          <h4 className="font-semibold mb-2 flex items-center text-boxing-black">
            <FiClock className="mr-2 text-boxing-red" /> Schedule:
          </h4>
          <p>{program.schedule}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/free-trial"
            className="inline-block bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors shadow-button"
          >
            Try a Free Class
          </Link>
          <Link
            href="/schedule"
            className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            View Full Schedule
          </Link>
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-card">
          <div className="absolute inset-0 border-2 border-boxing-red z-10 rounded-lg transform translate-x-4 translate-y-4"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
          <div className="absolute inset-0 bg-boxing-black flex items-center justify-center">
            <div className="text-center p-8 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-boxing-red opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent-gold opacity-20 rounded-full transform -translate-x-8 translate-y-8"></div>

              <div className="bg-boxing-red p-5 rounded-full inline-block mb-6 shadow-lg transform transition-transform hover:scale-105 duration-300">
                {React.cloneElement(program.icon, {
                  size: 42,
                  className: "text-white",
                })}
              </div>
              <h3 className="text-white text-2xl font-accent mb-4">
                {program.title.toUpperCase()}
              </h3>

              <div className="mb-4 space-y-2">
                <p className="text-steel-gray text-lg">
                  Professional training for all levels
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-steel-gray bg-opacity-20 text-white text-sm">
                  {program.schedule.split(",")[0]}
                </div>
              </div>

              <div className="mt-6 w-16 h-1 bg-boxing-red mx-auto"></div>

              {/* Boxing glove decorative icon */}
              <div className="absolute bottom-2 right-2 opacity-10">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
