import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Homepage from './components/Homepage.js';
import './components/index.css';
import Dashboard from './components/Dashboard.js';
import { auth } from './components/firebase-config.js'; // Import Firebase auth
import AccountSetup from './components/AccountSetup.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
      </Routes>
    </Router>
  );
}

export default App;