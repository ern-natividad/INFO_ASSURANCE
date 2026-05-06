import React from 'react';

const AlertModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  const getTypeIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="alert-modal-content animate-pop" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-indicator-bar ${type}`} />
        
        <div className="alert-modal-inner">
          <div className="alert-modal-main">
            <span className="alert-type-icon">{getTypeIcon()}</span>
            <h3 className="alert-modal-title">{title}</h3>
            <p className="alert-modal-message">{message}</p>
          </div>
          
          <div className="alert-modal-actions">
            <button className={`alert-action-btn ${type}`} onClick={onClose}>
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;