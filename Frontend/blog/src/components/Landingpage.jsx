import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const styles = {
    container: {
      fontFamily: "Inter, sans-serif",
      backgroundColor: "#f7fafc",
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
    navLinks: {
      display: "flex",
      gap: "24px",
      listStyle: "none",
    },
    navLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontFamily: "Fira Code, monospace",
      cursor: "pointer",
    },
    hero: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "40px 32px",
      backgroundColor: "#1a202c",
      color: "#ffffff",
      borderRadius: "8px",
      margin: "32px auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heroText: {
      textAlign: "center",
      marginBottom: "24px",
    },
    heroTitle: {
      fontSize: "36px",
      fontWeight: "bold",
      fontFamily: "Merriweather, serif",
      marginBottom: "16px",
    },
    heroDescription: {
      fontSize: "18px",
      fontWeight: "300",
      marginBottom: "16px",
    },
    heroButton: {
      padding: "12px 28px",
      backgroundColor: "#edf2f7",
      color: "#1a202c",
      fontWeight: "bold",
      fontFamily: "Fira Code, monospace",
      borderRadius: "8px",
      cursor: "pointer",
      border: "none",
    },
    section: {
      textAlign: "center",
      padding: "64px 24px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontFamily: "Merriweather, serif",
      marginBottom: "16px",
    },
    sectionDescription: {
      fontSize: "18px",
      fontWeight: "300",
      color: "#4a5568",
      marginBottom: "48px",
    },
    featureCard: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "24px",
      textAlign: "left",
    },
    featureImage: {
      width: "100%",
      height: "192px",
      borderRadius: "8px",
      objectFit: "cover",
      marginBottom: "16px",
    },
    featureTitle: {
      fontSize: "20px",
      fontWeight: "600",
      fontFamily: "Fira Code, monospace",
      marginBottom: "8px",
    },
    featureDescription: {
      fontSize: "16px",
      color: "#4a5568",
    },
    footer: {
      backgroundColor: "#1a202c",
      color: "#ffffff",
      padding: "32px 16px",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginTop: "32px",
    },
    footerText: {
      fontSize: "14px",
      fontWeight: "300",
      fontFamily: "Fira Code, monospace",
      marginBottom: "8px",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      listStyle: "none",
      marginBottom: "16px",
    },
    footerLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontFamily: "Fira Code, monospace",
      cursor: "pointer",
    },
    footerContact: {
      fontSize: "16px",
      fontWeight: "300",
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>My Blog App</h1>
        <ul style={styles.navLinks}>
          <li>
            <a href="#" style={styles.navLink}>
              Register
            </a>
          </li>
          <li>
            <a href="#" style={styles.navLink}>
              About
            </a>
          </li>
          <li>
            <a href="#" style={styles.navLink}>
              Blog
            </a>
          </li>
          <li>
            <a href="#" style={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Bold Ideas for Tech Enthusiasts</h1>
          <p style={styles.heroDescription}>
            Explore the latest trends, guides, and insights in the world of
            technology. Dive into articles crafted for learners and
            professionals alike.
          </p>
          <button
            style={styles.heroButton}
            onClick={() => navigate("/register")} // Navigate to the Register page
          >
            Get Started
          </button>
        </div>
      </header>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Discover, Learn, and Grow</h2>
        <p style={styles.sectionDescription}>
          We bring you well-researched articles, tutorials, and resources to
          help you master the world of technology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div style={styles.featureCard}>
            <img
              src="https://htmlburger.com/blog/wp-content/uploads/2023/04/modern-website-design-examples.jpg"
              alt="Feature 1"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Modern Web Design</h3>
            <p style={styles.featureDescription}>
              Learn the latest in web design and create stunning user
              interfaces.
            </p>
          </div>
          {/* Feature 2 */}
          <div style={styles.featureCard}>
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmclMjBsYW5ndWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Feature 2"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Programming Mastery</h3>
            <p style={styles.featureDescription}>
              Enhance your coding skills with practical guides and examples.
            </p>
          </div>
          {/* Feature 3 */}
          <div style={styles.featureCard}>
            <img
              src="https://i0.wp.com/www.quytech.com/blog/wp-content/uploads/2023/11/Top-Technology-Trends-in-2024.webp?w=1437&ssl=1"
              alt="Feature 3"
              style={styles.featureImage}
            />
            <h3 style={styles.featureTitle}>Tech Trends</h3>
            <p style={styles.featureDescription}>
              Stay updated with the latest trends in the tech world.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div>
          <p style={styles.footerText}>© 2024 My Blog App. All Rights Reserved.</p>
          <ul style={styles.footerLinks}>
            <li>
              <a href="mailto:contact@myblogapp.com" style={styles.footerLink}>
                Email Us
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" style={styles.footerLink}>
                Call Us
              </a>
            </li>
          </ul>
          <p style={styles.footerContact}>
            For any inquiries, feel free to reach out to us!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
