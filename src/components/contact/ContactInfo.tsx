import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";

const ContactInfo = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-card shadow-card">
      <h2 className="font-accent text-3xl mb-6 text-boxing-black">
        CONTACT <span className="text-boxing-red">INFORMATION</span>
      </h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-boxing-red p-3 rounded-full mr-4 text-white">
            <FiMapPin size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Our Location</h3>
            <p className="text-caption-text">
              1740 S 300th W
              <br />
              Clearfield, UT 84015
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-boxing-red p-3 rounded-full mr-4 text-white">
            <FiPhone size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Phone</h3>
            <p className="text-caption-text">
              <a
                href="tel:+13856263514"
                className="hover:text-boxing-red transition-colors"
              >
                (385) 626-3514
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-boxing-red p-3 rounded-full mr-4 text-white">
            <FiMail size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Email</h3>
            <p className="text-caption-text">
              <a
                href="mailto:info@boxfitutah.com"
                className="hover:text-boxing-red transition-colors"
              >
                info@boxfitutah.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-boxing-red p-3 rounded-full mr-4 text-white">
            <FiClock size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Hours of Operation</h3>
            <div className="grid grid-cols-2 gap-2 text-caption-text">
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p>6:00 AM - 9:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p>8:00 AM - 5:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/boxfitutah"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-steel-gray p-3 rounded-full text-white hover:bg-boxing-red transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook size={20} />
            </a>
            <a
              href="https://instagram.com/boxfitutah"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-steel-gray p-3 rounded-full text-white hover:bg-boxing-red transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
