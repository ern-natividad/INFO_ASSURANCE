import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonNavigation from '../components/LessonNavigation.jsx';

export default function LessonLayout({ children, title, onLogout = () => {} }) {
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  const handleSignUp = () => {
    onLogout();
    // The sign up state will be handled by the app when logging back in
    navigate('/login', { replace: true });
  };

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2>{title}</h2>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            className="logout-btn"
            style={{ cursor: 'pointer' }}
          >
            🚪 Menu
          </button>
          {showLogoutMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              minWidth: '150px'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      <LessonNavigation />

      {/* Page Content */}
      <div className="lesson-content">
        {children}
      </div>
    </div>
  );
}
