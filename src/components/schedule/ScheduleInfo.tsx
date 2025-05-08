import { FiUsers, FiStar, FiSunrise, FiSunset } from "react-icons/fi";

const ScheduleInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            CLASS <span className="text-boxing-red">INFORMATION</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Everything you need to know about our boxing classes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-card shadow-card p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center mr-4">
                <FiUsers className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-lg">Class Sizes</h3>
            </div>
            <p className="text-caption-text">
              Our classes are limited to ensure quality instruction. Kids and
              beginner classes typically have 8-12 participants, while advanced
              classes are kept smaller for more personalized attention.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center mr-4">
                <FiStar className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-lg">What to Bring</h3>
            </div>
            <p className="text-caption-text">
              For your first class, just bring comfortable workout clothes,
              athletic shoes, and a water bottle. We provide all necessary
              boxing equipment for beginners. As you progress, we&#39;ll guide
              you on purchasing your own gear.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center mr-4">
                <FiSunrise className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-lg">Morning Classes</h3>
            </div>
            <p className="text-caption-text">
              Start your day with our morning boxing sessions. These classes
              focus on energizing workouts that improve technique while boosting
              your metabolism. Perfect for early risers who want to fit training
              into their busy schedules.
            </p>
          </div>

          <div className="bg-white rounded-card shadow-card p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center mr-4">
                <FiSunset className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-lg">Evening Classes</h3>
            </div>
            <p className="text-caption-text">
              Our evening classes are perfect for those who work during the day.
              These sessions provide the perfect outlet for stress relief while
              improving your boxing skills and overall fitness in a supportive
              community environment.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-card shadow-card">
          <h3 className="font-accent text-2xl mb-4 text-boxing-black text-center">
            CLASS <span className="text-boxing-red">STRUCTURE</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">Warm-up (15 min)</h4>
              <p className="text-caption-text">
                Each class begins with a proper warm-up to prepare your body for
                the workout. This includes dynamic stretching, light cardio, and
                boxing-specific movements to get your heart rate up and muscles
                ready.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Technical Work (25-30 min)
              </h4>
              <p className="text-caption-text">
                The main portion of class focuses on technique development
                through bag work, pad work with coaches, and partner drills. We
                emphasize proper form and mechanics tailored to your skill
                level.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Conditioning & Cool Down (15 min)
              </h4>
              <p className="text-caption-text">
                Classes finish with boxing-specific conditioning exercises to
                build stamina and strength, followed by a proper cool-down and
                stretching session to aid recovery and prevent injury.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleInfo;
