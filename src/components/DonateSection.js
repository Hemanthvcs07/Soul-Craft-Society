import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import qr from './QR.png';

const DonateSection = ({ id = "donate" }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const donateRef = useRef(null);
  const isInView = useInView(donateRef, { once: true });

  const handleDonateClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <section
      id={id}
      className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16 h-screen lg:h-[100vh] w-full max-w-screen-xl mx-auto text-white"
    >
      <div ref={donateRef} className="w-full text-center">
        <motion.h2
          initial={{ opacity: 0, translateY: -50 }}
          animate={isInView ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: -50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4"
        >
          Support Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, translateY: 20 }}
          animate={isInView ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-2xl lg:text-4xl mb-6 px-4 sm:px-6 md:px-8 lg:px-12"
        >
          Supporting our cause means helping us deliver vital resources like
          healthcare and education to under-resourced communities. Every
          donation allows us to continue this important work and reach more
          people in need.
        </motion.p>
        <motion.button
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.5, opacity: 0, rotate: -15 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-green-600 text-white text-lg md:text-xl py-3 px-8 rounded transition-all transform hover:bg-green-700 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Donate now"
          onClick={handleDonateClick}  // Trigger the image overlay on button click
        >
          Donate Now
        </motion.button>
      </div>

      {/* Image Overlay */}
      {overlayVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseOverlay} 
        >
          <motion.img
            src={qr}  
            alt="Donation Image"
            className="max-w-full max-h-full transform scale-150 transition-all duration-500 rounded-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        </div>
      )}
    </section>
  );
};

export default React.memo(DonateSection);
