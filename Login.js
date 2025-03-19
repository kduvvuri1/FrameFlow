import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovingStars from './MovingStars';
import backgroundLoginVid from '../assets/loginbgvid.mp4';
import { auth } from './firebase-config'; // Import Firebase auth
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      console.error('Error during login:', err); // Debugging
      switch (err.code) {
        case 'auth/wrong-password':
          setError('The password is incorrect.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };  

  React.useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear the message after 3 seconds
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [location.state]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to dashboard after successful Google login
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  const handleHomepageRedirect = () => {
    navigate('/homepage'); // Redirect to the homepage
  };

  return (
    <div className="no-scroll">
      <video src={backgroundLoginVid} autoPlay loop muted className="video-background" />
      <div className="flex flex-col h-screen login-background">
        <div className="relative">
          <MovingStars />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex flex-col items-center justify-center h-screen login-background"
          >
            <button onClick={handleHomepageRedirect} className="fixed absolute top-0 left-0 p-4 text-2xl underline">
              FRAMEFLOW
            </button>
            <h1 className="text-5xl font-semibold text-center mt-2">Master your moves</h1>
            <h2 className="text-3xl center-0 right-0 font-semibold text-center">ANYTIME, ANYWHERE</h2>
            <p className="text-lg font-medium leading-snug text-center mt-4">
              Log in to track your progress, compare movements, and master choreography with AI-powered guidance.
            </p>
            <div className="mt-10">
              <div className="center bg-white px-10 py-16 rounded-3xl w-full mx-auto min-h-[400px]">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="flex flex-col">
                {message && <div className="notification">{message}</div>}
                  <label className="text-black text-lg font-medium ml-6">Email</label>
                  <input
                    className="text-black w-11/12 border-4 border-gray-300 rounded-xl p-4 mt-1 bg-gray-100 ml-6 hover:bg-transparent"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  />
                </div>
                <div className="flex justify-start mt-4 ml-2">
                  <button className="ml-4 font-medium text-base text-blue-300 hover:underline">Forgot password?</button>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                  <button onClick={handleLogin} className="py-3 rounded-xl bg-violet-500 hover:bg-violet-500/50 text-white text-lg border-4 border-black">
                    Log In
                  </button>
                  <button onClick={handleGoogleLogin} className="py-3 rounded-xl bg-white-500 text-black flex items-center justify-center space-x-2 hover:border-2 hover:border-black">
                    <FcGoogle className="w-5 h-5" />
                    <span>Sign In With Google</span>
                  </button>
                  <div className="flex justify-start mt-4 ml-2">
                    <div className="ml-4">
                      <label className="text-black">Want to join in on the fun?</label>
                      <button onClick={handleSignupRedirect} className="ml-4 font-medium text-base text-blue-300 hover:underline">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;