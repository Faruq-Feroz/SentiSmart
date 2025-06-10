import React, { useContext } from 'react';
import { Card, Button, Badge, Row, Col, Alert } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { DonationContext } from '../../../context/DonationContext';

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const { userCampaigns, deleteCampaign } = useContext(DonationContext);
  
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Card.Title>My Campaigns</Card.Title>
          <Card.Text>
            Please log in to view your campaigns.
          </Card.Text>
          <Button variant="primary" href="/login">
            Log In
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  // If user has no campaigns, show empty state
  if (userCampaigns.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Card.Title>My Campaigns</Card.Title>
          <Card.Text>
            You haven't created any campaigns yet.
          </Card.Text>
          <Button variant="primary" onClick={() => window.location.href = '/dashboard/donations?tab=create'}>
            Create a Campaign
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Campaigns</h4>
        <Button variant="primary" size="sm" onClick={() => window.location.href = '/dashboard/donations?tab=create'}>
          Create New Campaign
        </Button>
      </div>
      
      <Row xs={1} className="g-4">
        {userCampaigns.map(campaign => {
          // Calculate progress percentage
          const progressPercentage = Math.min((campaign.amountRaised / campaign.targetAmount) * 100, 100);
          
          // Calculate days remaining
          const endDate = new Date(campaign.endDate);
          const today = new Date();
          const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
          
          return (
            <Col key={campaign.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      {campaign.imageUrl ? (
                        <img 
                          src={campaign.imageUrl} 
                          alt={campaign.title}
                          className="img-fluid rounded"
                          style={{ height: '120px', width: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ height: '120px' }}
                        >
                          <span className="text-muted">No Image</span>
                        </div>
                      )}
                    </Col>
                    <Col md={9}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="mb-1">{campaign.title}</h5>
                          <div className="mb-2">
                            <Badge bg="primary" className="me-2">{campaign.category}</Badge>
                            <Badge bg={campaign.status === 'active' ? 'success' : 'secondary'}>
                              {campaign.status === 'active' ? 'Active' : 'Ended'}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this campaign?')) {
                                deleteCampaign(campaign.id);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="progress mb-2">
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
                            <strong>KSh {campaign.amountRaised.toLocaleString()}</strong>
                            <span className="text-muted"> of KSh {campaign.targetAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted">{daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted">
                            Created on {new Date(campaign.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <div>
                          <small className="text-muted me-3">
                            {campaign.donations.length} donation{campaign.donations.length !== 1 ? 's' : ''}
                          </small>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => window.location.href = `/dashboard/donations?tab=campaigns&id=${campaign.id}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default MyCampaigns;