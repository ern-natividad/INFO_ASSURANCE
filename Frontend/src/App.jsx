import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Login from "./frontend/Login.jsx";
import SignUp from "./frontend/SignUp.jsx";
import LessonLayout from "./frontend/pages/LessonLayout.jsx";
import HTTPBasics from "./frontend/pages/HTTPBasics.jsx";
import HTTPProxies from "./frontend/pages/HTTPProxies.jsx";
import CIATriad from "./frontend/pages/CIATriad.jsx";
import Assessment from "./frontend/pages/Assessment.jsx";

function Dashboard() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h1>Welcome to Secure Authentication Demo</h1>
      <p>
        Successfully logged in! Explore our WebGoat security lesson below.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/lesson/1" className="lesson-link">
          Start SQL Injection Lesson 
        </Link>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => !!sessionStorage.getItem("loggedIn"),
  );
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setShowSignUp(false);
  };

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={
            showSignUp ? (
              <SignUp onSwitchToLogin={() => setShowSignUp(false)} />
            ) : (
              <Login
                onLogin={() => {
                  sessionStorage.setItem("loggedIn", "1");
                  setLoggedIn(true);
                }}
                onSwitchToSignUp={() => setShowSignUp(true)}
              />
            )
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '2rem' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson" element={<Navigate to="/lesson/1" replace />} />
          <Route 
            path="/lesson/1" 
            element={
              <LessonLayout title="HTTP Basics Concepts and Activities" onLogout={handleLogout}>
                <HTTPBasics />
              </LessonLayout>
            } 
          />
          <Route 
            path="/lesson/2" 
            element={
              <LessonLayout title="HTTP Proxies" onLogout={handleLogout}>
                <HTTPProxies />
              </LessonLayout>
            } 
          />
          <Route 
            path="/lesson/3" 
            element={
              <LessonLayout title="CIA Triad" onLogout={handleLogout}>
                <CIATriad />
              </LessonLayout>
            } 
          />
          <Route 
            path="/lesson/4" 
            element={
              <LessonLayout title="Assessment" onLogout={handleLogout}>
                <Assessment />
              </LessonLayout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
