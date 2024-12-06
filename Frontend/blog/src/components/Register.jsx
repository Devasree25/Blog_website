import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created:', user.uid);

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      console.log('User saved to Firestore');
      setError(''); // Clear error on success
      alert('Registration successful!');

      // Redirect to the dashboard after successful registration
      navigate('/dashboard'); // Redirect to dashboard page
    } catch (err) {
      console.error('Error:', err);
      // Set a custom error message based on the error code
      if (err.code === 'auth/invalid-email') {
        setError('The email address is badly formatted.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please use a different email.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak. Please use a stronger password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google user signed in:', user.uid);

      // Save user data to Firestore (if it's the first sign-in)
      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        },
        { merge: true } // Prevent overwriting if the document already exists
      );

      console.log('Google user saved to Firestore');
      alert('Google Sign-In successful!');

      // Redirect to the dashboard after successful Google sign-in
      navigate('/dashboard'); // Redirect to dashboard page
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      // Set a custom error message based on the error code
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-In was closed. Please try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Sign-In request was cancelled.');
      } else {
        setError('An error occurred during Google sign-in. Please try again.');
      }
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to login page using navigate
  };

  return (
    <div style={{backgroundColor:" #1a202c "}} className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create Account</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-1">
          <div>
            <label className="block text-gray-700 text-sm font-semibold" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-600">Already have an account? 
            <button
              onClick={handleRedirectToLogin}
              className="text-purple-600 hover:underline ml-2"
            >
              Login
            </button>
          </p>
        </div>

        <div className="flex items-center my-6">
          <hr className="w-full border-gray-300" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
