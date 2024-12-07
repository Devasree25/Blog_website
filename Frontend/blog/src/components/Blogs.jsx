import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase"; // Firebase configuration import
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // List of all blogs
  const [selectedBlog, setSelectedBlog] = useState(null); // Selected blog for details view
  const [loading, setLoading] = useState(true);

  // Fetch all blogs from Firebase
  const fetchBlogs = async () => {
    try {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle "Read More" to show blog details
  const handleReadMore = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
  };

  // Handle "Back" to return to the blog list
  const handleBack = () => {
    setSelectedBlog(null); // Reset the selected blog
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8">
        {loading ? (
          <p>Loading...</p>
        ) : selectedBlog ? (
          // Detailed View
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleBack}
              className="text-blue-500 hover:text-blue-700 mb-4"
            >
              &larr; Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedBlog.title}
            </h1>
            <p className="text-gray-700">{selectedBlog.content}</p>
          </div>
        ) : (
          // List View
          <>
            <h1 className="text-3xl font-bold text-gray-100 mb-6">Blogs</h1>
            {blogs.length === 0 ? (
              <p className="text-lg text-gray-300">No blogs available</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white p-6 rounded-lg shadow-lg relative"
                  >
                    <h2 className="text-xl font-bold text-gray-900">
                      {blog.title}
                    </h2>
                    <p className="mt-2 text-gray-700">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <button
                      onClick={() => handleReadMore(blog)}
                      className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blogs;
