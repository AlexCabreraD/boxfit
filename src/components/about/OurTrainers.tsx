import Link from "next/link";
import { FiAward, FiUsers, FiCheck } from "react-icons/fi";

const OurTrainers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            MEET OUR <span className="text-boxing-red">HEAD COACH</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Learn from experienced professionals dedicated to your boxing
            success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 z-10">
              <div className="absolute inset-4 border-4 border-boxing-red z-20"></div>
              <div className="absolute inset-0 bg-boxing-black overflow-hidden">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-steel-gray opacity-40 coach-pablo-bg-img"></div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 w-64 h-64 bg-boxing-black z-0"></div>
            <div className="absolute top-12 -left-5 w-12 h-12 bg-accent-gold z-0"></div>
          </div>

          <div>
            <h3 className="font-primary font-bold text-2xl mb-2">
              Coach Pablo
            </h3>
            <p className="text-boxing-red font-semibold mb-6">
              Head Boxing Coach & Founder
            </p>

            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FiAward className="text-boxing-red mr-3" size={24} />
                <p className="font-semibold">
                  20+ Years Professional Experience
                </p>
              </div>
              <div className="flex items-center mb-3">
                <FiUsers className="text-boxing-red mr-3" size={24} />
                <p className="font-semibold">
                  Trained Both Amateur & Professional Boxers
                </p>
              </div>
            </div>

            <p className="text-caption-text mb-6">
              With over two decades of boxing expertise, Coach Pablo has trained
              champions at all levels of competition. His deep knowledge,
              personalized approach, and dedication to the sport have helped
              countless athletes reach their full potential.
            </p>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Specializations:</h4>
              <ul className="space-y-2">
                {[
                  "Technical Boxing Skills",
                  "Competition Strategy",
                  "Elite Performance Training",
                  "Youth Development",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-boxing-red mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/trainers"
              className="inline-block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
            >
              Learn More About Coach Pablo
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="p-8 bg-gray-50 rounded-lg max-w-3xl mx-auto">
            <h3 className="font-semibold text-xl mb-4">Growing Our Team</h3>
            <p className="text-caption-text mb-6">
              BoxFit Utah is always looking for passionate, experienced boxing
              coaches to join our team as we grow. If you&#39;re an experienced
              boxing coach with a passion for teaching, we&#39;d love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
            >
              Contact Us About Coaching Opportunities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTrainers;
