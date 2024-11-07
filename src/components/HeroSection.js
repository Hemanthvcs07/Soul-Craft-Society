import React, { useMemo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamUp from "./TeamUp";
import PropTypes from "prop-types";
import "../styles/Home.css";

const HeroSection = React.memo(({ 
  title = 'Soul Craft Society', 
  subtitle = 'Empowering Souls, Crafting a Brighter Tomorrow Together', 
  buttonLabel = 'Team Up', 
  onButtonClick = () => console.log("Button clicked") 
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Memoized animations for optimized performance
  const animations = useMemo(() => ({
    fadeIn: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
    button: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
    overlay: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    modal: { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } }
  }), []);

  // Toggle visibility and trigger external callback
  const handleButtonClick = useCallback(() => {
    setIsFormVisible((prev) => !prev);
    onButtonClick();
  }, [onButtonClick]);

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center text-center h-screen"
      role="banner"
    >
      {/* Animated title */}
      <motion.h1
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-5xl sm:text-7xl md:text-9xl font-bold text-white"
        aria-label={title}
      >
        {title}
      </motion.h1>

      {/* Animated subtitle */}
      <motion.p
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        className="mt-2 text-md sm:text-lg md:text-2xl text-gray-300"
      >
        {subtitle}
      </motion.p>

      {/* Action button with animation */}
      <motion.button
        type="button"
        variants={animations.button}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mt-4 bg-white text-black hover:bg-purple-400 hover:text-white py-2 px-3 sm:px-4 sm:py-2 rounded-lg shadow transform hover:scale-105 transition-all duration-200 flex items-center"
        aria-label={buttonLabel}
        onClick={handleButtonClick}
        tabIndex="0"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="iconTitle"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {buttonLabel}
      </motion.button>

      {/* Modal for TeamUp form with overlay */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            variants={animations.overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={() => setIsFormVisible(false)}
          >
            <motion.div
              className="relative p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-xs sm:max-w-md w-full mx-4 md:mx-0 mt-9"
              variants={animations.modal}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 right-2 hover:text-black text-red-400"
                onClick={() => setIsFormVisible(false)}
              >
                Close
              </button>
              <TeamUp />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

// PropTypes for prop validation
HeroSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default HeroSection;
