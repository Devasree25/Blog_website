import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { db } from "./../Firebase/Firebase"; // Firebase configuration import
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // List of all blogs
  const [selectedBlog, setSelectedBlog] = useState(null); // Selected blog for details view
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook to navigate between routes

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
    setSelectedBlog(blog); 
  };

  // Navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Close the modal popup
  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 relative">
        <button
          onClick={handleBackToDashboard}
          className="text-blue-500 hover:text-blue-700 mb-4"
        >
          &larr; Back to Dashboard
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
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

        {selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-800 rounded-full w-8 h-8 flex justify-center items-center"
              >
                &times;
              </button>
              <h1 className="text-4xl font-bold mb-4">{selectedBlog.title}</h1>
              <p>{selectedBlog.content}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Blogs;
