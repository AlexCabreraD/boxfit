import { FiCalendar, FiClock, FiMapPin, FiUser } from "react-icons/fi";
import Link from "next/link";

const StatsDesign = () => (
  <div className="relative h-96 bg-gradient-to-br from-boxing-black to-steel-gray rounded-lg p-8 flex items-center justify-center overflow-hidden">
    <div className="grid grid-cols-2 gap-8 text-center text-white w-full max-w-md">
      <div className="bg-boxing-red bg-opacity-20 p-6 rounded-lg border border-boxing-red border-opacity-30">
        <div className="font-accent text-4xl mb-2">20+</div>
        <div className="text-sm">Years Experience</div>
      </div>
      <div className="bg-accent-gold bg-opacity-20 p-6 rounded-lg border border-accent-gold border-opacity-30">
        <div className="font-accent text-4xl mb-2">5</div>
        <div className="text-sm">Programs Available</div>
      </div>
      <div className="bg-accent-gold bg-opacity-20 p-6 rounded-lg border border-accent-gold border-opacity-30">
        <div className="font-accent text-4xl mb-2">100%</div>
        <div className="text-sm">Beginner Friendly</div>
      </div>
      <div className="bg-boxing-red bg-opacity-20 p-6 rounded-lg border border-boxing-red border-opacity-30">
        <div className="font-accent text-4xl mb-2">1</div>
        <div className="text-sm">Free Trial</div>
      </div>
    </div>

    <div className="absolute inset-0 opacity-5">
      <div
        className="w-full h-full bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  </div>
);

const ScheduleBooking = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <h2 className="font-accent text-3xl md:text-4xl mb-4 text-boxing-black">
                BOOK YOUR <span className="text-boxing-red">FREE TRIAL</span>
              </h2>
              <p className="text-lg">
                Experience the BoxFit difference firsthand with a free trial
                class. Choose any beginner-level class that fits your schedule
                and get ready to discover why our members love training with us.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="p-2 bg-boxing-red rounded-full text-white mr-4 mt-1">
                  <FiCalendar />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Choose Your Class</h3>
                  <p className="text-caption-text">
                    Select any beginner class from our schedule that fits your
                    availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-boxing-red rounded-full text-white mr-4 mt-1">
                  <FiUser />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Complete Registration
                  </h3>
                  <p className="text-caption-text">
                    Fill out a simple form with your information and preferred
                    class time.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-boxing-red rounded-full text-white mr-4 mt-1">
                  <FiClock />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Arrive Early</h3>
                  <p className="text-caption-text">
                    Come 15 minutes before your scheduled class for a gym
                    orientation and to meet your coach.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-boxing-red rounded-full text-white mr-4 mt-1">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enjoy Your Session</h3>
                  <p className="text-caption-text">
                    Experience a full class with personalized attention from our
                    coaches.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/free-trial"
                className="bg-boxing-red hover:bg-opacity-90 text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-button"
              >
                Book Free Trial
              </Link>
              <Link
                href="/contact"
                className="bg-boxing-black hover:bg-steel-gray text-white px-8 py-3 rounded-button font-bold transition-colors flex items-center justify-center gap-2 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <StatsDesign />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent-gold opacity-25 z-0 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleBooking;
