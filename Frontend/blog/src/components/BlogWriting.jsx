import React, { useState } from "react";
import { db, storage } from "./../Firebase/Firebase"; // Ensure Firebase storage is initialized in your Firebase config
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const WriteBlog = ({ existingBlog }) => {
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const [image, setImage] = useState(null); // For storing selected image file
  const [imageUrl, setImageUrl] = useState(existingBlog?.imageUrl || ""); // For storing image URL
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!existingBlog);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `blogImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can handle upload progress here if needed
        },
        (error) => {
          console.error("Image upload error:", error);
          alert("Failed to upload image.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL); // Store the image URL once the upload is complete
            setImage(file);
          });
        }
      );
    }
  };

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
          imageUrl,
          updatedAt: new Date(),
        });
        alert("Blog updated successfully!");
      } else {
        const blogRef = collection(db, "blogs");
        await addDoc(blogRef, {
          title,
          content,
          imageUrl,
          createdAt: new Date(),
        });
        alert("Blog posted successfully!");
      }
      setTitle("");
      setContent("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditing ? "Edit Blog" : "Write a New Blog"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-3">
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
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-3">
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

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-3">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Uploaded" className="w-full h-auto rounded-lg" />
            </div>
          )}
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
