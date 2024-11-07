import React, { useState } from "react";
import { motion } from "framer-motion";

const TeamUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    skills: "",
    availability: "",
    motivation: "",
    isAgree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const skillOptions = [
    "Community Outreach",
    "Fundraising",
    "Event Planning",
    "Marketing",
    "Graphic Design",
    "Technical Support",
  ];

  return (
    <motion.div
      className="max-w-xs sm:max-w-md md:max-w-lg mx-auto p-4 bg-white bg-opacity-80 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxHeight: "85vh" }} // Adjusts the height on small screens
    >
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
        Volunteer Registration
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Skills */}
        <div>
          <select
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select your skills...</option>
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <input
            type="number"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Hours per week"
            min="1"
            max="40"
            required
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Motivation */}
        <div className="md:col-span-2">
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            placeholder="Why do you want to volunteer?"
            required
            className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            id="isAgree"
            name="isAgree"
            checked={formData.isAgree}
            onChange={handleChange}
            required
            className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          />
          <label htmlFor="isAgree" className="ml-2 text-sm sm:text-base text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={!formData.isAgree}
            className={`w-full py-2 text-white font-semibold rounded-md text-sm sm:text-base ${
              formData.isAgree ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Registration
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TeamUp;
