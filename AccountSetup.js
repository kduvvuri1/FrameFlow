import React, { useState } from 'react';
import { auth, db, storage } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../assets/bghome.mp4'; // Use the same background video as Homepage

const AccountSetup = () => {
  const navigate = useNavigate();
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    instagram: '',
    facebook: '',
    twitter: '',
  });
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setProfilePhotoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !fullName) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      let profilePhotoData = null;
      if (profilePhotoFile) {
        const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}/${profilePhotoFile.name}`);
        await uploadBytes(storageRef, profilePhotoFile);
        const downloadURL = await getDownloadURL(storageRef);
        profilePhotoData = {
          fileName: profilePhotoFile.name,
          filePath: storageRef.fullPath,
          downloadURL: downloadURL,
        };
      }

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, {
        uid: auth.currentUser.uid,
        isSetupComplete: true,
        profilePhoto: profilePhotoData,
        socialMediaLinks,
        username,
        fullName,
        videos: [],
      }, { merge: true });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error setting up account:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="scrollable-content">
      {/* Video Background */}
      <video src={backgroundVideo} autoPlay loop muted className="video-background" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white px-10 py-16 rounded-3xl w-full max-w-md mx-auto shadow-lg">
          <h1 className="text-5xl font-semibold text-center mb-6 text-purple-900">Set Up Your Account</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="text-black text-lg font-medium">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
                disabled={uploading}
                className="w-full mt-2 p-2 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent"
              />
              {uploading && <p className="text-gray-500 mt-2">Uploading...</p>}
              {profilePhotoFile && (
                <img
                  src={URL.createObjectURL(profilePhotoFile)}
                  alt="Profile Preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover mx-auto"
                />
              )}
            </div>
            <div className="form-group">
              <label className="text-black text-lg font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-4 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent"
              />
            </div>
            <div className="form-group">
              <label className="text-black text-lg font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-4 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent"
              />
            </div>
            <div className="form-group">
              <label className="text-black text-lg font-medium">Social Media Links</label>
              <input
                type="text"
                placeholder="Instagram"
                value={socialMediaLinks.instagram}
                onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, instagram: e.target.value })}
                className="w-full p-4 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent mt-2"
              />
              <input
                type="text"
                placeholder="Facebook"
                value={socialMediaLinks.facebook}
                onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, facebook: e.target.value })}
                className="w-full p-4 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent mt-2"
              />
              <input
                type="text"
                placeholder="Twitter"
                value={socialMediaLinks.twitter}
                onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, twitter: e.target.value })}
                className="w-full p-4 border-4 border-gray-300 rounded-xl bg-gray-100 hover:bg-transparent mt-2"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-500/50 text-white text-lg border-4 border-black transition-all duration-300"
            >
              {uploading ? 'Uploading...' : 'Complete Setup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;