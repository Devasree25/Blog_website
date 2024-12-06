import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase"; // Firebase configuration import
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom"; // For navigation

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []); // Empty dependency array means this will run only once when the component mounts

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); // Navigate to the detailed blog page
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Blogs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.length === 0 ? (
              <p className="text-lg text-gray-300">No blogs available</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white p-6 rounded-lg shadow-lg relative"
                >
                  <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
                  <p className="mt-2 text-gray-700">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => handleReadMore(blog.id)}
                    className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700"
                  >
                    Read More
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
