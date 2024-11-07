import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import RoleForm from "./RoleForm";

// Role data
const roles = [
  {
    roleName: "Education Mentor",
    description: "Provide academic guidance and support to underprivileged students.",
    imageUrl: "https://i.pinimg.com/564x/01/6a/e8/016ae88e4d3ee471aba09ad3499aedfd.jpg",
  },
  {
    roleName: "Social Media Liaison",
    description: "Boost our online presence by creating engaging content.",
    imageUrl: "https://i.pinimg.com/564x/46/c6/e4/46c6e4c345e97ebb3b46a69f9760f1a8.jpg",
  },
  {
    roleName: "Event Coordinator",
    description: "Organize impactful fundraising events and manage logistics.",
    imageUrl: "https://i.pinimg.com/564x/7c/10/f2/7c10f22e65623d455b8c218ba2866496.jpg",
  },
  {
    roleName: "Content Writer",
    description: "Craft compelling narratives that highlight our mission.",
    imageUrl: "https://i.pinimg.com/564x/83/4c/79/834c79a93e07da06e010dc4bd3c85a0b.jpg",
  },
];

// RoleCard component for individual roles
const RoleCard = ({ role, onBecomeClick, onHover }) => (
  <motion.div
    className="w-full max-w-xs h-96 flex flex-col items-center justify-center rounded-lg shadow-lg text-white my-6 overflow-hidden backdrop-blur-md bg-white bg-opacity-30"
    initial={{ opacity: 0, x: 0 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <img
      src={role.imageUrl}
      alt={role.roleName}
      className="w-40 h-40 mb-4 rounded-full shadow-md object-cover transform transition-all duration-300 ease-in-out hover:scale-105"
    />
    <h2 className="text-xl font-bold">{role.roleName}</h2>
    <p className="text-base mt-2 text-center px-4">{role.description}</p>
    <button
      className="mt-4 bg-white/20 text-white py-2 px-4 rounded-lg shadow-md hover:bg-white/30 transition"
      aria-label={`Become a volunteer as ${role.roleName}`}
      onClick={() => onBecomeClick(role)}
    >
      Become
    </button>
  </motion.div>
);

const GetInvolvedSection = () => {
  const programsRef = useRef(null);
  const isInView = useInView(programsRef, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleBecomeClick = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  // Change role index every 3 seconds unless hovering
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup interval
  }, [isHovered]);

  // Handle navigation
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % roles.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + roles.length) % roles.length);

  return (
    <section
      id="get-involved"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-8 lg:h-screen"
      ref={programsRef}
    >
      <div className="text-white w-full md:w-1/2 flex flex-col items-center md:items-start mb-8 md:mb-0 px-4">
        <motion.h2
          initial={{ opacity: 0, translateX: 50 }}
          animate={isInView ? { opacity: 1, translateX: 0 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-5xl md:text-4xl lg:text-7xl font-bold mb-4 text-center md:text-left"
        >
          Get Involved
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, translateX: 50 }}
          animate={isInView ? { opacity: 1, translateX: 0 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          className="text-lg md:text-3xl mb-4 text-center md:text-left max-w-full"
        >
          Hello, change-makers! 🌱 At Soul Craft Society, we believe each of you
          has a unique gift to make a real difference. Find the role that
          matches your strengths, and let’s build a brighter tomorrow together.
        </motion.p>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
        <motion.div
          className="w-full flex justify-center items-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -100) goToNext();
            if (offset.x > 100) goToPrev();
          }}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <RoleCard
              role={roles[currentIndex]}
              onHover={setIsHovered}
              onBecomeClick={handleBecomeClick}
            />
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-4 space-x-2">
          {roles.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-4 h-4 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-500"}`}
              aria-label={`Navigate to ${roles[i].roleName} role`}
            ></button>
          ))}
        </div>
      </div>

      {showModal && <RoleForm role={selectedRole} onClose={handleCloseModal} />}
    </section>
  );
};

export default GetInvolvedSection;
