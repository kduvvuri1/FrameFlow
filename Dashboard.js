import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../assets/bghome.mp4'; // Use the same background video as Homepage

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        navigate('/account-setup');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="scrollable-content">
      {/* Video Background */}
      <video src={backgroundVideo} autoPlay loop muted className="video-background" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white px-10 py-16 rounded-3xl w-full max-w-2xl mx-auto shadow-lg">
          <h1 className="text-5xl font-semibold text-center mb-6 text-purple-900">Welcome, {userData?.username}</h1>
          <div className="profile-info text-center">
            {userData?.profilePhoto?.downloadURL && (
              <img
                src={userData.profilePhoto.downloadURL}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500"
              />
            )}
            <p className="text-black text-lg font-medium">Full Name: {userData?.fullName}</p>
            <div className="social-media-links mt-4">
              <a
                href={userData?.socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Instagram
              </a>
              <a
                href={userData?.socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-4"
              >
                Facebook
              </a>
              <a
                href={userData?.socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-4"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;