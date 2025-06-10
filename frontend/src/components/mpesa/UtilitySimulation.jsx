import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { initiateBillPayment, saveBillPayment } from '../../services/mpesaService';

const UtilitySimulation = () => {
  const { user } = useContext(AuthContext);
  
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [utilityType, setUtilityType] = useState('electricity');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePayUtility = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }
      
      if (!phoneNumber) {
        throw new Error('Please enter your M-Pesa phone number');
      }
      
      if (!accountNumber) {
        throw new Error('Please enter your account/meter number');
      }
      
      // Initiate STK Push for utility payment
      const response = await initiateBillPayment(
        phoneNumber, 
        amount, 
        utilityType, 
        accountNumber
      );
      
      // If STK Push was successful, record the payment
      if (response && response.CheckoutRequestID) {
        await saveBillPayment(
          user.uid,
          utilityType,
          amount,
          accountNumber,
          response.CheckoutRequestID,
          'pending'
        );
        
        setSuccess(`${utilityType.charAt(0).toUpperCase() + utilityType.slice(1)} bill payment initiated! Please check your phone to complete the M-Pesa payment.`);
        
        // Reset form
        setAmount('');
        setPhoneNumber('');
        setAccountNumber('');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Pay Utility Bills via M-PESA</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handlePayUtility}>
          <Form.Group className="mb-3">
            <Form.Label>Utility Type</Form.Label>
            <Form.Select 
              value={utilityType}
              onChange={(e) => setUtilityType(e.target.value)}
              required
            >
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="internet">Internet</option>
              <option value="tv">TV Subscription</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Account/Meter Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter account or meter number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Amount (KSh)</Form.Label>
            <InputGroup>
              <InputGroup.Text>KSh</InputGroup.Text>
              <Form.Control 
                type="number" 
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </InputGroup>
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
          
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Processing...</span>
              </>
            ) : (
              'Pay Bill Now'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UtilitySimulation;
