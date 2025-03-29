import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { List, X } from "@phosphor-icons/react";
import FullLogo from "./FullLogo";

function Navbar({ scrollToSection, refs }) {
  const [isOpen, setIsOpen] = useState(false);

  // Map section names to refs
  const sections = {
    Examples: refs.examplesRef,
    "Learn More": refs.learnMoreRef,
    Pricing: refs.pricingRef,
    Footer: refs.footerRef,
  };


  const handleScroll = (section) => {
    scrollToSection(sections[section]);
    setIsOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-b from-slate-200 to-slate-100 text-white py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <FullLogo />

        <ul className="hidden md:flex space-x-6 text-lg ml-auto">
          {Object.keys(sections).map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button onClick={() => handleScroll(item)} className="hover:text-gray-300">
                {item}
              </button>
            </motion.li>
          ))}
        </ul>


        <motion.div whileTap={{ scale: 0.9 }}>
          <List color="black" size={22} onClick={() => setIsOpen(true)} />
        </motion.div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50"
          >
            <FullLogo className="absolute top-6 left-6 text-2xl font-bold" />

            <motion.div whileTap={{ scale: 0.9 }} className="absolute top-6 right-6">
              <X size={32} color="black" onClick={() => setIsOpen(false)} />
            </motion.div>


            {Object.keys(sections).map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleScroll(item)}
                className="text-2xl font-semibold py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {item}
              </motion.button>
            ))}


            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://purplenight.hyperingenious.tech", "_blank")}
              className="bg-black text-white mt-6 px-8 py-4 rounded-full font-semibold flex items-center gap-2"
            >
              Try out now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;