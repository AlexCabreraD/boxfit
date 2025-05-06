import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
            TRANSFORM YOURSELF{" "}
            <span className="text-boxing-red">THROUGH BOXING</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-6 text-white font-primary">
            Professional boxing training for all skill levels in Clearfield,
            Utah
          </h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Whether you&#39;re a beginner or an experienced boxer, our
            professional coaches with 20+ years of experience will help you
            achieve your fitness goals and unleash your full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-trial"
              className="bg-boxing-red hover:bg-opacity-90 text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg"
            >
              Start Your Free Trial <FiArrowRight className="ml-1" />
            </Link>

            <Link
              href="/programs"
              className="border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
