import { FiExternalLink } from "react-icons/fi";

const LocationMap = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            FIND <span className="text-boxing-red">US</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-caption-text">
            Located in the heart of Clearfield, our gym is easily accessible
            with plenty of parking available.
          </p>
        </div>

        <div className="bg-white p-2 rounded-card shadow-card">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1503.5604716261892!2d-112.0323378538501!3d41.08820405065078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87530373b4fb461f%3A0x876b9db4a50d9761!2sBoxFit%20Utah!5e0!3m2!1sen!2sus!4v1746578820213!5m2!1sen!2sus"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
              title="BoxFit Utah Location Map"
              className="rounded-card"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/dir//1740+S+300+W,+Clearfield,+UT+84015/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-boxing-red font-semibold hover:text-steel-gray transition-colors"
          >
            Get Directions <FiExternalLink className="ml-1" />
          </a>
          <p className="mt-4 text-caption-text max-w-2xl mx-auto">
            We&#39;re located at 1740 S 300th W, Clearfield, UT 84015. The gym
            is easily visible from the street with our BoxFit Utah signage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
