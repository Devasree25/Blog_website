import React, { useState } from "react";
import { db } from "./../Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const blogRef = collection(db, "blogs"); // Creates 'blogs' collection
      await addDoc(blogRef, {
        title,
        content,
        createdAt: new Date(),
      });
      alert("Blog posted successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to post the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-blue text-white">
      <div className="max-w-2xl w-full bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-navy-blue">
          Write a New Blog
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-navy-blue font-semibold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-blue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label className="block text-navy-blue font-semibold mb-2">
              Blog Content
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-blue"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog here"
              rows="6"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 font-semibold rounded-lg text-white ${
              loading
                ? "bg-navy-blue-light cursor-not-allowed"
                : "bg-navy-blue hover:bg-navy-blue-dark"
            }`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
