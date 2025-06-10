import React, { useState, useContext } from 'react';
import { Card, Button, Row, Col, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import { DonationContext } from '../../../context/DonationContext';
import { initiateSTKPush } from '../../../services/mpesaService';

const CampaignDetails = ({ campaign, onClose }) => {
  const { user } = useContext(AuthContext);
  const { makeDonation } = useContext(DonationContext);
  
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Calculate days remaining
  const endDate = new Date(campaign.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  
  // Calculate progress percentage
  const progressPercentage = Math.min((campaign.amountRaised / campaign.targetAmount) * 100, 100);
  
  // Share URLs
  const shareUrl = window.location.origin + '/campaign/' + campaign.id;
  const shareTitle = `Support ${campaign.title} - Donation Campaign on SentiSmart`;
  const shareMessage = `I'm supporting ${campaign.title} on SentiSmart. Join me in making a difference! ${shareUrl}`;
  
  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid donation amount');
      }
      
      if (!phoneNumber || !/^(\+254|0)\d{9}$/.test(phoneNumber)) {
        throw new Error('Please enter a valid phone number (format: 07XXXXXXXX or +2547XXXXXXXX)');
      }
      
      // Initiate M-Pesa STK Push
      const response = await initiateSTKPush(phoneNumber, amount, campaign.id);
      
      // If STK Push was successful, record the donation
      if (response && response.CheckoutRequestID) {
        await makeDonation(campaign.id, amount, phoneNumber);
        setSuccess('Donation initiated! Please check your phone to complete the M-Pesa payment.');
      }
      
      // Reset form
      setAmount('');
      setPhoneNumber('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Button 
          variant="link" 
          className="p-0 mb-3 text-decoration-none" 
          onClick={onClose}
        >
          <FaArrowLeft className="me-2" />
          Back to campaigns
        </Button>
        
        <Row>
          <Col md={8}>
            {campaign.imageUrl && (
              <img 
                src={campaign.imageUrl} 
                alt={campaign.title}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            )}
            
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2>{campaign.title}</h2>
              <Badge bg="primary" className="fs-6">{campaign.category}</Badge>
            </div>
            
            <div className="mb-4">
              <div className="progress mb-2" style={{ height: '10px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={campaign.amountRaised} 
                  aria-valuemin="0" 
                  aria-valuemax={campaign.targetAmount}
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>KSh {campaign.amountRaised.toLocaleString()}</strong> raised
                  <span className="text-muted"> of KSh {campaign.targetAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted">{daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h5>About this campaign</h5>
              <p style={{ whiteSpace: 'pre-line' }}>{campaign.description}</p>
            </div>
            
            <div className="mb-4">
              <h5>Share this campaign</h5>
              <div className="d-flex gap-2 mt-2">
                <FacebookShareButton url={shareUrl} quote={shareTitle}>
                  <Button variant="outline-primary">
                    <FaFacebook className="me-2" />
                    Facebook
                  </Button>
                </FacebookShareButton>
                
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                  <Button variant="outline-info">
                    <FaTwitter className="me-2" />
                    Twitter
                  </Button>
                </TwitterShareButton>
                
                <WhatsappShareButton url={shareUrl} title={shareMessage}>
                  <Button variant="outline-success">
                    <FaWhatsapp className="me-2" />
                    WhatsApp
                  </Button>
                </WhatsappShareButton>
                
                <EmailShareButton url={shareUrl} subject={shareTitle} body={`${campaign.description}\n\n${shareUrl}`}>
                  <Button variant="outline-secondary">
                    <FaEnvelope className="me-2" />
                    Email
                  </Button>
                </EmailShareButton>
              </div>
            </div>
            
            <div>
              <h5>Campaign by</h5>
              <p>{campaign.creatorName}</p>
              <p className="text-muted">Created on {new Date(campaign.createdAt).toLocaleDateString()}</p>
            </div>
          </Col>
          
          <Col md={4}>
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <Card.Title>Make a Donation</Card.Title>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleDonate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount (KSh)</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Enter amount" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      required 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>M-Pesa Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      placeholder="07XXXXXXXX or +2547XXXXXXXX" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required 
                    />
                    <Form.Text className="text-muted">
                      Enter the phone number linked to your M-Pesa account.
                    </Form.Text>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      'Donate Now'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CampaignDetails;