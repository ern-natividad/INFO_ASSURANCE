import React from 'react';
import { Link } from 'react-router-dom';
import LessonNavigation from '../components/LessonNavigation.jsx';

export default function LessonLayout({ children, title }) {
  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2>{title}</h2>
        <Link to="/login" className="logout-btn">
          🚪 Logout
        </Link>
      </div>
      
      <LessonNavigation />

      {/* Page Content */}
      <div className="lesson-content">
        {children}
      </div>
    </div>
  );
}
