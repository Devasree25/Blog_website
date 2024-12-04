import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase/Firebase'; // Ensure correct import path

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      alert('Login successful!');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google user signed in:', user);
      setError('');
      alert('Google Login successful!');
    } catch (err) {
      setError('Google login failed: ' + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor:" #1a202c ",
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

        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4285F4',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#3367D6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4285F4')}
        >
          Sign in with Google
        </button>

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
            href="/register" // Link to the Register page
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
