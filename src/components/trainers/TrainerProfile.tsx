import { FiAward, FiUsers, FiStar, FiTarget } from "react-icons/fi";

const TrainerProfile = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="trainer-image-frame relative z-10">
                <div className="relative h-[500px]">
                  {/* Replace with actual image when available */}
                  <div className="w-full h-full bg-steel-gray opacity-40 flex items-center justify-center">
                    <span className="text-white text-lg">Coach Pablo</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-64 h-32 bg-boxing-red z-0"></div>
              <div className="absolute top-16 -left-8 w-32 h-32 bg-accent-gold z-0"></div>
            </div>

            <div className="accent-box p-6">
              <h2 className="font-accent text-3xl md:text-4xl mb-4 text-boxing-black diagonal-accent">
                COACH <span className="text-boxing-red">PABLO</span>
              </h2>

              <p className="text-boxing-red font-semibold text-xl mt-8 mb-6">
                Head Boxing Coach & Founder
              </p>

              <div className="mb-8">
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
                <div className="flex items-center mb-3">
                  <FiStar className="text-boxing-red mr-3" size={24} />
                  <p className="font-semibold">
                    Personalized Training Approach
                  </p>
                </div>
                <div className="flex items-center mb-3">
                  <FiTarget className="text-boxing-red mr-3" size={24} />
                  <p className="font-semibold">
                    Competition Strategy Specialist
                  </p>
                </div>
              </div>

              <div className="profile-divider"></div>

              <div className="mb-8">
                <p className="text-body-text mb-4">
                  Coach Pablo brings over two decades of boxing expertise to
                  BoxFit Utah, having trained champions at all levels of
                  competition. His technical knowledge, personalized approach,
                  and dedication to the sport have helped countless athletes
                  reach their full potential.
                </p>
                <p className="text-body-text mb-4">
                  With experience working with both professional and amateur
                  boxers, Coach Pablo understands the unique needs of fighters
                  at every stage of their journey. His training philosophy
                  emphasizes proper technique, strategic thinking, and
                  disciplined conditioning.
                </p>
                <p className="text-body-text">
                  Coach Pablo founded BoxFit Utah in 2020 with a vision to
                  create an inclusive gym that welcomes boxers of all skill
                  levels and backgrounds. His passion for the sport and
                  commitment to each member&#39;s development has built a
                  thriving community around BoxFit Utah.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-xl mb-4">Specializations:</h3>
                <ul className="specialties-list grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  <li>Technical Boxing Skills</li>
                  <li>Competition Strategy</li>
                  <li>Elite Performance Training</li>
                  <li>Youth Development</li>
                  <li>Boxing Fitness</li>
                  <li>Fundamentals for Beginners</li>
                </ul>
              </div>

              <div className="trainer-quote mb-4">
                <h3 className="font-semibold text-xl mb-3">
                  Training Philosophy:
                </h3>
                <p className="italic text-body-text">
                  &#34;Boxing is more than just physical training. Boxing is
                  about building discipline, confidence, and mental strength. I
                  believe everyone has potential, and my goal is to help each
                  person discover what they&#39;re truly capable of, whether
                  they&#39;re training for competition or personal fitness.&#34;
                </p>
              </div>

              <div className="mt-8">
                <span className="experience-badge mb-2 inline-block">
                  20+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerProfile;
