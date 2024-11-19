import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', padding: '20px' }}>
      {/* Header Section */}
      <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5em' }}>Welcome to My Blog App</h1>
        <p style={{ fontSize: '1.2em' }}>Explore the latest posts and insights!</p>
      </header>

      {/* Main Content Section */}
      <main style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        {/* Blog Post 1 */}
        <div style={{ width: '30%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 1" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ fontSize: '1.5em' }}>The Power of React</h3>
            <p style={{ fontSize: '1em', color: '#666' }}>A deep dive into the features and benefits of React JS for web development.</p>
            <button style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Read More
            </button>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div style={{ width: '30%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 2" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ fontSize: '1.5em' }}>CSS Grid vs Flexbox</h3>
            <p style={{ fontSize: '1em', color: '#666' }}>Understanding when and why to use CSS Grid or Flexbox for layout.</p>
            <button style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Read More
            </button>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div style={{ width: '30%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <img 
            src="https://via.placeholder.com/300x200" 
            alt="Blog Post 3" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ fontSize: '1.5em' }}>Mastering JavaScript Asynchronous Operations</h3>
            <p style={{ fontSize: '1em', color: '#666' }}>An introduction to handling async operations in JavaScript using Promises and async/await.</p>
            <button style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Read More
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '15px', marginTop: '50px' }}>
        <p style={{ fontSize: '1em' }}>© 2024 My Blog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
