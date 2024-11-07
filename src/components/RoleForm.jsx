import React, { useState } from "react";

const RoleForm = ({ role, onClose }) => {
  // Single state to hold form data including name, email, and role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: role.roleName,  // Defaulting role to the selected role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", role: role.roleName }); // Reset form data after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">{role.roleName}</h2>
        <p className="text-center text-gray-500 mb-4">{role.description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Application
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
