import React from 'react';
const image2section = () => {
  return (
    <div>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '1rem', width: '100%',  justifyContent: 'center'}}>
        <div style={{ width: '100%', margin: '0 auto', maxWidth: '500px' }}>
          <img src={'/herosection-images/first.png'} alt="Claude AI" style={{ width: '100%', borderRadius: '0.5rem' }} />
        </div>
        <div style={{ width: '100%', margin: '0 auto', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Take Claude with you</h2>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}>Talk to Claude, anywhere you go. Brainstorm ideas, get answers, and analyze images on the go. The Claude apps put the power of frontier intelligence in your back pocket.</p>
        </div>
      </section>
    </div>
  )
}

export default image2section
