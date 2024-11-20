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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Write a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Content
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog here"
            rows="6"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`px-6 py-2 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
