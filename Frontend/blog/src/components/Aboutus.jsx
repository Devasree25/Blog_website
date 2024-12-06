import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">About Us</h1>
        <div className="text-lg text-gray-700">
          <p className="mb-4">
            Welcome to our blog! We are a team of passionate writers, developers, and creatives who believe in sharing knowledge and experiences to make the world a better place. Our blog covers a variety of topics, ranging from tech, finance, lifestyle, to personal development.
          </p>
          <p className="mb-4">
            Our mission is to provide insightful content that is both informative and engaging for our readers. We aim to create a space where people can learn, grow, and be inspired.
          </p>
          <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-4">Our Team</h2>
          <ul className="space-y-3">
            <li>
              <strong>John Doe:</strong> Lead Developer & Writer. Passionate about coding and sharing tech tips.
            </li>
            <li>
              <strong>Jane Smith:</strong> Content Strategist & Writer. Enjoys researching and creating engaging content.
            </li>
            <li>
              <strong>Emily White:</strong> Designer & Developer. Loves bringing designs to life with React and Tailwind.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-4">Our Vision</h2>
          <p>
            We believe in the power of knowledge and community. Our goal is to build a platform where people can explore ideas, get inspired, and engage with content that matters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
