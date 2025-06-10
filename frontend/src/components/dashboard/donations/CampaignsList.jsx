import React, { useContext, useState } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { DonationContext } from '../../../context/DonationContext';
import CampaignDetails from './CampaignDetails';

const CampaignsList = () => {
  const { campaigns } = useContext(DonationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // Filter campaigns based on search term and category
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter;
    return matchesSearch && matchesCategory && campaign.status === 'active';
  });
  
  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };
  
  const handleCloseDetails = () => {
    setSelectedCampaign(null);
  };
  
  // If a campaign is selected, show its details
  if (selectedCampaign) {
    return <CampaignDetails campaign={selectedCampaign} onClose={handleCloseDetails} />;
  }
  
  return (
    <div>
      <div className="mb-4">
        <Row>
          <Col md={8}>
            <InputGroup>
              <Form.Control
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency Relief</option>
              <option value="community">Community Project</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-5">
          <h4>No campaigns found</h4>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCampaigns.map(campaign => (
            <Col key={campaign.id}>
              <Card className="h-100 shadow-sm">
                {campaign.imageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={campaign.imageUrl} 
                    alt={campaign.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{campaign.title}</Card.Title>
                    <Badge bg="primary">{campaign.category}</Badge>
                  </div>
                  <Card.Text>
                    {campaign.description.length > 100
                      ? `${campaign.description.substring(0, 100)}...`
                      : campaign.description}
                  </Card.Text>
                  <div className="mb-3">
                    <div className="progress mb-2">
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${Math.min((campaign.amountRaised / campaign.targetAmount) * 100, 100)}%` }}
                        aria-valuenow={campaign.amountRaised} 
                        aria-valuemin="0" 
                        aria-valuemax={campaign.targetAmount}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small>KSh {campaign.amountRaised.toLocaleString()}</small>
                      <small>KSh {campaign.targetAmount.toLocaleString()}</small>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      By {campaign.creatorName}
                    </small>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleViewDetails(campaign)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CampaignsList;