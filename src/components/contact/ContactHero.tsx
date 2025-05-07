const ContactHero = () => {
  return (
    <section className="relative py-16 md:py-24 bg-boxing-black">
      <div className="absolute inset-0 bg-gradient-to-r from-boxing-black to-transparent opacity-90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-accent text-5xl md:text-6xl mb-4 text-white">
            GET IN <span className="text-boxing-red">TOUCH</span>
          </h1>
          <p className="text-xl text-white mb-6">
            We&#39;re here to answer your questions and help you start your
            boxing journey. Reach out to our team today.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+13856263514"
              className="bg-boxing-red hover:bg-opacity-90 text-white px-6 py-3 rounded-button font-bold transition-all inline-flex items-center"
            >
              (385) 626-3514
            </a>
            <a
              href="mailto:info@boxfitutah.com"
              className="border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold px-6 py-3 rounded-button font-bold transition-colors inline-flex items-center"
            >
              info@boxfitutah.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
