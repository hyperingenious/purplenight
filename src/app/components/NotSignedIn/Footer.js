import React from "react";
import FullLogo from "./FullLogo";

function Footer({ref}) {
  return (
      <footer ref={ref} id="footer" className="bg-black text-white py-12 px-6">
        <div className="flex justify-center items-center ">
<FullLogo/>

        </div>
      <div className="text-gray-500 text-sm text-center mt-8">
        © 2025 Purplenight. All rights reserved.
      </div>
      </footer>
  );
}

export default Footer;
