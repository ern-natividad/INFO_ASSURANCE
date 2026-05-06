import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import LessonLayout from "./components/LessonLayout.jsx";
import SQLInjection from "./pages/SQLInjection.jsx";
import BrokenAuthentication from "./pages/BrokenAuthentication.jsx";
import InjectionAuthAssessement from "./pages/InjectionAuthAssessement.jsx";
import TryItActivities from "./pages/TryItActivities.jsx";

const pages = [
  { number: 1, title: "SQL Injection Fundamentals" },
  { number: 2, title: "Broken Authentication" },
  { number: 3, title: "Injection & Auth Assessment" },
  { number: 4, title: "Try It Activities" },
];

function Dashboard() {
  return (
    <div className="login-root">
      <div className="login-form dashboard-card dashboard-extra-wide">
        <div className="welcome-section centered-content">
          <div className="celebration-emoji">🔐</div>
          <h1 className="welcome-title-large">Authentication Successful</h1>
          <p className="welcome-subtitle-large">
            Your account is verified and secure. You now have full access to the
            WebGoat security curriculum and interactive labs.
          </p>
        </div>

        <div className="action-area centered-content">
          <Link to="/login" className="submit lesson-link-btn-large">
            Start Learning Now
          </Link>
        </div>
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
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/lesson"
              element={<Navigate to="/lesson/1" replace />}
            />
            {pages.map((page) => (
              <Route
                key={page.number}
                path={`/lesson/${page.number}`}
                element={
                  <LessonLayout title={page.title}>
                    {page.number === 1 && <SQLInjection />}
                    {page.number === 2 && <BrokenAuthentication />}
                    {page.number === 3 && <InjectionAuthAssessement />}
                    {page.number === 4 && <TryItActivities />}
                  </LessonLayout>
                }
              />
            ))}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
