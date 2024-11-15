// Register.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//firebase
export default function Register() {
  const handleGoogleLogin = (response) => {
    console.log(response) ;
    // Handle the response here, e.g., send it to your backend for validation.
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333',
              marginBottom: '1.5rem',
            }}
          >
            Register
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  color: '#555',
                  marginBottom: '0.25rem',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  color: '#555',
                  marginBottom: '0.25rem',
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  color: '#555',
                  marginBottom: '0.25rem',
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#3b30cc')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4f46e5')}
            >
              Sign Up
            </button>
          </form>
          {/* Google Login Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => console.error('Google login failed', error)}
              useOneTap
            />
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#666',
              marginTop: '1rem',
            }}
          >
            Already have an account?{' '}
            <a
              href="#"
              style={{
                color: '#4f46e5',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
