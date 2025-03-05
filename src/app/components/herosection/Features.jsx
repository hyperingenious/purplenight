import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Read books as blogs",
      img: '/herosection-images/sharing articles-bro (1).png',
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
      img: '/herosection-images/select-pana.png',
      description:
        "Designed for time-conscious individuals, PurpleNight offers a streamlined approach to learning by curating content that matters.",
    },
    {
      title: "Quick and Easy",
      img: '/herosection-images/post-rafiki.png',
      description:
        "With PurpleNight, you can extract the essence of an entire book in just two minutes, saving you valuable time.",
    },
  ];

  return (
    <section className="text-center py-12 bg-gray-100">
      <h2 className="text-4xl font-semibold">Features of PurpleNight</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {features.map((feature, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg shadow-md">
            <img 
              src={feature.img} 
              alt={feature.title} 
              className="mx-auto" 
              style={{ height: '300px'}}
            />
            <h4 className="mt-4 text-lg font-semibold">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features
