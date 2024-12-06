import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-6">
      {/* Arrow Button for Landing Page */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")} // Navigates to the home page
          className="text-white text-3xl hover:text-indigo-600 transition duration-300"
        >
          &#8592; {/* Left Arrow symbol */}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
          About Us
        </h1>
        <div className="text-lg text-gray-800">
          <p className="mb-6">
            Welcome to our blog! We are a passionate team of writers, developers, and creatives dedicated to sharing knowledge and insights that make a positive impact. We cover topics ranging from tech and finance to lifestyle and personal development.
          </p>
          <p className="mb-6">
            Our mission is simple: provide insightful, engaging, and informative content that inspires our readers to learn, grow, and discover new ideas.
          </p>
          <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-4">Our Team</h2>
          <ul className="space-y-4 mb-6">
            <li>
              <strong className="text-gray-800">John Doe:</strong> Lead Developer & Writer. Passionate about coding and simplifying complex tech concepts.
            </li>
            <li>
              <strong className="text-gray-800">Jane Smith:</strong> Content Strategist & Writer. Enjoys creating engaging, research-driven content.
            </li>
            <li>
              <strong className="text-gray-800">Emily White:</strong> Designer & Developer. Loves translating ideas into beautiful, functional designs with React and Tailwind CSS.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Vision</h2>
          <p>
            We believe in the power of community and knowledge-sharing. Our goal is to build a platform where people can explore ideas, get inspired, and engage with content that matters to them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
