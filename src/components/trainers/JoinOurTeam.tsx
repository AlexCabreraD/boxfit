import Link from "next/link";
import { FiArrowRight, FiUserPlus, FiUsers, FiTarget } from "react-icons/fi";

const JoinOurTeam = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-accent text-3xl md:text-4xl mb-4 text-boxing-black diagonal-accent inline-block">
              JOIN OUR <span className="text-boxing-red">COACHING TEAM</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-body-text mt-10">
              BoxFit Utah is always looking for passionate, experienced boxing
              coaches to join our growing team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="join-team-card bg-white p-8 rounded-card shadow-card">
              <FiUserPlus className="text-boxing-red mb-4" size={40} />
              <h3 className="font-semibold text-xl mb-3">Become a Coach</h3>
              <p className="text-caption-text mb-4">
                Share your boxing expertise and help grow our community. We
                welcome coaches with various specializations and backgrounds.
              </p>
            </div>

            <div className="join-team-card bg-white p-8 rounded-card shadow-card">
              <FiUsers className="text-boxing-red mb-4" size={40} />
              <h3 className="font-semibold text-xl mb-3">Teach Your Style</h3>
              <p className="text-caption-text mb-4">
                Whether you specialize in technical boxing, fitness training,
                youth development, or competitive coaching, there&#39;s a place
                for your expertise at BoxFit.
              </p>
            </div>

            <div className="join-team-card bg-white p-8 rounded-card shadow-card">
              <FiTarget className="text-boxing-red mb-4" size={40} />
              <h3 className="font-semibold text-xl mb-3">Build Your Career</h3>
              <p className="text-caption-text mb-4">
                Join a supportive environment where you can grow professionally
                while making a positive impact on our members&#39; lives.
              </p>
            </div>
          </div>

          <div className="bg-boxing-black text-white p-10 rounded-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-boxing-red opacity-20 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-gold opacity-20 rounded-full transform -translate-x-16 translate-y-16"></div>

            <div className="relative z-10">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:max-w-xl">
                  <h3 className="font-accent text-2xl md:text-3xl mb-4">
                    LOOKING FOR COACHING OPPORTUNITIES?
                  </h3>
                  <p className="text-steel-gray mb-6 md:mb-0">
                    If you&#39;re an experienced boxing coach or trainer
                    interested in joining BoxFit Utah, we&#39;d love to hear
                    from you. Contact us to discuss potential coaching
                    opportunities.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="animated-button inline-flex items-center bg-boxing-red hover:bg-opacity-90 text-white px-6 py-3 rounded-button font-bold transition-all group"
                >
                  Contact Us
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-boxing-black max-w-3xl mx-auto">
              At BoxFit Utah, we&#39;re committed to providing exceptional
              training for our members. Our coaching opportunities offer
              competitive compensation and a supportive team environment.
              <Link href="/contact" className="fancy-link ml-1">
                Reach out today
              </Link>{" "}
              to learn more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeam;
