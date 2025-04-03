import React, { useRef } from "react";
import WorkSection from "./WorkSection";
import OfficeSection from "./OfficeSection";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Hero from "./Hero";
import Subscription from "./Subscription";

const NotSignedIn = () => {
   // Create refs for each section
  const examplesRef = useRef(null);
  const learnMoreRef = useRef(null);
  const pricingRef = useRef(null);
  const footerRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
     <div className="min-h-screen flex flex-col">
        {/* Pass scroll function & refs to Navbar */}
        <Navbar scrollToSection={scrollToSection} refs={{ examplesRef, learnMoreRef, pricingRef, footerRef }} />
        <Hero ref={pricingRef} />
        <main className="flex-grow">
          <WorkSection ref={examplesRef} />
          <OfficeSection ref={learnMoreRef} />
<Subscription  />
        </main>
        <Footer ref={footerRef} />
      </div>
  );
};

export default NotSignedIn;
