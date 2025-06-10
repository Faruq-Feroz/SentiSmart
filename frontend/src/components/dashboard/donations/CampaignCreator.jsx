import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { DonationContext } from '../../../context/DonationContext';

const CampaignCreator = () => {
  const { user } = useContext(AuthContext);
  const { createCampaign, loading: contextLoading } = useContext(DonationContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    endDate: '',
    category: 'personal',
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate inputs
      if (!formData.title.trim()) {
        throw new Error('Please enter a campaign title');
      }
      
      if (!formData.description.trim()) {
        throw new Error('Please enter a campaign description');
      }
      
      if (!formData.targetAmount || isNaN(formData.targetAmount) || parseFloat(formData.targetAmount) <= 0) {
        throw new Error('Please enter a valid target amount');
      }
      
      if (!formData.endDate) {
        throw new Error('Please select an end date for your campaign');
      }
      
      // Ensure end date is in the future
      const endDate = new Date(formData.endDate);
      const today = new Date();
      if (endDate <= today) {
        throw new Error('End date must be in the future');
      }
      
      // Create the campaign
      const newCampaign = await createCampaign({
        ...formData,
        targetAmount: parseFloat(formData.targetAmount)
      });
      
      setSuccess(`Campaign "${newCampaign.title}" created successfully!`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        targetAmount: '',
        endDate: '',
        category: 'personal',
        imageUrl: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Card.Title>Create a Donation Campaign</Card.Title>
          <Card.Text>
            Please log in to create a donation campaign.
          </Card.Text>
          <Button variant="primary" href="/login">
            Log In
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Create a Donation Campaign</Card.Title>
        <Card.Text>
          Set up a campaign to raise funds for a cause you care about.
        </Card.Text>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Campaign Title</Form.Label>
            <Form.Control 
              type="text" 
              name="title"
              placeholder="Enter a compelling title" 
              value={formData.title} 
              onChange={handleChange}
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              name="description"
              rows={4}
              placeholder="Describe your campaign and why people should donate" 
              value={formData.description} 
              onChange={handleChange}
              required 
            />
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Target Amount (KSh)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="targetAmount"
                  placeholder="Enter target amount" 
                  value={formData.targetAmount} 
                  onChange={handleChange}
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="endDate"
                  value={formData.endDate} 
                  onChange={handleChange}
                  required 
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select 
              name="category"
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="personal">Personal</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency Relief</option>
              <option value="community">Community Project</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Campaign Image URL (Optional)</Form.Label>
            <Form.Control 
              type="url" 
              name="imageUrl"
              placeholder="Enter image URL" 
              value={formData.imageUrl} 
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Add an image to make your campaign more appealing.
            </Form.Text>
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading || contextLoading}
            className="w-100"
          >
            {(loading || contextLoading) ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-2">Creating Campaign...</span>
              </>
            ) : (
              'Create Campaign'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CampaignCreator;