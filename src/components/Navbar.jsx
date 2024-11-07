import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/images/LOGO.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  // Close menu on navigation
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Smooth scroll to the section
  const handleNavigation = (linkId) => {
    closeMenu();
    setTimeout(() => {
      const element = document.getElementById(linkId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Delay to match exit animation
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about-us" },
    { name: "Programs", id: "programs" },
    { name: "Get Involved", id: "get-involved" },
    { name: "Donate", id: "donate" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur-xl bg-white rounded-lg m-4 bg-opacity-60 shadow-lg">
      <div className="max-w-9xl mx-auto px-4 flex justify-between items-center py-2">
        {/* Logo */}
        <div className="flex items-center z-20">
          <div onClick={() => handleNavigation("home")} className="cursor-pointer">
            <img src={logo} alt="Soul Craft Society Logo" className="h-10 w-auto md:h-14 lg:h-16" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6 z-20">
          {navLinks.map((link) => (
            <div
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="text-lg font-semibold hover:text-red-900 cursor-pointer transition-colors"
            >
              {link.name}
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden z-20">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-lg font-semibold"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backdropFilter: "blur(4px)",
            }}
            initial={{ opacity: 0 }}  // Initial opacity is 0 for fade effect
            animate={{ opacity: 1 }}  // Fade in to opacity 1
            exit={{ opacity: 0 }}  // Fade out to opacity 0
            transition={{ duration: 0.4, ease: "easeInOut" }}  // Smooth fade transition
          >
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div> {/* Dark overlay */}
            <div className="relative z-20"> {/* Place links above overlay */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  onClick={() => handleNavigation(link.id)}
                  initial={{ opacity: 0, y: -20 }}  // Initial state for each link
                  animate={{ opacity: 1, y: 0 }}  // Fade in and slide up
                  exit={{ opacity: 0, y: -20 }}  // Fade out and slide up
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,  // Staggered animation
                    ease: "easeInOut"  // Smooth transition for each link
                  }}
                  className="text-xl py-4 text-white font-semibold hover:text-blue-300 cursor-pointer transition-colors"
                >
                  {link.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
