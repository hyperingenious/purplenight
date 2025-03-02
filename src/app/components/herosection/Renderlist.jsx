import React from "react";
import Footer from "../components/Footer.jsx";
import Features from "./Features.jsx";
import Navbar from "./Navbar.jsx";
import Image1section from "./Image1section.jsx";
import Image2section from "./Image2section.jsx";
import Headersection from "./Headersection.jsx";

const PurpleNight = () => {
  return (
    <div className="font-spectral min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
     {/*header section*/}
      <Headersection />
      {/* Features */}
      <Features />
      {/* Call to Action */}
      <Image1section/>
      <Image2section />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PurpleNight;
