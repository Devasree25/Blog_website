import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (isAuthenticated) {
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

      fetchBlogs();
    }
  }, [isAuthenticated]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog.id);
    setEditData({ title: blog.title, content: blog.content });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const blogRef = doc(db, "blogs", editingBlog);
      await updateDoc(blogRef, editData);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editingBlog ? { ...blog, ...editData } : blog
        )
      );
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-lg mt-2">Welcome to your blog manager</p>
        </div>
        <nav className="flex flex-col space-y-4">
          <button className="text-white py-2 px-4 hover:bg-blue-700 rounded-md">Dashboard</button>
          <button className="text-white py-2 px-4 hover:bg-blue-700 rounded-md">Manage Blogs</button>
          <button className="text-white py-2 px-4 hover:bg-blue-700 rounded-md">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {!isAuthenticated ? (
          <div className="flex justify-center items-center h-full">
            <h2 className="text-2xl font-semibold text-gray-800">Please log in to view the dashboard</h2>
          </div>
        ) : editingBlog ? (
          <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h2>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Title"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleInputChange}
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Content"
              rows="6"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back, {user?.displayName || "Admin"}!</h2>
              <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
                Logout
              </button>
            </header>
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Blogs</h3>
              {loading ? (
                <p className="text-gray-600">Loading blogs...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{blog.title}</h4>
                      <p className="text-gray-600 text-sm">{blog.content}</p>
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="mt-4 text-blue-500 hover:underline transition duration-200"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
