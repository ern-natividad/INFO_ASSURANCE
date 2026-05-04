import React from 'react';
import LessonNavigation from '../components/LessonNavigation.jsx';

export default function LessonLayout({ children, title }) {
  return (
    <div className="lesson-container">
      <h2>WebGoat Security Lesson: SQL Injection</h2>
      
      <LessonNavigation />

      {/* Page Content */}
      <div className="lesson-content">
        {children}
      </div>
    </div>
  );
}
