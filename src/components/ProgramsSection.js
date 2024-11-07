import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Array of program data
const programs = [
  {
    title: "Healthy Horizons",
    slogan: "Join us as we bring healthcare directly to underserved communities.",
    description:
      "We deliver essential healthcare services to areas with limited access, promoting well-being and preventing diseases through medical support, health check-ups, and awareness programs.",
    image: "https://i.pinimg.com/564x/49/37/27/493727c8a3c48102359c181173600f6f.jpg",
  },
  {
    title: "Green Guardians",
    slogan: "Be a part of our movement for a greener, cleaner future!",
    description:
      "Involves tree planting, clean-up drives, and educational workshops to promote sustainable practices for a healthier planet.",
    image: "https://img.freepik.com/free-vector/gradient-people-planting-tree-illustration_23-2149202056.jpg",
  },
  {
    title: "Harvest Heartbeat",
    slogan: "Hunger knows no bounds, but together, we can make a difference!",
    description:
      "Organizing food drives, meal distribution, and nutrition programs to support individuals and families facing food insecurity.",
    image: "https://img.freepik.com/free-vector/tiny-people-standing-near-box-donation-food-delivery-volunteers-giving-healthy-grocery-goods-charity-flat-vector-illustration-social-support-humanitarian-help-community-sharing-concept_74855-21023.jpg",
  },
  {
    title: "Learning Leap",
    slogan: "Every child deserves the opportunity to learn and grow!",
    description:
      "Providing educational support, tutoring, school supplies, and enrichment activities to help young minds reach their full potential.",
    image: "https://i.pinimg.com/564x/98/d4/52/98d452adcf607009db4df32200ad5332.jpg",
  },
];

const ProgramsSection = () => {
  const programsRef = useRef(null);
  const isInView = useInView(programsRef, { once: true });

  return (
    <section id="programs" className="flex flex-col justify-center min-h-screen max-w-full mx-auto px-4 py-8">
      {/* Heading for Programs section */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-4xl lg:text-7xl font-bold mb-8 text-center text-white"
      >
        Our Programs
      </motion.h2>

      {/* Programs list */}
      <div ref={programsRef} className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {programs.map((program, index) => (
          <ProgramCard key={program.title} program={program} index={index} isInView={isInView} />
        ))}
      </div>
    </section>
  );
};

// ProgramCard component refactored for clarity and performance
const ProgramCard = ({ program, index, isInView }) => {
  const { title, slogan, description, image } = program;

  return (
    <motion.div
      className="relative backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 overflow-hidden flex flex-col items-center"
      initial={{ opacity: 0, translateY: 50 }}
      animate={isInView ? { opacity: 1, translateY: 0 } : {}}
      transition={{ delay: index * 0.3, duration: 0.8, ease: "easeInOut" }}
      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Program Thumbnail Image */}
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />

      {/* Program Details */}
      <div className="text-center text-white">
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-lg italic mb-4">"{slogan}"</p>
        <p className="text-base">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProgramsSection;
