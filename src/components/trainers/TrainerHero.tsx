const TrainerHero = () => {
  return (
    <section className="relative py-28 lg:py-36 bg-trainer-pattern">
      <div
        className="absolute inset-0 bg-boxing-black bg-opacity-70 z-0"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl mb-6">
            MEET OUR <span className="text-boxing-red">EXPERT TRAINERS</span>
          </h1>

          <div className="w-24 h-1 bg-boxing-red mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl mb-8">
            Our professional coaching team brings decades of experience and
            passion to help you achieve your boxing goals
          </p>

          <div className="bg-boxing-black bg-opacity-50 p-6 rounded-lg border-l-4 border-boxing-red mt-8">
            <p className="text-lg md:text-xl">
              Whether you&#39;re a beginner learning the basics or a competitive
              boxer refining your skills, our experienced coaches provide
              personalized training to help you reach your full potential.
            </p>
          </div>

          <div className="mt-12">
            <div className="inline-block relative">
              <span className="experience-badge text-lg py-2 px-6">
                20+ Years of Professional Experience
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-boxing-red rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-40"></div>
    </section>
  );
};

export default TrainerHero;
