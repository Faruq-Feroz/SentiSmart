import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './WelcomeModal.scss';

const WelcomeModal = ({ show, onClose, title, message, isNewUser }) => {
  // Get user from AuthContext
  const { user } = useContext(AuthContext);
  
  // Get user's name from auth context or fallback to props
  const userName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Valued Customer');
  
  // Auto-close the modal after 5 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  // Example stats to display
  const stats = [
    { number: '85%', label: 'Users save more' },
    { number: '24/7', label: 'Financial insights' },
  ];

  if (!show) return null;

  return (
    <div className="welcomeModal">
      <div className="welcomeModalContent">
        <button className="closeButton" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modalIcon">
          <FaCheckCircle />
        </div>
        
        <h2>{title}</h2>
        <h3>Hello, {userName}!</h3>
        
        <p>{message}</p>
        
        <div className="welcomeStats">
          {stats.map((stat, index) => (
            <div className="welcomeStat" key={index}>
              <span className="welcomeStatNumber">{stat.number}</span>
              <span className="welcomeStatLabel">{stat.label}</span>
            </div>
          ))}
        </div>
        
        <button className="welcomeButton" onClick={onClose}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;