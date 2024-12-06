import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./../Firebase/Firebase"; // Import Firebase
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      // Save form data to Firebase Firestore
      const docRef = await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="font-sans bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Arrow Button for Landing Page */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")} // Navigates to the home page
          className="text-white text-3xl hover:text-indigo-600 transition duration-300"
        >
          &#8592; {/* Left Arrow symbol */}
        </button>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-4 text-center text-green-500 font-medium">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;