import Image from "next/image";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

const OurStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column: Content */}
          <div>
            <h2 className="font-accent text-3xl md:text-4xl mb-6 text-boxing-black">
              ESTABLISHED WITH <span className="text-boxing-red">PURPOSE</span>
            </h2>

            <p className="text-lg mb-6">
              BoxFit Utah was founded in 2020 with a clear mission: to provide
              high-quality boxing training and fitness programs for clients of
              all ages and skill levels in the Clearfield, Utah area.
            </p>

            <p className="text-lg mb-6">
              As a Latinx-owned business, we take pride in creating an inclusive
              environment where diversity is celebrated and everyone feels
              welcome. Our head coach brings over 20 years of professional
              experience, having trained both amateur and professional boxers
              throughout their career.
            </p>

            <p className="text-lg mb-6">
              What started as a passion for boxing has grown into a thriving
              community hub where people come not just to train, but to grow,
              connect, and transform their lives through the discipline of
              boxing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-boxing-red rounded-full flex items-center justify-center mb-4">
                  <FiCalendar className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold mb-1">Established 2020</h3>
                <p className="text-caption-text">Serving the community since</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-boxing-red rounded-full flex items-center justify-center mb-4">
                  <FiUsers className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold mb-1">All Skill Levels</h3>
                <p className="text-caption-text">From beginners to pros</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-boxing-red rounded-full flex items-center justify-center mb-4">
                  <FiMapPin className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold mb-1">Clearfield, Utah</h3>
                <p className="text-caption-text">Local community focused</p>
              </div>
            </div>
          </div>

          {/* Right column: Images */}
          <div className="relative">
            {/* Main image with frame */}
            <div className="relative h-[500px] z-10">
              <div className="absolute inset-4 border-4 border-boxing-red z-20"></div>
              <div className="absolute inset-0 bg-boxing-black overflow-hidden">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-steel-gray opacity-40"></div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-boxing-black z-0"></div>
            <div className="absolute top-12 -left-8 w-16 h-16 bg-accent-gold z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
