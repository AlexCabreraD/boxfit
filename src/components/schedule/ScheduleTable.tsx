import ScheduleTableClient from "./ScheduleTableClient";
import ScheduleCalendar from "./ScheduleCalendar";
import { ClassSchedule } from "./types";

// Define the class schedule data
const classSchedule: ClassSchedule = {
  Monday: [
    {
      time: "6:30 AM - 7:30 AM",
      className: "Adult Boxing",
      level: "All Levels",
      notes: "By appointment only",
    },
    {
      time: "5:00 PM - 6:00 PM",
      className: "Kids Boxing",
      level: "All Levels",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Adult Boxing",
      level: "All Levels",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Advanced Boxing",
      level: "Advanced",
      notes: "",
    },
    {
      time: "6:00 PM - 7:30 PM",
      className: "Elite Boxing",
      level: "Competition",
      notes: "",
    },
  ],
  Tuesday: [
    {
      time: "5:00 PM - 6:00 PM",
      className: "Beginner Boxing",
      level: "Beginner",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Beginner Boxing",
      level: "Beginner",
      notes: "",
    },
  ],
  Wednesday: [
    {
      time: "6:30 AM - 7:30 AM",
      className: "Adult Boxing",
      level: "All Levels",
      notes: "By appointment only",
    },
    {
      time: "5:00 PM - 6:00 PM",
      className: "Kids Boxing",
      level: "All Levels",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Adult Boxing",
      level: "All Levels",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Advanced Boxing",
      level: "Advanced",
      notes: "",
    },
    {
      time: "6:00 PM - 7:30 PM",
      className: "Elite Boxing",
      level: "Competition",
      notes: "",
    },
  ],
  Thursday: [
    {
      time: "5:00 PM - 6:00 PM",
      className: "Beginner Boxing",
      level: "Beginner",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Beginner Boxing",
      level: "Beginner",
      notes: "",
    },
  ],
  Friday: [
    {
      time: "5:00 PM - 6:00 PM",
      className: "Beginner Boxing",
      level: "Beginner",
      notes: "",
    },
    {
      time: "6:00 PM - 7:00 PM",
      className: "Advanced Boxing",
      level: "Advanced",
      notes: "",
    },
    {
      time: "6:00 PM - 7:30 PM",
      className: "Elite Boxing",
      level: "Competition",
      notes: "",
    },
  ],
  Saturday: [],
  Sunday: [],
};

const ScheduleTable = () => {
  return (
    <section className="py-16 bg-gray-50" id="schedule-table">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            WEEKLY <span className="text-boxing-red">SCHEDULE</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Find the perfect class for your skill level and availability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-card shadow-card p-6">
            <h3 className="font-accent text-2xl mb-4 text-boxing-black text-center">
              PROGRAM <span className="text-boxing-red">HIGHLIGHTS</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-boxing-red pl-4">
                <h4 className="font-semibold text-lg">Kids Program</h4>
                <p className="text-caption-text">
                  Monday-Wednesday, 5:00-6:00 PM
                </p>
                <p className="text-sm mt-1">
                  Our kids program focuses on discipline, confidence, and fun
                  while teaching age-appropriate boxing fundamentals to children
                  ages 6-15.
                </p>
              </div>

              <div className="border-l-4 border-accent-gold pl-4">
                <h4 className="font-semibold text-lg">Beginner Classes</h4>
                <p className="text-caption-text">
                  Tuesday-Thursday 6:00-7:00 PM, Tuesday-Friday 5:00-6:00 PM
                </p>
                <p className="text-sm mt-1">
                  Perfect for those new to boxing, our beginner classes teach
                  fundamentals in a supportive, non-intimidating environment.
                </p>
              </div>

              <div className="border-l-4 border-boxing-black pl-4">
                <h4 className="font-semibold text-lg">Adult Classes</h4>
                <p className="text-caption-text">
                  Monday-Wednesday 6:00-7:00 PM
                </p>
                <p className="text-sm mt-1">
                  These classes are designed for all levels, focusing on
                  technique, conditioning, and practical boxing skills in a
                  supportive group setting.
                </p>
              </div>

              <div className="border-l-4 border-steel-gray pl-4">
                <h4 className="font-semibold text-lg">
                  Advanced & Elite Training
                </h4>
                <p className="text-caption-text">
                  Monday-Wednesday-Friday 6:00-7:30 PM
                </p>
                <p className="text-sm mt-1">
                  Our advanced and elite programs are for experienced boxers
                  looking to refine their skills and prepare for competition.
                </p>
              </div>

              <div className="border-l-4 border-boxing-red pl-4">
                <h4 className="font-semibold text-lg">Morning Sessions</h4>
                <p className="text-caption-text">
                  Monday-Wednesday 6:30-7:30 AM (by appointment)
                </p>
                <p className="text-sm mt-1">
                  Start your day with boxing! Morning classes are available by
                  appointment only. Contact us to secure your spot.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="bg-boxing-black text-white p-4">
              <h3 className="font-accent text-xl text-center">FIND A CLASS</h3>
            </div>
            <ScheduleTableClient classSchedule={classSchedule} />
          </div>
        </div>

        <ScheduleCalendar classSchedule={classSchedule} />

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-center flex-wrap">
          <div className="bg-white py-2 px-4 rounded-full flex items-center">
            <div className="w-3 h-3 rounded-full bg-boxing-red mr-2"></div>
            <span className="text-sm">Beginner</span>
          </div>
          <div className="bg-white py-2 px-4 rounded-full flex items-center">
            <div className="w-3 h-3 rounded-full bg-accent-gold mr-2"></div>
            <span className="text-sm">All Levels</span>
          </div>
          <div className="bg-white py-2 px-4 rounded-full flex items-center">
            <div className="w-3 h-3 rounded-full bg-boxing-black mr-2"></div>
            <span className="text-sm">Advanced</span>
          </div>
          <div className="bg-white py-2 px-4 rounded-full flex items-center">
            <div className="w-3 h-3 rounded-full bg-steel-gray mr-2"></div>
            <span className="text-sm">Competition</span>
          </div>
          <div className="bg-white py-2 px-4 rounded-full flex items-center">
            <div className="w-3 h-3 rounded-full bg-boxing-red opacity-50 mr-2"></div>
            <span className="text-sm">Kids</span>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-card shadow-card text-center">
          <p className="text-caption-text mb-2">
            Note: Schedule is subject to change. Please check our social media
            or contact us for the most up-to-date information.
          </p>
          <p className="font-semibold">
            Morning classes (6:30 AM - 7:30 AM) are available by appointment
            only. Contact us to book your spot.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTable;
