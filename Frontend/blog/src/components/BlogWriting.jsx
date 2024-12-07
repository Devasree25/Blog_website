import React, { useState } from "react";
import { db, auth } from "./../Firebase/Firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const WriteBlog = ({ existingBlog }) => {
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!existingBlog);
  const [userEmail, setUserEmail] = useState("");

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
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {isEditing ? "Edit Blog" : "Write a New Blog"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Blog Content
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          {loading ? (isEditing ? "Updating..." : "Posting...") : isEditing ? "Update Blog" : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
