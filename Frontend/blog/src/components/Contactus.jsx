import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can handle form submission here (e.g., send data to backend or an API)
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000); // Hide message after 3 seconds
  };

  const styles = {
    container: {
      fontFamily: "Inter, sans-serif",
      backgroundColor: "#f7fafc",
      padding: "40px",
    },
    navbar: {
      backgroundColor: "#1a202c",
      color: "#ffffff",
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    navTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      fontFamily: "Merriweather, serif",
    },
    formContainer: {
      backgroundColor: "#ffffff",
      padding: "32px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginTop: "40px",
      width: "100%",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    formTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontFamily: "Merriweather, serif",
      textAlign: "center",
      marginBottom: "16px",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      marginBottom: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      height: "150px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    button: {
      padding: "12px 28px",
      backgroundColor: "#3182ce",
      color: "#ffffff",
      fontWeight: "bold",
      fontFamily: "Fira Code, monospace",
      borderRadius: "8px",
      cursor: "pointer",
      border: "none",
    },
    successMessage: {
      backgroundColor: "#38a169",
      color: "#ffffff",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "20px",
      textAlign: "center",
    },
    footer: {
      backgroundColor: "#1a202c",
      color: "#ffffff",
      padding: "16px",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginTop: "40px",
    },
    footerText: {
      fontSize: "14px",
      fontWeight: "300",
      fontFamily: "Fira Code, monospace",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>My Blog App</h1>
      </nav>

      {/* Contact Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.inputField}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.inputField}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>

        {submitted && (
          <div style={styles.successMessage}>Thank you for reaching out!</div>
        )}
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 My Blog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUsPage;
