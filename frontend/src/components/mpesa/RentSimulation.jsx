import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { initiateBillPayment, saveBillPayment } from '../../services/mpesaService';
import '../../styles/mpesa.css'; // Moved the import here

const RentSimulation = () => {
  const { user } = useContext(AuthContext);
  
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePayRent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid rent amount');
      }
      
      if (!phoneNumber) {
        throw new Error('Please enter your M-Pesa phone number');
      }
      
      if (!landlordName) {
        throw new Error('Please enter your landlord\'s name');
      }
      
      if (!propertyName) {
        throw new Error('Please enter the property name or unit number');
      }
      
      // Initiate STK Push for rent payment
      const response = await initiateBillPayment(
        phoneNumber, 
        amount, 
        'Rent', 
        propertyName
      );
      
      // If STK Push was successful, record the payment
      if (response && response.CheckoutRequestID) {
        await saveBillPayment(
          user.uid,
          'Rent',
          amount,
          propertyName,
          response.CheckoutRequestID,
          'pending'
        );
        
        setSuccess('Rent payment initiated! Please check your phone to complete the M-Pesa payment.');
        
        // Reset form
        setAmount('');
        setPhoneNumber('');
        setLandlordName('');
        setPropertyName('');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Remove the import statement from here
    
    // Then update the component JSX
    <Card className="mpesa-card mb-4">
      <Card.Header as="h5">Pay Rent via M-PESA</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handlePayRent}>
          <Form.Group className="mb-3">
            <Form.Label>Landlord/Property Manager</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter landlord or property manager name"
              value={landlordName}
              onChange={(e) => setLandlordName(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Property Name/Unit Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter property name or unit number"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Rent Amount (KSh)</Form.Label>
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
          
          <Button className="mpesa-button" variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Processing...</span>
              </>
            ) : (
              'Pay Rent Now'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RentSimulation;
