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
  const [editData, setEditData] = useState({ title: "", content: "" });
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
    setEditData({ title: blog.title, content: blog.content });
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
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md relative">
            <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
            <p className="mt-2 text-gray-700">{blog.content.substring(0, 100)}...</p>
            
            {/* Edit Button placed at the bottom-right corner */}
            <button
              onClick={() => handleEditClick(blog)}
              className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedBlog(blog)}
                className="text-blue-500 hover:text-blue-700"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [blogs, handleEditClick]);

  if (editingBlog) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white">
        <main className="flex-1 p-8">
          <button onClick={handleCancelClick} className="mb-4 text-blue-500">
            Cancel
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Edit Blog</h1>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Title"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Content"
            />
            <button
              onClick={handleSaveClick}
              className="w-full py-3 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white">
        <main className="flex-1 p-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-4 text-blue-500"
          >
            Back to Dashboard
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{selectedBlog.title}</h1>
            <p className="text-lg text-gray-800">{selectedBlog.content}</p>
            <button
              onClick={() => handleDeleteClick(selectedBlog.id)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg"
            >
              Delete Blog
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
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
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Welcome to your Dashboard</h1>
        <div className="space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            renderedBlogs
          )}
        </div>
      </main>
    </div>
  );
});

export default Dashboard;
