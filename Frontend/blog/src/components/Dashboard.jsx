import React, { useState, useEffect, useCallback, useMemo } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

const Dashboard = React.memo(() => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "", imageUrl: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const fetchBlogs = useCallback(async () => {
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
  }, []);

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
    if (isAuthenticated) fetchBlogs();
  }, [isAuthenticated, fetchBlogs]);

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

  const handleEditClick = useCallback((blog) => {
    setEditingBlog(blog.id);
    setEditData({ title: blog.title, content: blog.content, imageUrl: blog.imageUrl });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSaveClick = useCallback(async () => {
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
  }, [editingBlog, editData]);

  const handleCancelClick = useCallback(() => {
    setEditingBlog(null);
  }, []);

  const handleDeleteClick = useCallback(
    async (id) => {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the blog. Please try again.");
      }
    },
    [setBlogs]
  );

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [auth, navigate]);

  const handleWriteBlogClick = useCallback(() => {
    navigate("/write-blog");
  }, [navigate]);

  const renderedBlogs = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-black">
                {blog.title}
              </h2>
              <button
                onClick={() => handleEditClick(blog)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
            <p className="mt-2">{blog.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedBlog(blog)}
                className="text-blue-500 hover:text-blue-700"
              >
                Read More
              </button>
              <button
                onClick={() => handleDeleteClick(blog.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [blogs, handleEditClick, handleDeleteClick]);

  if (selectedBlog) {
    return (
      <div className="flex min-h-screen bg-white text-black">
        <main className="flex-1 p-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-blue-500"
          >
            Back to Dashboard
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            {selectedBlog.imageUrl && (
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h1 className="text-4xl font-bold mb-6">{selectedBlog.title}</h1>
            <p className="text-lg text-gray-800">{selectedBlog.content}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
        <div className="py-6 px-4 text-center border-b border-gray-700">
          <h1 className="text-3xl font-bold mb-2">TechVerse Blog</h1>
          <p className="text-sm font-light">Your personal blog dashboard</p>
        </div>
        <nav className="mt-10 space-y-4 px-4">
          <button
            onClick={handleWriteBlogClick}
            className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition"
          >
            <span>📝</span> <span>Write a Blog</span>
          </button>
          <button className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition">
            <span>⚙️</span> <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 px-4 text-left hover:bg-gray-700 rounded-lg transition"
          >
            <span>🚪</span> <span>Logout</span>
          </button>
        </nav>
        <div className="mt-auto py-4 text-center text-sm text-gray-400 border-t border-gray-700">
          <p>© 2024 TechVerse Blog</p>
          <p>Crafted with 💙</p>
        </div>
      </aside>
      <main className="flex-1 p-8">{loading ? <p>Loading...</p> : renderedBlogs}</main>
    </div>
  );
});

export default Dashboard;
