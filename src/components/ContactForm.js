import React, { useState, useRef, useCallback } from "react";
import emailjs from "emailjs-com";
import { motion, useInView } from "framer-motion";

// ContactForm component using default parameters instead of defaultProps
const ContactForm = React.memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  // Handle input changes
  const handleChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(""); // Reset error on input change
  }, []);

  // Reset form fields
  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  }, []);

  // Handle form submission and send email
  const sendEmail = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(""); // Reset error before sending
      setSuccess(""); // Reset success message
      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formData,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
        setSuccess("Message sent successfully!");
        resetForm();
      } catch (error) {
        setError("An error occurred, please try again.");
        console.error("Error sending email:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, resetForm]
  );

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  const inputAnimationProps = {
    initial: { opacity: 0, x: -20 },
    animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  return (
    <section
      id="contact"
      className="p-8 md:p-12 lg:p-16 max-w-3xl mx-auto h-screen flex items-center"
    >
      <div ref={formRef} className="w-full">
        <motion.h2
          {...animationProps}
          className="text-5xl md:text-4xl lg:text-7xl font-bold mb-8 text-center text-white"
        >
          Contact Us
        </motion.h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <motion.form onSubmit={sendEmail} className="flex flex-col space-y-3">
          {["name", "email", "phone", "subject", "message"].map(
            (field, index) =>
              field !== "message" ? (
                <motion.input
                  key={field}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  placeholder={`Your ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
                  {...inputAnimationProps}
                  transition={{
                    ...inputAnimationProps.transition,
                    delay: index * 0.2,
                  }}
                />
              ) : (
                <motion.textarea
                  key={field}
                  name={field}
                  placeholder="Your Message"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded h-32 focus:outline-none focus:ring focus:ring-blue-400 resize-none"
                  {...inputAnimationProps}
                  transition={{
                    ...inputAnimationProps.transition,
                    delay: index * 0.2,
                  }}
                />
              )
          )}
          <motion.button
            type="submit"
            className={`bg-blue-600 text-white py-2 rounded transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={
              !isLoading
                ? { scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }
                : {}
            }
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
});

export default ContactForm;
