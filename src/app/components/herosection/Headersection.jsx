import React from 'react';

const Headersection = () => {
  return (
    <div>
      <section style={{ display: 'flex', flexDirection: 'column', marginTop: '0', padding: '2rem', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', textAlign: 'left', flex: 1 }}>
          <h1 style={{ fontSize: '7vw', fontWeight: 'bold', marginBottom: '2.5rem' }}>PURPLENIGHT</h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            PurpleNight transforms how you consume knowledge. Using advanced AI, it distills entire books into concise, blog-style summaries, perfect for busy professionals and learners. No fluff—just the most impactful insights. In minutes, you grasp the core ideas, making PurpleNight your go-to resource for efficient, focused learning. Stay informed, save time, and absorb meaningful content effortlessly.
          </p>
        </div>
        <div style={{ width: '33.3333%', marginTop: '0', flex: 1 }}>
          <img src={'/herosection-images/image.png'} alt="PurpleNight" style={{ width: '100%', borderRadius: '0.5rem' }} />
        </div>
      </section>

    </div>
  )
}

export default Headersection
