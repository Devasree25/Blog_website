import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-6">
      {/* Back to Landing Page Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="text-white text-3xl hover:text-green-500 transition duration-300"
        >
          &#8592; {/* Left Arrow symbol */}
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-gray-800 shadow-2xl rounded-xl max-w-5xl mx-auto p-10">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8">
          About Us
        </h1>

        {/* Introduction Section */}
        <div className="text-lg text-white mb-12">
          <p className="mb-6 text-center">
            Welcome to our blog! We're a vibrant community of creators, developers, and thinkers dedicated to bringing you top-notch insights, tools, and resources across various domains.
          </p>
          <p className="text-center">
            Whether you're here to learn something new, stay updated, or get inspired, we're thrilled to have you with us.
          </p>
        </div>

        {/* Our Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=100&h=100"
                  alt="Emily White"
                  className="rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Emily White</h3>
              <p className="text-sm text-gray-300">Lead Developer & Writer</p>
              <p className="mt-2 text-gray-300">
                Emily White loves coding and is on a mission to simplify complex tech concepts for everyone.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=faces&fit=crop&w=100&h=100"
                  alt="Jane Smith"
                  className="rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-white">Jane Smith</h3>
              <p className="text-sm text-gray-300">Content Strategist & Writer</p>
              <p className="mt-2 text-gray-300">
                Jane creates engaging, research-driven content that keeps you informed and inspired.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div>
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-white text-center">
            We believe in the power of community and knowledge-sharing. Our mission is to create a platform where people can explore ideas, get inspired, and engage with content that matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
