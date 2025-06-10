import React, { useState } from 'react';
import { FaWhatsapp, FaComment, FaTimes } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';

const FloatingIcons = () => {
  const [showChatForm, setShowChatForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email and message to your backend
    console.log('Email:', email, 'Message:', message);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMessage('');
      setShowChatForm(false);
    }, 3000);
  };

  return (
    <div className="floating-icons-container">
      {/* WhatsApp Icon */}
      <a 
        href="https://wa.me/254742186963" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-icon whatsapp-icon"
        title="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Chat Icon */}
      <button 
        className="floating-icon chat-icon"
        onClick={() => setShowChatForm(!showChatForm)}
        title="Send us a message"
      >
        {showChatForm ? <FaTimes /> : <FaComment />}
      </button>

      {/* Chat Form */}
      {showChatForm && (
        <div className="chat-form-container">
          {!submitted ? (
            <Form onSubmit={handleSubmit}>
              <h5>Send us a message</h5>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Send Message
              </Button>
            </Form>
          ) : (
            <div className="success-message">
              <p>Thank you for your message!</p>
              <p>We'll get back to you soon.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingIcons;