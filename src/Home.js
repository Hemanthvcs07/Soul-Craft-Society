// Home.js
import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProgramsSection from "./components/ProgramsSection";
import GetInvolvedSection from "./components/GetInvolvedSection";
import DonateSection from "./components/DonateSection";
import ContactForm from "./components/ContactForm";

const Home = () => {
  return (
    <div className="text-gray-800 min-h-screen overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <GetInvolvedSection />
      <DonateSection />
      <ContactForm />
    </div>
  );
};

export default Home;
