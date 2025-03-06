import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Read books as blogs",
      img: '/herosection-images/Sharing articles-bro (1).png',
      description:
        "PurpleNight revolutionizes the way you consume knowledge by converting full-length books into concise, well-structured blog posts.",
    },
    {
      title: "AI-Powered Summaries",
      img: '/herosection-images/Artificial intelligence-amico.png',
      description:
        "Utilizing advanced AI technology, PurpleNight distills books into their most valuable elements by focusing on core ideas.",
    },
    {
      title: "Focused and Efficient",
      img: '/herosection-images/Select-pana.png',
      description:
        "Designed for time-conscious individuals, PurpleNight offers a streamlined approach to learning by curating content that matters.",
    },
    {
      title: "Quick and Easy",
      img: '/herosection-images/Post-rafiki.png',
      description:
        "With PurpleNight, you can extract the essence of an entire book in just two minutes, saving you valuable time.",
    },
  ];

  return (
    <section style={{textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', backgroundColor: '#f3f4f6'}}>
      <h2 style={{fontSize: '2.25rem', fontWeight: '600'}}>Features of PurpleNight</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', padding: '2rem',  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
        {features.map((feature, idx) => (
          <div key={idx} style={{padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
            <img 
              src={feature.img} 
              alt={feature.title} 
              style={{ display: 'block', margin: '0 auto', height: '300px', maxWidth: '100%'}} 
            />
            <h4 style={{marginTop: '1rem', fontSize: '1.125rem', fontWeight: '600'}}>{feature.title}</h4>
            <p style={{fontSize: '0.875rem', color: '#6B7280'}}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features
