import React from "react";
import { useNavigate, Link } from "react-router-dom";  // Import Link

const LandingPage = () => {
  const navigate = useNavigate();

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
      padding: "16px",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
        <ul style={styles.navLinks}>
          <li>
            <Link to="/register" style={styles.navLink}>
              Register
            </Link>
          </li>
          <li>
            <Link to="#" style={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="#" style={styles.navLink}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" style={styles.navLink}> {/* Link to Contact Us */}
              Contact
            </Link>
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
            onClick={() => navigate("/register")}
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
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 My Blog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
