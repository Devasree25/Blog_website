import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./../Firebase/Firebase"; // Adjust the import path based on your setup

const ProfilePage = () => {
  const [user, setUser] = useState(null); // For authenticated user
  const [profileData, setProfileData] = useState(null); // For Firestore user data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Fetch user profile from Firestore
          const docRef = db.collection("users").doc(currentUser.uid);
          const doc = await docRef.get();
          if (doc.exists) {
            setProfileData(doc.data());
          } else {
            // If no profile data, set defaults
            setProfileData({
              bio: "This is your bio section!",
              skills: ["Add your skills!"],
              activity: ["Your activity will show up here."],
              location: "Unknown",
              role: "Software Developer",
            });
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setProfileData({
            bio: "Error loading bio.",
            skills: [],
            activity: [],
            location: "Error fetching location.",
            role: "Error fetching role.",
          });
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  // Update Firestore data
  const updateProfileData = async (updates) => {
    if (!user) return;
    try {
      const docRef = db.collection("users").doc(user.uid);
      await docRef.set(updates, { merge: true });
      setProfileData({ ...profileData, ...updates });
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full overflow-hidden">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.displayName || "John Doe"}</h2>
            <p className="text-gray-400">{profileData.role || "Software Developer"}</p>
            <p className="mt-2">
              📍 <span className="text-gray-300">{profileData.location || "Unknown"}</span>
            </p>
            <p className="mt-2">
              📧 <span className="text-gray-300">{user.email}</span>
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-3">
              <button
                onClick={() =>
                  updateProfileData({
                    bio: "Updated bio!",
                    location: "Updated Location",
                  })
                }
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <section className="mt-8">
          {/* Bio Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Bio</h3>
            <p className="text-gray-300">{profileData.bio || "No bio provided."}</p>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-4">
              {profileData.skills?.length > 0
                ? profileData.skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-700 rounded-lg">
                      {skill}
                    </span>
                  ))
                : "No skills listed."}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {profileData.activity?.length > 0
                ? profileData.activity.map((item, index) => <li key={index}>{item}</li>)
                : "No recent activity found."}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
