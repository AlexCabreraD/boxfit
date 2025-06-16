import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CallToAction = () => {
  return (
    <section className="py-20 bg-cta-pattern text-white relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-accent text-3xl md:text-4xl mb-4">
            START YOUR BOXING JOURNEY TODAY
          </h2>

          <p className="text-lg md:text-xl mb-8">
            Take the first step toward your fitness goals and boxing
            aspirations. Join our community and experience the BoxFit difference
            with a free trial lesson.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/membership"
              className="bg-white text-boxing-red hover:bg-accent-gold hover:text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center gap-2 text-lg"
            >
              Start Your Free Trial <FiArrowRight />
            </Link>

            <Link
              href="/contact"
              className="border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold px-8 py-3 rounded-button font-bold transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 flex justify-center items-center text-sm">
            <span className="mr-2">Have questions?</span>
            <a
              href="tel:+13856263514"
              className="text-accent-gold hover:text-white transition-colors font-semibold"
            >
              Call (385) 626-3514
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
