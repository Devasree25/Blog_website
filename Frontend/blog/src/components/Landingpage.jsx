import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', padding: '20px', margin: 0 }}>
      {/* Header Section */}
      <header style={{
        backgroundColor: '#1a202c', color: '#fff', padding: '60px 20px', textAlign: 'center', borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '3em', fontWeight: 'bold' }}>Welcome to My Blog App</h1>
        <p style={{ fontSize: '1.3em', marginTop: '10px', fontWeight: 'lighter' }}>Explore the latest posts and insights from the world of technology.</p>
      </header>

      {/* Main Content Section */}
      <main style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', gap: '30px', flexWrap: 'wrap' }}>
        {/* Blog Post 1 */}
        <div style={{
          width: '30%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'
        }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 1" 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '5px solid #4f5b62' }} 
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.8em', color: '#333', marginBottom: '10px' }}>The Power of React</h3>
            <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6' }}>A deep dive into the features and benefits of React JS for modern web development.</p>
            <button style={{
              padding: '12px 25px', backgroundColor: '#1a202c', color: '#fff', border: 'none', borderRadius: '6px', 
              cursor: 'pointer', fontSize: '1.1em', marginTop: '20px', transition: 'background-color 0.3s ease'
            }}>Read More</button>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div style={{
          width: '30%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'
        }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 2" 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '5px solid #4f5b62' }} 
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.8em', color: '#333', marginBottom: '10px' }}>CSS Grid vs Flexbox</h3>
            <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6' }}>Understanding when and why to use CSS Grid or Flexbox for layout design.</p>
            <button style={{
              padding: '12px 25px', backgroundColor: '#1a202c', color: '#fff', border: 'none', borderRadius: '6px', 
              cursor: 'pointer', fontSize: '1.1em', marginTop: '20px', transition: 'background-color 0.3s ease'
            }}>Read More</button>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div style={{
          width: '30%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'
        }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 3" 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '5px solid #4f5b62' }} 
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.8em', color: '#333', marginBottom: '10px' }}>Mastering JavaScript Asynchronous Operations</h3>
            <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6' }}>An introduction to handling async operations in JavaScript using Promises and async/await syntax.</p>
            <button style={{
              padding: '12px 25px', backgroundColor: '#1a202c', color: '#fff', border: 'none', borderRadius: '6px', 
              cursor: 'pointer', fontSize: '1.1em', marginTop: '20px', transition: 'background-color 0.3s ease'
            }}>Read More</button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer style={{
        backgroundColor: '#1a202c', color: '#fff', textAlign: 'center', padding: '30px 20px', marginTop: '60px', 
        borderRadius: '8px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ fontSize: '1.1em', fontWeight: 'lighter' }}>© 2024 My Blog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
