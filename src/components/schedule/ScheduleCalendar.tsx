import { ClassSchedule } from "./types";
import ScheduleCalendarClient from "./ScheduleCalendarClient";

interface ScheduleCalendarProps {
  classSchedule: ClassSchedule;
}

const ScheduleCalendar = ({ classSchedule }: ScheduleCalendarProps) => {
  const getAllTimeSlots = () => {
    const allTimeSlots = new Set<string>();

    Object.values(classSchedule).forEach((daySchedule) => {
      daySchedule.forEach((item) => {
        allTimeSlots.add(item.time);
      });
    });

    return Array.from(allTimeSlots).sort((a, b) => {
      const aStart = a.split(" - ")[0];
      const bStart = b.split(" - ")[0];

      const aHour = parseInt(aStart.split(":")[0]);
      const bHour = parseInt(bStart.split(":")[0]);

      const aIsPM = aStart.includes("PM") && aHour !== 12;
      const bIsPM = bStart.includes("PM") && bHour !== 12;

      const aHour24 = aIsPM ? aHour + 12 : aHour;
      const bHour24 = bIsPM ? bHour + 12 : bHour;

      return aHour24 - bHour24;
    });
  };

  const timeSlots = getAllTimeSlots();
  const days = Object.keys(classSchedule);

  return (
    <div className="mt-12 bg-white rounded-card shadow-card p-6 overflow-hidden">
      <h3 className="font-accent text-2xl mb-6 text-boxing-black text-center">
        WEEKLY <span className="text-boxing-red">OVERVIEW</span>
      </h3>

      <ScheduleCalendarClient
        classSchedule={classSchedule}
        timeSlots={timeSlots}
        days={days}
      />
    </div>
  );
};

export default ScheduleCalendar;
