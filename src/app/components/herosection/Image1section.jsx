import React from 'react';
const image1section = () => {
  return (
    <div>
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', gap: '1rem',  width: '100%' }}>
              <div style={{ width: '100%', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Take Claude with you</h2>
                <p style={{ marginTop: '0.25rem', marginBottom: '0.25rem', padding: '0.5rem', }}>Talk to Claude, anywhere you go. Brainstorm ideas, get answers, and analyze images on the go. The Claude apps put the power of frontier intelligence in your back pocket.</p>
              </div>
              <div style={{ width: '100%', margin: '0 auto' }}>
                <img src={'/herosection-images/first.png'} alt="Claude AI" style={{ width: '100%', borderRadius: '0.5rem' }} />
              </div>
            </section>
    </div>
  )
}

export default image1section;
