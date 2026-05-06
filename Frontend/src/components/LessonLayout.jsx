import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function LessonLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get username from localStorage
  const username = localStorage.getItem("username") || "User";
  const avatarLetters = username.substring(0, 2).toUpperCase();

  const currentPathId = location.pathname.split("/").pop();
  const currentPage = parseInt(currentPathId) || 1;

  const pages = [
    { number: 1, title: "SQL Injection" },
    { number: 2, title: "Authentication" },
    { number: 3, title: "Assessment" },
    { number: 4, title: "Try It" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lesson-layout-wrapper">
      <header className="sticky-topbar">
        <div className="topbar-container">
          {/* Left: Title - Now wrapped in a container with a fixed min-width */}
          <div className="topbar-left">
            <h2 className="topbar-title">{title}</h2>
          </div>

          {/* Center: Navigation Steps - This stays centered */}
          <nav className="topbar-nav">
            {pages.map((page) => (
              <Link
                key={page.number}
                to={`/lesson/${page.number}`}
                className={`nav-step ${currentPage === page.number ? "active" : ""}`}
              >
                <span className="step-num">{page.number}</span>
                <span className="step-text">{page.title}</span>
              </Link>
            ))}
          </nav>

          {/* Right: User Profile - Matches the left width for perfect balance */}
          <div className="topbar-right" ref={dropdownRef}>
            <button
              className="user-profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="User menu"
            >
              <div className="avatar-circle">{avatarLetters}</div>
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <strong>{username}</strong>
                </div>
                <hr />
                <button
                  className="dropdown-item logout-item"
                  onClick={() => {
                    sessionStorage.removeItem("loggedIn");
                    localStorage.removeItem("username");
                    navigate("/login");
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="layout-main-content">
        <div className="lesson-content fade-in-content" key={location.pathname}>
          {children}
        </div>
      </main>
    </div>
  );
}
