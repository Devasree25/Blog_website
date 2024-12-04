import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "", imageUrl: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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

  useEffect(() => {
    if (blogId) {
      const fetchSelectedBlog = async () => {
        try {
          const blogRef = doc(db, "blogs", blogId);
          const blogSnapshot = await getDoc(blogRef);
          if (blogSnapshot.exists()) {
            setSelectedBlog(blogSnapshot.data());
          } else {
            console.error("No such blog found!");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
      fetchSelectedBlog();
    }
  }, [blogId]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog.id);
    setEditData({ title: blog.title, content: blog.content, imageUrl: blog.imageUrl });
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleWriteBlogClick = () => {
    navigate("/write-blog");
  };
 


  if (selectedBlog) {
    return (
      <div className={classNames("flex min-h-screen", { "bg-black text-white": darkMode, "bg-white text-black": !darkMode })}>
        <main className="flex-1 p-8">
          <button onClick={() => navigate("/dashboard")} className="mb-4 text-blue-500">Back to Dashboard</button>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            {selectedBlog.imageUrl && (
              <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            )}
            <h1 className="text-4xl font-bold mb-6">{selectedBlog.title}</h1>
            <p className="text-lg text-gray-800">{selectedBlog.content}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={classNames("flex min-h-screen", { "bg-black text-white": darkMode, "bg-white text-black": !darkMode })}>
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
        <div className="py-6 px-4 text-center border-b border-gray-700">
          <h1 className="text-3xl font-bold mb-2">My Blog app</h1>
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
            <input
              type="text"
              name="imageUrl"
              value={editData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
            />
            <div className="flex justify-between">
              <button onClick={handleSaveClick} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
              <button onClick={handleCancelClick} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">{blog.title}</h2>
                  <button onClick={() => handleEditClick(blog)} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                </div>
                <p className="mt-2">{blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setSelectedBlog(blog)} className="text-blue-500 hover:text-blue-700">Read More</button>
                  <button onClick={() => handleDeleteClick(blog.id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
