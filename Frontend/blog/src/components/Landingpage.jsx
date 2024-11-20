import React from "react";

const LandingPage = () => {
  return (
    <div className="font-sans bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Blog App</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:underline">
                Register
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gray-900 text-white py-20 px-8 lg:px-20 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Bold Ideas for Tech Enthusiasts
          </h1>
          <p className="text-lg font-light mb-6">
            Explore the latest trends, guides, and insights in the world of technology. Dive into articles crafted for learners and professionals alike.
          </p>
          <button className="py-3 px-7 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2">
          {/* Image removed from Hero Section */}
        </div>
      </header>

      {/* Central Section */}
      <section className="text-center py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold mb-4">Discover, Learn, and Grow</h2>
        <p className="text-gray-600 text-lg font-light mb-12">
          We bring you well-researched articles, tutorials, and resources to help you master the world of technology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              src="https://htmlburger.com/blog/wp-content/uploads/2023/04/modern-website-design-examples.jpg"
              alt="Feature 1"
              className="mb-4 rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Modern Web Design</h3>
            <p className="text-gray-600 text-base">
              Learn the latest in web design and create stunning user interfaces.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              src="https://strengthandconditioningeducation.com/wp-content/uploads/2022/03/Programming-Mastery-1.png"
              alt="Feature 2"
              className="mb-4 rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Programming Mastery</h3>
            <p className="text-gray-600 text-base">
              Enhance your coding skills with practical guides and examples.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              src="https://i0.wp.com/www.quytech.com/blog/wp-content/uploads/2023/11/Top-Technology-Trends-in-2024.webp?w=1437&ssl=1"
              alt="Feature 3"
              className="mb-4 rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Tech Trends</h3>
            <p className="text-gray-600 text-base">
              Stay updated with the latest trends in the tech world.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6 text-center rounded-lg shadow-lg">
        <p className="text-sm font-light">© 2024 My Blog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
