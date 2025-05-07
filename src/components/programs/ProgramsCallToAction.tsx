import Link from "next/link";
import { FiCalendar, FiPhoneCall } from "react-icons/fi";

const ProgramsCallToAction = () => {
  return (
    <section className="py-20 bg-boxing-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-accent text-3xl md:text-4xl mb-3">
              READY TO GET <span className="text-boxing-red">STARTED?</span>
            </h2>
            <p className="text-lg md:text-xl mb-0">
              Join BoxFit Utah today and experience the transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Trial Card */}
            <div className="bg-steel-gray bg-opacity-20 p-8 rounded-card border border-steel-gray border-opacity-30 hover:border-boxing-red transition-colors">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-boxing-red flex items-center justify-center">
                    <FiCalendar size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-primary font-bold text-xl text-white">
                    Free Trial Class
                  </h3>
                  <p className="text-steel-gray">
                    Experience BoxFit before committing
                  </p>
                </div>
              </div>

              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-boxing-red rounded-full mr-2"></span>
                  <span>No obligation or pressure</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-boxing-red rounded-full mr-2"></span>
                  <span>Try any program that interests you</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-boxing-red rounded-full mr-2"></span>
                  <span>All equipment provided</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-boxing-red rounded-full mr-2"></span>
                  <span>Meet our professional coaches</span>
                </li>
              </ul>

              <Link
                href="/free-trial"
                className="w-full text-center block bg-boxing-red text-white py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
              >
                Book Free Trial
              </Link>
            </div>

            {/* Schedule Tour Card */}
            <div className="bg-steel-gray bg-opacity-20 p-8 rounded-card border border-steel-gray border-opacity-30 hover:border-accent-gold transition-colors">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center">
                    <FiPhoneCall size={24} className="text-boxing-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-primary font-bold text-xl text-white">
                    Schedule a Tour
                  </h3>
                  <p className="text-steel-gray">
                    See our facilities and meet our team
                  </p>
                </div>
              </div>

              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-gold rounded-full mr-2"></span>
                  <span>Tour our state-of-the-art facility</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-gold rounded-full mr-2"></span>
                  <span>Learn about our different programs</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-gold rounded-full mr-2"></span>
                  <span>Discuss your goals with our coaches</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent-gold rounded-full mr-2"></span>
                  <span>Get pricing and membership details</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="w-full text-center block bg-accent-gold text-boxing-black py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-steel-gray mb-2">Still have questions?</p>
            <a
              href="tel:+13856263514"
              className="text-accent-gold hover:text-white transition-colors text-lg font-semibold flex items-center justify-center"
            >
              <FiPhoneCall className="mr-2" /> Call us at (385) 626-3514
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsCallToAction;
