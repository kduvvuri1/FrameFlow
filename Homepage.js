import React from 'react';
import backgroundVideo from '../assets/bghome.mp4'; // Adjust the path to your video file
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import './index.css';
import {useEffect} from 'react';

// Import images and social media icons
import waleedImage from '../assets/waleed.jpg'; // Adjust paths as needed
import mubashirImage from '../assets/mubashir.jpg';
import prathikImage from '../assets/prathik.jpg';
import kartikeyaImage from '../assets/kartikeya.jpg';
import githubIcon from '../assets/github.png'; // Example social media icons
import linkedinIcon from '../assets/linkedin.png';
import instagramIcon from '../assets/instagram.png';

// Importing other images
import sideImg1 from '../assets/infosec1.png';
import sideImg2 from '../assets/infosec2.png';

const Homepage = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };
  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to the signup page
  };
  const handleHomepageRedirect = () => {
    window.location.reload(); // Reload the homepage
  };
  const scrollToAboutSection = () => {
    aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const futureSectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Section is visible:', entry.target); // Debugging
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once the section is visible
          }
        });
      },
      {
        root: null, // Observe relative to the viewport
        rootMargin: '0px', // No margin
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );
  
    // Observe each section
    futureSectionRefs.current.forEach((section) => {
      if (section) {
        console.log('Observing section:', section); // Debugging
        observer.observe(section);
      }
    });
  
    // Cleanup observer on unmount
    return () => {
      futureSectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="scrollable-content">
      {/* Video Background */}
      <video src={backgroundVideo} autoPlay loop muted className="video-background" />

      {/* Top Bar */}
      <div className="top-bar">
        <button className="top-bar-button left-32 hover:underline">upload</button>
        <button className="top-bar-button left-96 hover:underline">meetup</button>
        <div className="title-box">
          <button onClick={handleHomepageRedirect} className="title-button">FRAMEFLOW</button>
        </div>
        <button onClick={scrollToAboutSection } className="top-bar-button right-72 hover:underline">about</button>
        <button onClick={handleLoginRedirect} className="top-bar-button right-4 hover:underline">log in</button>
      </div>

      {/* Main Container */}
      <div className="main-container">
        <div className="flex flex-row items-center justify-between gap-8">
          {/* Section 1: Upload */}
          <div className="section-box">
            <h3 className="section-title">Upload</h3>
            <div className="section-icon">
              <svg className="w-30 h-30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p className="section-description">Upload your video files onto our platform.</p>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section 2: Analyze */}
          <div className="section-box">
            <h3 className="section-title">Analyze</h3>
            <div className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-30 h-30 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="section-description">Our system analyzes the video for modeling.</p>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Section 3: Learn */}
          <div className="section-box">
            <h3 className="section-title">Learn</h3>
            <div className="section-icon">
              <svg className="w-30 h-30 mx-auto" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_4">
                  <g>
                    <path d="M22.165,31.755c0,0,0.815-3.229-1.058-5.464l2.237-5.387l11.945,7.635l1.913-2.998l-13.676-8.737l0.001-0.004l-0.018-0.008l-0.271-0.172l-0.031,0.049l-4.627-1.92L14.632,0.005h-3.834l4.776,17.838l-1.703,4.097c-0.002,0.008-0.268,0.745-0.348,2.278c0,0-0.803,6.255,3.544,9.692l-3.853,14.086h3.925l3.059-11.19l10.676,11.19h5.471l0.007-0.004L25.224,36.323L22.165,31.755z" fill="#FFFFFF" />
                    <circle cx="23.697" cy="11.417" fill="#FFFFFF" r="3.986" />
                  </g>
                </g>
              </svg>
            </div>
            <p className="section-description">Start learning your favorite moves!</p>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <button onClick={handleSignupRedirect} className="get-started-button">get started!</button>

      {/* Future Sections */}
        <div
        ref={(el) => (futureSectionRefs.current[0] = el)}
        className="future-section text-black"
        >
        <div className='content'>
          <h2 className='text-5xl underline'>what we do</h2>
          <p className="text-lg leading-relaxed mb-2 text-justify">At FrameFlow, we believe movement is more than just technique—it’s a form of personal expression, creativity, and joy. Whether you're perfecting a dance routine, refining your athletic performance, or simply having fun, our platform is designed to elevate your experience. By combining advanced motion analysis with intuitive feedback tools, we empower users to explore movement in a way that’s engaging, insightful, and rewarding.</p>
          <p className="text-lg leading-relaxed mb-4 text-justify">Beyond dance, FrameFlow is built for anyone who loves to move—fitness enthusiasts, sports players, and even casual users looking for a new way to stay active. Our technology helps break down complex movements, making learning accessible and enjoyable for all skill levels. Whether you're training for a competition, fine-tuning a yoga pose, or just exploring a new hobby, FrameFlow is your personal guide to movement mastery.</p>
        </div>
        <img src={sideImg1} alt="Side Image" className="side-image" />
      </div>

      <div
        ref={(el) => (futureSectionRefs.current[1] = el)}
        className="future-section reverse text-black"
      >
        <img src={sideImg2} alt="Side Image" className="side-image" />
        <div className='content'>
          <h2 className='text-5xl underline'>process</h2>
          <p className="text-lg leading-relaxed mb-2 text-justify">At FrameFlow, the journey begins with a simple step—capturing your movement. Users can upload a pre-recorded video or use real-time recording to track their dance routines, workouts, or performance drills. Once uploaded, our AI-powered system analyzes the motion frame by frame, identifying key patterns, posture alignments, and areas for improvement. Using advanced pose estimation and movement tracking, FrameFlow translates raw motion data into clear, actionable insights tailored to each user’s style and skill level.</p>
          <p className='text-lg leading-relaxed mb-4 text-justify'>But we don’t stop at analysis. FrameFlow offers a suite of interactive tools designed to enhance your learning experience. From personalized feedback and progress tracking to community challenges and collaborative features, our platform fosters a supportive environment where users can connect, share, and grow together. Whether you’re looking to perfect a specific move, explore new styles, or simply have fun with friends, FrameFlow is your partner in movement.</p>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutSectionRef} className="about-section">
        <h2 className="about-title">about us</h2>
        <div className="creator-grid">
          {/* Waleed Mold */}
          <div className="creator-card   bg-white);">
            <div className="creator-image-container">
              <img src={waleedImage} alt="waleed moid ahmed" className="creator-image" />
              <div className="social-icons">
                <a href="https://github.com/Waleed2600" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/waleed-moid-ahmed-203b571b5/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="https://instagram.com/waleed.m.ahmed361/" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="Instagram" />
                </a>
              </div>
            </div>
            <h3>waleed moid ahmed</h3>
            <p>Backend Developer</p>
            <p>Waleed has been working in back-end for a while. He has developed a breakthrough in AWS connection and database.</p>
          </div>

          {/* Mubashir Mian */}
          <div className="creator-card">
            <div className="creator-image-container">
              <img src={mubashirImage} alt="mubashir mian" className="creator-image" />
              <div className="social-icons">
                <a href="https://github.com/mianmk81" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/mubashar-mian/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/mianmk81/" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="instagram" />
                </a>
              </div>
            </div>
            <h3>mubashir mian</h3>
            <p>AI Engineer</p>
            <p>Mubashir has been working in AI for 2 years. He has developed a breakthrough in training models and deployment of AI services.</p>
          </div>

          {/* Prathik Devaruppala */}
          <div className="creator-card">
            <div className="creator-image-container">
              <img src={prathikImage} alt="prathik devaruppala" className="creator-image" />
              <div className="social-icons">
                <a href="https://github.com/engprat" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/prathik-devaruppala-b9070a244/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/prathikdev2004/" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="instagram" />
                </a>
              </div>
            </div>
            <h3>prathik devaruppala</h3>
            <p>ML Engineer</p>
            <p>prathik has been working as an ML engineer for a year. He used his learning of machine learning well for this project.</p>
          </div>

          {/* Kartikeya Duvvuri */}
          <div className="creator-card">
            <div className="creator-image-container">
              <img src={kartikeyaImage} alt="kartikeya duvvuri" className="creator-image" />
              <div className="social-icons">
                <a href="https://github.com/kduvvuri1" target="_blank" rel="noopener noreferrer">
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/kartikeya-duvvuri-b9aa5328b/" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="https://instagram.com/kartikeyaduvvuri/" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="instagram" />
                </a>
              </div>
            </div>
            <h3>kartikeya duvvuri</h3>
            <p>Front-end Developer</p>
            <p>Kartikeya has been working in front-end for a year. He has developed a wonderful user interface and an excellent experience for you guys!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;