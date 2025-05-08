const ProgramsHero = () => {
  return (
    <section className="relative py-32 md:py-40 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-boxing-black"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl mb-4 text-white">
            BOXING <span className="text-boxing-red">PROGRAMS</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-6 text-white font-primary">
            Tailored training for every skill level, age, and goal
          </h2>

          <p className="text-lg md:text-xl mb-8 text-steel-gray max-w-2xl">
            At BoxFit Utah, we offer comprehensive boxing programs designed by
            our professional coaches with 20+ years of experience. Whether
            you&#39;re looking to get fit, learn self-defense, or compete at the
            highest level, we have the perfect program for you.
          </p>

          <div className="inline-block bg-boxing-red text-white px-8 py-3 rounded-button font-bold transition-all flex items-center justify-center sm:justify-start gap-2 text-lg shadow-button">
            <a href="#programs" className="inline-block">
              Explore Our Programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsHero;
