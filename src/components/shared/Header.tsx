"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Schedule", href: "/schedule" },
    { name: "Trainers", href: "/trainers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed w-screen z-50 bg-boxing-black bg-opacity-95 text-white">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="font-accent text-2xl md:text-3xl text-boxing-red">
            BOXFIT <span className="text-accent-gold">UTAH</span>
          </div>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-accent-gold transition-colors font-primary"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/membership"
            className="bg-boxing-red text-white px-5 py-2 rounded-button font-bold hover:bg-opacity-90 transition-all"
          >
            Free Trial
          </Link>
        </nav>

        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-boxing-black overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-accent-gold py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/membership"
                  className="bg-boxing-red text-white px-5 py-2 rounded-button font-bold hover:bg-opacity-90 transition-all inline-block w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Free Trial
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
