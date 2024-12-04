import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation
import classNames from "classnames"; // For conditionally applying classnames

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state
  const auth = getAuth();
  const navigate = useNavigate(); // Use this for navigation

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Listen for auth state changes
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

  // Fetch blogs when authenticated
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

  // Edit blog functionality
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

  // Delete blog functionality
  const handleDeleteClick = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to the landing page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Navigate to Write Blog page
  const handleWriteBlogClick = () => {
    navigate("/write-blog"); // Navigate to Write Blog page
  };

  return (
    <div className={classNames("flex min-h-screen", { "bg-black text-white": darkMode, "bg-white text-black": !darkMode })}>
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
        <div className="py-6 px-4 text-center border-b border-gray-700">
          <h1 className="text-3xl font-bold mb-2">My Blog app </h1>
          <p className="text-sm font-light">Your personal blog dashboard</p>
        </div>
        <nav className="mt-10 space-y-4 px-4">
          <button className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition" onClick={toggleDarkMode}>
            <span>🌙</span> <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button onClick={handleWriteBlogClick} className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition">
            <span>📝</span> <span>Write a Blog</span>
          </button>
          <button className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition">
            <span>⚙️</span> <span>Settings</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition">
            <span>🚪</span> <span>Logout</span>
          </button>
        </nav>
        <div className="mt-auto py-4 text-center text-sm text-gray-400 border-t border-gray-700">
          <p>© 2024 Blog Manager</p>
          <p>Crafted with 💙</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {!isAuthenticated ? (
          <div className="flex justify-center items-center h-full">
            <h2 className="text-2xl font-semibold">Please log in to view the dashboard</h2>
          </div>
        ) : editingBlog ? (
          <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Title"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Blog Content"
              rows="6"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Welcome Back, {user?.displayName || "Admin"}!</h2>
            </header>
            <section>
              <h3 className="text-2xl font-semibold mb-6">Recent Blogs</h3>
              {loading ? (
                <p>Loading blogs...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
                      <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
                      <p className="text-gray-400 text-sm">{blog.content}</p>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="text-yellow-500 hover:text-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(blog.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
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
