import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

function OfficeSection({ ref }) {
  return (
    <section ref={ref} id="office" className="py-16 px-6 bg-stone-100">
      <div className="flex flex-col gap-16 max-w-6xl mx-auto">
        
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div variants={fadeIn} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://viqwjhprxs3j5sad.public.blob.vercel-storage.com/1-M27n3PaVEG4Z7Xb8TYpkh5D3AdXzIn.png"
              alt="Modern office space with a professional environment"
              className="w-full h-72 object-cover"
            />
          </motion.div>
          <motion.div variants={fadeIn} className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Purplenight has got it.
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Ever wondered how much more you end up reading if you could read
              your books in the traffic.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Systematically chosen blog with AI made out of your favourite books.
            </p>
          </motion.div>
        </motion.div>

        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div variants={fadeIn} className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to use?</h2>
            <p className="text-gray-700 text-lg mb-4">
              Using Purplenight involves just simple steps.
            </p>
            <ol className="text-gray-700 text-lg ml-6 mb-4 list-decimal">
              <li>Choose your favourite book PDF.</li>
              <li>Select number of blogs you like to read.</li>
              <li>Click Generate.</li>
              <li>Wait a bit..</li>
            </ol>
          </motion.div>
          <motion.div variants={fadeIn} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://viqwjhprxs3j5sad.public.blob.vercel-storage.com/1-aUbQpYSnbs3cGSFnXEpswndRI1ivbZ.png"
              alt="Modern office space with a professional environment"
              className="w-full h-72 object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default OfficeSection;