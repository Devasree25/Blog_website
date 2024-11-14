// Login.js
import React from 'react';

export default function Login() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #FF7E5F, #FEB47B)',
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
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
          Login
        </h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              backgroundColor: '#FF7E5F',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#E06752')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF7E5F')}
          >
            Log In
          </button>
        </form>
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#666',
            marginTop: '1rem',
          }}
        >
          Don't have an account?{' '}
          <a
            href="#"
            style={{
              color: '#FF7E5F',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
