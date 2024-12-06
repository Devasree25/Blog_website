import React from "react";
import { useNavigate } from "react-router-dom";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">TechVerse Blog</h1>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => navigate("/blogs")}
                className="hover:text-gray-300 transition"
              >
                Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-gray-300 transition"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/Contact")}
                className="hover:text-gray-300 transition"
              >
                Contact us
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="bg-cover bg-center text-white py-20 px-4 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Your Gateway to Tech Insights
          </h1>
          <p className="text-lg mb-6">
            Discover in-depth articles, tutorials, and resources to fuel your
            tech passion.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Reading
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose TechVerse Blog?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Expert Writers"
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Expert Writers</h3>
              <p className="text-gray-600">
                Learn from industry experts sharing real-world experiences and
                insights.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
  <img
    src="https://images.unsplash.com/photo-1517430816045-df4b7de8f3f2"
    alt="Diverse Topics"
    className="h-40 w-full object-cover rounded-md mb-4"
  />
  <h3 className="text-xl font-semibold mb-2">Diverse Topics</h3>
  <p className="text-gray-600">
    Explore a wide range of tech-related subjects, from AI to programming.
  </p>
</div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://images.unsplash.com/photo-1556761175-129418cb2dfe"
                alt="Community Engagement"
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
              <p className="text-gray-600">
                Connect with fellow tech enthusiasts and share your thoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Blogs Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Popular Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                alt="Understanding AI"
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Understanding AI</h3>
              <p className="text-gray-600">
                An in-depth look at the basics and potential of artificial
                intelligence.
              </p>
              <button
                onClick={() => navigate("/blogs/ai-basics")}
                className="text-blue-600 hover:underline mt-2"
              >
                Read More
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Mastering JavaScript"
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Mastering JavaScript</h3>
              <p className="text-gray-600">
                Tips and tricks for becoming a proficient JavaScript developer.
              </p>
              <button
                onClick={() => navigate("/blogs/js-tips")}
                className="text-blue-600 hover:underline mt-2"
              >
                Read More
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="https://images.unsplash.com/photo-1505685296765-3a2736de412f"
                alt="Web Development Trends"
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Web Development Trends</h3>
              <p className="text-gray-600">
                Stay updated with the latest web development tools and
                techniques.
              </p>
              <button
                onClick={() => navigate("/blogs/web-trends")}
                className="text-blue-600 hover:underline mt-2"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About TechVerse Blog</h4>
            <p className="text-sm text-gray-400">
              TechVerse Blog is your go-to source for tech insights, tutorials, and resources.
              Join our community of passionate tech enthusiasts!
            </p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with the latest articles and trends in the tech world.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 rounded-lg font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="hover:text-gray-300 transition"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
              </a>
              <a
                href="https://www.twitter.com"
                className="hover:text-gray-300 transition"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com"
                className="hover:text-gray-300 transition"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                className="hover:text-gray-300 transition"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400 mb-4">
            © 2024 TechVerse Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default LandingPage;
