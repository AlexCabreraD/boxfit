"use client";

import { ClassSchedule } from "./types";

interface ScheduleCalendarClientProps {
  classSchedule: ClassSchedule;
  timeSlots: string[];
  days: string[];
}

const ScheduleCalendarClient = ({
  classSchedule,
  timeSlots,
  days,
}: ScheduleCalendarClientProps) => {
  // Function to check if a class exists at a given time slot and day
  const getClassAtTimeSlot = (timeSlot: string, day: string) => {
    return classSchedule[day].find((item) => item.time === timeSlot);
  };

  // Function to determine the color based on class level
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-boxing-black text-white p-2 border border-gray-200"></th>
            {days.map((day) => (
              <th
                key={day}
                className="bg-boxing-black text-white p-2 text-center border border-gray-200 min-w-[120px]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="bg-gray-100 font-semibold p-2 border border-gray-200 whitespace-nowrap">
                {timeSlot}
              </td>
              {days.map((day) => {
                const classItem = getClassAtTimeSlot(timeSlot, day);
                return (
                  <td
                    key={`${day}-${timeSlot}`}
                    className={`p-2 border border-gray-200 text-center ${
                      classItem ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {classItem ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-sm font-semibold mb-1">
                          {classItem.className}
                        </span>
                        <div className="flex items-center justify-center">
                          <div
                            className={`${getLevelColor(
                              classItem.level,
                            )} w-2 h-2 rounded-full mr-1`}
                          ></div>
                          <span className="text-xs">{classItem.level}</span>
                        </div>
                        {classItem.notes && (
                          <span className="text-xs text-caption-text mt-1">
                            {classItem.notes}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCalendarClient;
