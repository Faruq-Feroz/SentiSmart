import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { DonationContext } from '../../../context/DonationContext';
import { initiateSTKPush } from '../../../services/mpesaService';

const DonateShilling = () => {
  const { user } = useContext(AuthContext);
  const { campaigns, makeDonation } = useContext(DonationContext);
  
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleSubmit = async (e) => {
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
      
      // Determine campaign ID (either selected campaign or 'general' for SentiSmart)
      const campaignId = selectedCampaign || 'general';
      
      // Initiate M-Pesa STK Push for both specific campaigns and general donations
      const response = await initiateSTKPush(phoneNumber, amount, campaignId);
      
      // If STK Push was successful, record the donation
      if (response && response.CheckoutRequestID) {
        await makeDonation(campaignId, amount, phoneNumber);
        setSuccess('Donation initiated! Please check your phone to complete the M-Pesa payment.');
      }
      
      // Reset form
      setAmount('');
      setPhoneNumber('');
      setSelectedCampaign('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // Update the Card component
    <Card className="shadow-sm donation-card">
      <Card.Body>
        <Card.Title>Make a Donation</Card.Title>
        <Card.Text>
          Your contribution helps us continue providing financial literacy tools and resources.
        </Card.Text>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Campaign (Optional)</Form.Label>
            <Form.Select 
              value={selectedCampaign} 
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              <option value="">General Donation to SentiSmart</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
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
            className="w-100 donation-button"
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
  );
};

export default DonateShilling;
