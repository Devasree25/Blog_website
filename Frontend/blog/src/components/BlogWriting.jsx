import React, { useState } from "react";
import { db, auth } from "./../Firebase/Firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WriteBlog = ({ existingBlog }) => {
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!existingBlog);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Monitor the authentication state to get the user's email
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        const blogDoc = doc(db, "blogs", existingBlog.id);
        await updateDoc(blogDoc, {
          title,
          content,
          updatedAt: new Date(),
        });
        alert("Blog updated successfully!");
      } else {
        const blogRef = collection(db, "blogs");
        await addDoc(blogRef, {
          title,
          content,
          createdBy: userEmail, // Save the creator's email
          createdAt: new Date(),
        });
        alert("Blog posted successfully!");
      }
      setTitle("");
      setContent("");
      navigate("/dashboard"); // Navigate back to the dashboard
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/dashboard"); // Navigate back to the dashboard on close
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-800 rounded-full w-8 h-8 flex justify-center items-center"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">
          {isEditing ? "Edit Blog" : "Write a New Blog"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-gray-300 text-lg font-semibold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-gray-300 text-lg font-semibold mb-2">
              Blog Content
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog here"
              rows="8"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-transform transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : isEditing
                ? "bg-green-500 hover:bg-green-600 active:scale-95"
                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }`}
            disabled={loading}
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Posting..."
              : isEditing
              ? "Update Blog"
              : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
