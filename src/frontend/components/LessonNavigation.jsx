import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function LessonNavigation() {
  const location = useLocation();
  const currentPage = parseInt(location.pathname.split('/').pop()) || 1;
  const totalPages = 4;

  const pages = [
    { number: 1, title: "HTTP Basics" },
    { number: 2, title: "HTTP Proxies" },
    { number: 3, title: "CIA Triad" },
    { number: 4, title: "Assessment" }
  ];

  return (
    <div>
      {/* Pagination Navigation */}
      <div className="pagination-nav">
        <Link 
          to={`/lesson/${currentPage - 1}`}
          className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={(e) => currentPage === 1 && e.preventDefault()}
        >
          ← Previous
        </Link>
        
        <div className="page-indicator">
          Page {currentPage} of {totalPages}
        </div>
        
        <Link 
          to={`/lesson/${currentPage + 1}`}
          className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={(e) => currentPage === totalPages && e.preventDefault()}
        >
          Next →
        </Link>
      </div>

      {/* Page Tabs */}
      <div className="page-tabs">
        {pages.map((page) => (
          <Link
            key={page.number}
            to={`/lesson/${page.number}`}
            className={`tab-btn ${currentPage === page.number ? 'active' : ''}`}
          >
            {page.number}. {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
