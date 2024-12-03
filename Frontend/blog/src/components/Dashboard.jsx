import React, { useState, useEffect } from "react";
import { db } from "./../Firebase/Firebase"; // Import Firebase configuration
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
      const blogRef = doc(db, "blogs", editingBlog); // Reference to the blog in Firestore
      await updateDoc(blogRef, editData); // Update the blog in Firestore
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editingBlog ? { ...blog, ...editData } : blog
        )
      );
      setEditingBlog(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="py-4 px-6 text-center">
          <h1 className="text-2xl font-bold">My Blog Dashboard</h1>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Welcome Back, Admin!</h2>
        </header>

        {/* Recent Blogs */}
        <section>
          <h3 className="text-xl font-bold mb-4">Recent Blogs</h3>
          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white p-4 rounded-lg shadow">
                  {editingBlog === blog.id ? (
                    <>
                      {/* Edit Form */}
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-2 border rounded"
                      />
                      <textarea
                        name="content"
                        value={editData.content}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-2 border rounded"
                      />
                      <button
                        onClick={handleSaveClick}
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                      <p className="text-gray-600 text-sm">{blog.content}</p>
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="mt-4 mr-2 text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
