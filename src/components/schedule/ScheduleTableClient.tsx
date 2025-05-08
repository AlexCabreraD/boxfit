"use client";

import { useState } from "react";
import { FiFilter, FiClock, FiUsers } from "react-icons/fi";
import { ClassSchedule, ScheduleItem } from "./types";

interface ScheduleTableClientProps {
  classSchedule: ClassSchedule;
}

const ScheduleTableClient = ({ classSchedule }: ScheduleTableClientProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [filter, setFilter] = useState<string>("All");

  const days = Object.keys(classSchedule);

  const getLevelColor = (level: string): string => {
    switch (level) {
      case "Beginner":
        return "bg-boxing-red";
      case "All Levels":
        return "bg-accent-gold";
      case "Advanced":
        return "bg-boxing-black";
      case "Competition":
        return "bg-steel-gray";
      default:
        return "bg-boxing-red opacity-50";
    }
  };

  const filteredClasses = (): ScheduleItem[] => {
    return classSchedule[selectedDay].filter((item) => {
      if (filter === "All") return true;
      if (filter === "Kids" && item.className.includes("Kids")) return true;
      if (filter === "Beginner" && item.level === "Beginner") return true;
      if (filter === "Adult" && item.className.includes("Adult")) return true;
      if (
        filter === "Advanced" &&
        (item.level === "Advanced" || item.level === "Competition")
      )
        return true;
      if (filter === "Morning" && item.time.includes("AM")) return true;
      if (filter === "Evening" && item.time.includes("PM")) return true;
      return false;
    });
  };

  return (
    <div>
      <div className="bg-boxing-black text-white p-4 flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-accent text-xl mb-4 md:mb-0">SELECT DAY</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-button transition-colors ${
                selectedDay === day
                  ? "bg-boxing-red text-white"
                  : "bg-steel-gray bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
              aria-label={`Select ${day}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <FiFilter className="text-boxing-red mr-2" />
          <span className="font-semibold">Filter Classes:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Kids",
            "Beginner",
            "Adult",
            "Advanced",
            "Morning",
            "Evening",
          ].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === filterOption
                  ? "bg-boxing-red text-white"
                  : "bg-white border border-gray-200 hover:border-boxing-red"
              }`}
              aria-label={`Filter by ${filterOption}`}
            >
              {filterOption === "Morning" ? (
                <span className="flex items-center">
                  <FiClock className="mr-1" size={12} /> Morning
                </span>
              ) : filterOption === "Evening" ? (
                <span className="flex items-center">
                  <FiClock className="mr-1" size={12} /> Evening
                </span>
              ) : filterOption === "Kids" ? (
                <span className="flex items-center">
                  <FiUsers className="mr-1" size={12} /> Kids
                </span>
              ) : (
                filterOption
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClasses().length > 0 ? (
              filteredClasses().map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap font-semibold">
                    {item.time}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`${getLevelColor(
                          item.level,
                        )} w-3 h-3 rounded-full mr-2 flex-shrink-0`}
                      ></div>
                      <span>{item.className}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">{item.level}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-caption-text">
                    {item.notes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  {selectedDay === "Saturday" || selectedDay === "Sunday" ? (
                    <div>
                      <p className="font-semibold">
                        No classes scheduled on {selectedDay}
                      </p>
                      <p className="text-sm mt-2">
                        Check out our weekday classes!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">
                        No classes matching the selected filter
                      </p>
                      <p className="text-sm mt-2">
                        Try a different filter or day
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredClasses().length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
          <a
            href="/free-trial"
            className="bg-boxing-red text-white px-6 py-2 rounded-button font-bold hover:bg-opacity-90 transition-colors"
          >
            Book a Free Trial Class
          </a>
        </div>
      )}
    </div>
  );
};

export default ScheduleTableClient;
