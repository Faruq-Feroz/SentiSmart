import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './WelcomeModal.scss';

const WelcomeModal = ({ show, onClose, title, message, userName, isNewUser }) => {
  // Auto-close the modal after 5 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered 
      className="welcome-modal"
      backdrop="static"
    >
      <div className={`modal-content ${isNewUser ? 'new-user' : 'returning-user'}`}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-icon">
          <FaCheckCircle />
        </div>
        
        <h2 className="modal-title">{title}</h2>
        
        <div className="user-name">{userName}</div>
        
        <p className="modal-message">{message}</p>
        
        <button className="modal-button" onClick={onClose}>
          Get Started
        </button>
      </div>
    </Modal>
  );
};

export default WelcomeModal;