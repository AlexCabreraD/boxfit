import { FiCalendar, FiClock, FiMapPin, FiUser } from "react-icons/fi";
import Link from "next/link";

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
            <div className="relative h-96 z-10">
              <div className="absolute inset-0 border-4 border-boxing-red z-20 transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
              <div className="absolute inset-0 bg-boxing-black overflow-hidden">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-steel-gray opacity-40 flex items-center justify-center">
                  <span className="text-white text-xl">Boxing Class Image</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent-gold opacity-25 z-0 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleBooking;
