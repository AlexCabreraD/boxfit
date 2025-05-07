import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      <div
        className="absolute inset-0 bg-about-hero-pattern bg-cover bg-center"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
            OUR <span className="text-boxing-red">STORY</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-6 text-white font-primary">
            Founded in 2020 with a passion for boxing and community
          </h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            BoxFit Utah was established to provide high-quality boxing training
            to the Clearfield community. With over 20 years of professional
            coaching experience, we&apos;re dedicated to helping people of all
            ages and skill levels achieve their boxing goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-trial"
              className="bg-boxing-red hover:bg-opacity-90 text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg"
            >
              Start Your Free Trial <FiArrowRight className="ml-1" />
            </Link>

            <Link
              href="/contact"
              className="border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
