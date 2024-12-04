import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router components
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import WriteBlog from './components/BlogWriting';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<LandingPage />} /> {/* Default landing page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
