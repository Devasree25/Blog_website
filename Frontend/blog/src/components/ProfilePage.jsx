import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-400">Software Developer</p>
            <p className="mt-2">
              📍 <span className="text-gray-300">San Francisco, CA</span>
            </p>
            <p className="mt-2">
              📧 <span className="text-gray-300">johndoe@example.com</span>
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-3">
              <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">Edit Profile</button>
              <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">Settings</button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <section className="mt-8">
          {/* Bio Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Bio</h3>
            <p className="text-gray-300">
              Hi, I’m John, a passionate software developer specializing in full-stack web development.
              I love creating impactful solutions using modern technologies like React, Node.js, and more.
            </p>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-gray-700 rounded-lg">JavaScript</span>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">React</span>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">Node.js</span>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">Tailwind CSS</span>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">Firebase</span>
              <span className="px-4 py-2 bg-gray-700 rounded-lg">SQL</span>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Created a blog on "Best Practices in Web Development"</li>
              <li>Contributed to an open-source React library</li>
              <li>Completed a project on "E-commerce with Firebase"</li>
              <li>Attended the JavaScript Conference 2024</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
