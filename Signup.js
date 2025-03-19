import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovingStars from './MovingStars';
import backgroundSignupVid from '../assets/signupbgvid.mp4';
import { auth } from './firebase-config'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(''); // Clear previous errors
    try {
      console.log('Attempting to create user with email:', email); // Debugging
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user); // Debugging
      navigate('/accountsetup'); // Redirect to account setup after successful signup
    } catch (err) {
      console.error('Error during signup:', err); // Debugging
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.');
          navigate('/login', { state: { message: 'Looks like you already have an account... log in instead!' } }); // Redirect to login page with a message
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to dashboard after successful Google signup
    } catch (err) {
      setError('An error occurred during Google signup. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleHomepageRedirect = () => {
    navigate('/homepage'); // Redirect to the homepage
  };

  const handleAccountSetup = () => {
    navigate('/accountsetup'); // Redirect to the account setup page
  };

  return (
    <div className="no-scroll">
      <video src={backgroundSignupVid} autoPlay loop muted className="video-background" />
      <div className="flex flex-col h-screen">
        <div className="relative">
          <MovingStars />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex flex-col items-center justify-center h-screen signup-background"
          >
            <button onClick={handleHomepageRedirect} className="fixed absolute top-0 left-0 p-4 text-2xl underline">
              FRAMEFLOW
            </button>
            <h1 className="text-5xl font-semibold text-center mt-2">Master your moves</h1>
            <h2 className="text-3xl center-0 right-0 font-semibold text-center">ANYTIME, ANYWHERE</h2>
            <p className="text-lg font-medium leading-snug text-center mt-4">
              Sign up to track your progress, compare movements, and master choreography with AI-powered guidance.
            </p>
            <div className="mt-10">
              <div className="center bg-white px-9 py-10 rounded-3xl w-full mx-auto min-h-[200px]">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup}>
                  <div className="flex flex-col">
                    <label className="text-black text-lg font-medium ml-6">Email</label>
                    <input
                      className="text-black w-11/12 border-4 border-gray-300 rounded-xl p-4 mt-1 bg-gray-100 ml-6 hover:bg-transparent"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-lg font-medium ml-6">Password</label>
                    <input
                      className="text-black w-11/12 border-4 border-gray-300 rounded-xl p-4 mt-1 bg-gray-100 ml-6 hover:bg-transparent"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-lg font-medium ml-6">Confirm Password</label>
                    <input
                      className="text-black w-11/12 border-4 border-gray-300 rounded-xl p-4 mt-1 bg-gray-100 ml-6 hover:bg-transparent"
                      placeholder="Confirm your password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-start mt-4 ml-2">
                    <button className="ml-4 font-medium text-base text-blue-300 hover:underline">Forgot password?</button>
                  </div>
                  <div className="mt-8 flex flex-col gap-y-4">
                    <button type="submit" className="py-3 rounded-xl bg-violet-500 hover:bg-violet-500/50 text-white text-lg border-4 border-black">
                      Sign Up
                    </button>
                    <button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="py-3 rounded-xl bg-white-500 text-black flex items-center justify-center space-x-2 hover:border-2 hover:border-black"
                    >
                      <FcGoogle className="w-5 h-5" />
                      <span>Sign Up With Google</span>
                    </button>
                    <div className="flex justify-start mt-4 ml-2">
                      <div className="ml-4">
                        <label className="text-black">Already in on the fun?</label>
                        <button onClick={handleLoginRedirect} className="ml-4 font-medium text-base text-blue-300 hover:underline">
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;