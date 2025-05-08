import { FiCalendar, FiClock } from "react-icons/fi";

const ScheduleHero = () => {
  return (
    <section className="relative py-32 md:py-40 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-boxing-black"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
            CLASS <span className="text-boxing-red">SCHEDULE</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-6 text-white font-primary">
            Find the perfect class for your schedule and skill level
          </h2>

          <p className="text-lg md:text-xl mb-8 text-steel-gray max-w-2xl">
            At BoxFit Utah, we offer a variety of boxing classes throughout the
            week to accommodate different skill levels and schedules. Morning
            and evening sessions are available for your convenience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#schedule-table"
              className="bg-boxing-red hover:bg-opacity-90 text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg shadow-button"
            >
              <FiCalendar className="mr-2" /> View Full Schedule
            </a>
            <a
              href="/contact"
              className="border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold px-8 py-3 rounded-button font-bold transition-colors flex items-center justify-center sm:justify-start gap-2 text-lg"
            >
              <FiClock className="mr-2" /> Book Private Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleHero;
