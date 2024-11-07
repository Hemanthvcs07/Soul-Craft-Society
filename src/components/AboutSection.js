import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";
import "../styles/About.css";

// Default principles data
const defaultPrinciples = [
  {
    title: "Empower Through Creativity",
    description: (
      <>
        Encourage individuals to find and nurture their <strong>soul craft</strong>, turning creative passions into powerful tools for change.
      </>
    ),
  },
  {
    title: "Serve with Compassion",
    description: "Cultivate a culture of empathy, inclusivity, and community-minded action, ensuring every effort benefits both individuals and society.",
  },
  {
    title: "Inspire Lasting Connection",
    description: "Foster meaningful relationships that connect people, building a community dedicated to lifelong learning, support, and growth.",
  },
];

const AboutSection = ({ principlesData = defaultPrinciples }) => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true });

  // Memoize principles rendering to prevent unnecessary re-renders
  const renderPrinciples = useMemo(
    () =>
      principlesData.map(({ title, description }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, translateX: -50 }}
          animate={isInView ? { opacity: 1, translateX: 0 } : {}}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: index * 0.2 }}
          className="card backdrop-blur-sm backdrop-filter text-white shadow-lg rounded-lg p-6 w-full max-w-xs md:max-w-sm h-50 flex flex-col items-start text-left transform transition-transform hover:scale-105 hover:shadow-xl mb-4"
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
          <p className="text-sm md:text-base">{description}</p>
        </motion.div>
      )),
    [principlesData, isInView] // Only re-render when principlesData changes
  );

  // About Us text array, memoized to avoid re-renders
  const aboutText = useMemo(
    () => [
      "About Us",
      "Soul Craft Society is a community-driven organization dedicated to fostering hope, creativity, and sustainable change through various impactful programs.",
      "Our core values—empathy, creativity, sustainability, and social responsibility—drive us to create positive change in the world."
    ],
    [] // No need to memoize if the content doesn't change
  );

  return (
    <section
      id="about-us"
      className="flex flex-col-reverse md:flex-row items-center min-h-screen max-w-full mx-auto px-4 py-8"
      aria-labelledby="about-us-title"
    >
      {/* Principles Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        {renderPrinciples} {/* Render principles using memoized content */}
      </div>

      {/* About Text Section */}
      <div ref={aboutRef} className="text-white w-full md:w-1/2 flex flex-col items-center md:items-start mb-8 md:mb-0 px-4">
        {aboutText.map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, translateX: 50 }}
            animate={isInView ? { opacity: 1, translateX: 0 } : {}}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.2 }}
            className={`text-lg md:text-3xl ${idx === 0 ? 'text-5xl md:text-4xl lg:text-7xl font-bold mb-4 text-center md:text-left' : 'text-center md:text-left max-w-full'}`}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
};

// Prop validation for better maintainability
AboutSection.propTypes = {
  principlesData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    })
  ),
};

export default React.memo(AboutSection); // Using React.memo to optimize performance
