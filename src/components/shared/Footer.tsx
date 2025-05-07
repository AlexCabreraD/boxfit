import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-boxing-black text-white pt-12 pb-6 w-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-accent-gold font-accent text-xl mb-4">
              BOXFIT UTAH
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-boxing-red flex-shrink-0" />
                <span>1740 S 300th W, Clearfield, UT 84015</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-boxing-red flex-shrink-0" />
                <a
                  href="tel:+13856263514"
                  className="hover:text-accent-gold transition-colors"
                >
                  (385) 626-3514
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 text-boxing-red flex-shrink-0" />
                <a
                  href="mailto:info@boxfitutah.com"
                  className="hover:text-accent-gold transition-colors"
                >
                  info@boxfitutah.com
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com/boxfitutah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FiFacebook className="text-2xl hover:text-accent-gold transition-colors" />
              </a>
              <a
                href="https://instagram.com/boxfitutah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram className="text-2xl hover:text-accent-gold transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-accent-gold font-accent text-xl mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs"
                  className="hover:text-accent-gold transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-accent-gold transition-colors"
                >
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/trainers"
                  className="hover:text-accent-gold transition-colors"
                >
                  Our Trainers
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="hover:text-accent-gold transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent-gold font-accent text-xl mb-4">HOURS</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiClock className="mt-1 mr-2 text-boxing-red flex-shrink-0" />
                <div>
                  <p>Monday - Friday</p>
                  <p>6:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <FiClock className="mt-1 mr-2 text-boxing-red flex-shrink-0" />
                <div>
                  <p>Saturday</p>
                  <p>8:00 AM - 5:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <FiClock className="mt-1 mr-2 text-boxing-red flex-shrink-0" />
                <div>
                  <p>Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent-gold font-accent text-xl mb-4">
              JOIN OUR NEWSLETTER
            </h3>
            <p className="mb-3">
              Sign up to get exclusive offers, news, and updates!
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 bg-steel-gray text-white placeholder-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-boxing-red"
                required
              />
              <button
                type="submit"
                className="w-full bg-boxing-red text-white px-4 py-2 rounded-button font-bold hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-steel-gray mt-8 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} BoxFit Utah. All rights reserved.
          </p>
          <p className="mt-1">Established in 2020.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
