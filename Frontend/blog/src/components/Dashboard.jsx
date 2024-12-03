import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  // Fetch blogs from Firestore
  useEffect(() => {
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
  }, []);

  // Start editing a blog
  const handleEditClick = (blog) => {
    setEditingBlog(blog.id);
    setEditData({ title: blog.title, content: blog.content });
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save the edited blog
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

  // Cancel editing
  const handleCancelClick = () => {
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="py-4 px-6 text-center">
          <h1 className="text-2xl font-bold">My Blog Dashboard</h1>
        </div>
        <nav className="flex flex-col mt-4">
          <button className="text-white py-2 px-4 hover:bg-gray-700">
            Dashboard
          </button>
          <button className="text-white py-2 px-4 hover:bg-gray-700">
            Manage Blogs
          </button>
          <button className="text-white py-2 px-4 hover:bg-gray-700">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {editingBlog ? (
          <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Blog Title"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Blog Content"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Welcome Back, Admin!</h2>
            </header>
            <section>
              <h3 className="text-xl font-bold mb-4">Recent Blogs</h3>
              {loading ? (
                <p>Loading blogs...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <h4 className="text-lg font-semibold mb-2">
                        {blog.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{blog.content}</p>
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="mt-4 text-blue-500 hover:underline"
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
