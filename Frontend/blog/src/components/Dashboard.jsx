import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="py-4 px-6 text-center">
          <h1 className="text-2xl font-bold">My Blog Dashboard</h1>
        </div>
        <nav className="flex-1 px-6">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
              >
                <span className="mr-3">🏠</span> Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span className="mr-3">✍️</span> Write a Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span className="mr-3">📄</span> All Blogs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span className="mr-3">📊</span> Analytics
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span className="mr-3">⚙️</span> Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="py-6 text-center border-t border-gray-700">
          <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back, Admin!</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            New Post
          </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Blogs</h3>
            <p className="text-3xl font-bold text-blue-500">128</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">New Comments</h3>
            <p className="text-3xl font-bold text-green-500">32</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Page Views</h3>
            <p className="text-3xl font-bold text-purple-500">10,423</p>
          </div>
        </section>

        {/* Recent Blogs */}
        <section>
          <h3 className="text-xl font-bold mb-4">Recent Blogs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog 1 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">
                10 Tips for Better Web Design
              </h4>
              <p className="text-gray-600 text-sm">
                A quick guide to improving the user experience and aesthetics of
                your website.
              </p>
              <button className="mt-4 text-blue-500 hover:underline">
                Read More
              </button>
            </div>
            {/* Blog 2 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">
                JavaScript Tricks You Should Know
              </h4>
              <p className="text-gray-600 text-sm">
                Enhance your coding skills with these useful JavaScript tips.
              </p>
              <button className="mt-4 text-blue-500 hover:underline">
                Read More
              </button>
            </div>
            {/* Blog 3 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">
                How to Write Engaging Blogs
              </h4>
              <p className="text-gray-600 text-sm">
                Attract more readers by creating captivating blog posts.
              </p>
              <button className="mt-4 text-blue-500 hover:underline">
                Read More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
