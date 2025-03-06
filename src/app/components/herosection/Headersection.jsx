import React from 'react';

const Headersection = () => {
  return (
    <div>
       <section className="flex flex-col md:flex-row mt-0 p-8 gap-x-40 pt-0">
              <div className="md:w-1/2   md:text-left">
                <h1 className="text-6xl mt-20 font-bold">PURPLENIGHT</h1>
                <p className="mt-10 text-lg ">
                  PurpleNight transforms how you consume knowledge. Using advanced AI, it distills entire books into concise, blog-style summaries, perfect for busy professionals and learners. No fluff—just the most impactful insights. In minutes, you grasp the core ideas, making PurpleNight your go-to resource for efficient, focused learning. Stay informed, save time, and absorb meaningful content effortlessly.
                </p>
              </div>
              <div className="md:w-1/3 mt-0">
                <img src={'/herosection-images/image.png'} alt="PurpleNight" className="w-full rounded-lg" />
              </div>
            </section>
      
    </div>
  )
}

export default Headersection
