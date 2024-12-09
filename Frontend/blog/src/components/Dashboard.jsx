import React, { useState, useEffect, useCallback, useMemo } from "react";
import { db, auth } from "./../Firebase/Firebase";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = React.memo(() => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const navigate = useNavigate();
  const { blogId } = useParams();

  const fetchBlogs = useCallback(async () => {
    if (!user) return;
    try {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((blog) => blog.createdBy === user.email);
      setBlogs(blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

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
  }, []);

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

  const handleDeleteClick = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [navigate]);

  const handleWriteBlogClick = useCallback(() => {
    navigate("/write-blog");
  }, [navigate]);

  const BlogClick = useCallback(() => {
    navigate("/blogs");
  }, [navigate]);

  const handlesignup = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const renderedBlogs = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-400">{blog.title}</h2>
            <p className="mt-2">{blog.content.substring(0, 100)}...</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleEditClick(blog)}
                className="text-blue-400 hover:text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedBlog(blog)}
                className="text-blue-400 hover:text-blue-500"
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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-4 text-blue-400">Edit Blog</h1>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="w-full p-4 mb-4 bg-gray-700 text-blue-400 rounded-lg"
            placeholder="Enter Blog Title"
          />
          <textarea
            name="content"
            value={editData.content}
            onChange={handleInputChange}
            className="w-full p-4 mb-4 bg-gray-700 text-blue-400 rounded-lg"
            placeholder="Write your content here..."
            rows="6"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white">
        <main className="flex-1 p-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-4 text-blue-400"
          >
            Back to Dashboard
          </button>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">{selectedBlog.title}</h1>
            <p>{selectedBlog.content}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="py-6 px-4 text-center border-b border-gray-700">
          <h1 className="text-3xl font-bold mb-2">TechVerse Blog</h1>
          <p className="text-sm">Your personal blog dashboard</p>
        </div>
        <nav className="mt-10 space-y-4 px-4">
          <button
            onClick={handleWriteBlogClick}
            className="w-full flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded-lg"
          >
            📝 Write a Blog
          </button>
          <button
            onClick={BlogClick}
            className="w-full flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded-lg"
          >
            📔 Blogs
          </button>
          <button
            onClick={handlesignup}
            className="w-full flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded-lg"
          >
            🪧 Signup
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 px-4 hover:bg-gray-700 rounded-lg"
          >
            🔑 Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-400">Dashboard</h1>
        <p className="text-gray-400 mt-2 mb-6">
          Welcome back, {user?.email}! Here are your blogs.
        </p>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : blogs.length > 0 ? (
          renderedBlogs
        ) : (
          <p className="text-center text-gray-400">No blogs found. Write your first blog!</p>
        )}
      </main>
    </div>
  );
});

export default Dashboard;
