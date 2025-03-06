import React from 'react';
const image1section = () => {
  return (
    <div>
    <section className="flex flex-col md:flex-row items-center p-8  gap-10">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold">Take Claude with you</h2>
                <p className="mt-4 mb-3  py-2 ">Talk to Claude, anywhere you go. Brainstorm ideas, get answers, and analyze images on the go. The Claude apps put the power of frontier intelligence in your back pocket.</p>
              </div>
              <div className="md:w-1/2">
                <img src={'/herosection-images/first.png'} alt="Claude AI" className="w-full rounded-lg" />
              </div>
            </section>
    </div>
  )
}

export default image1section;
