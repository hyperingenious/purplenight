import { SignUpButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export default function Hero({ref}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-100 text-white">
      <div className="max-w-[1152px] container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
          >
            <h1
              style={{ fontFamily: "Poppins" }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">Purplenight, </span>
               <span className="text-gray-800">

               the balance of reading and 
               </span>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500"> AI</span>
            </h1>
            <p className="text-lg text-gray-800 mb-8">
              Purplenight has got it—the balance between book reading and AI without compromising knowledge.
            </p>
            <div className="flex flex-wrap gap-4">
                <SignUpButton type='modal'>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                Try out now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
                </SignUpButton>

              <motion.button
              ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 text-black border-black px-8 py-4 rounded-full font-semibold hover:bg-purple-400/10 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }
            }}
            className="relative"
          >
            <img
              src="https://atlasti.com/media/pages/guides/literature-review/literature-review-overview/61f7527c48-1739281542/literature-review-objectives-of-lr-atlas.ti-patrick-tomasso.jpg"
              alt="Digital Innovation"
              className="rounded-2xl shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl p-6 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-3 rounded-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-black">
                    Loved by Avid Readers.
                  </p>
                  <p className="text-sm text-black">People enjoy reading it.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}