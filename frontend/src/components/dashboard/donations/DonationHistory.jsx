import React, { useContext } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { DonationContext } from '../../../context/DonationContext';

const DonationHistory = () => {
  const { user } = useContext(AuthContext);
  const { donations, campaigns } = useContext(DonationContext);
  
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Card.Title>Donation History</Card.Title>
          <Card.Text>
            Please log in to view your donation history.
          </Card.Text>
          <Button variant="primary" href="/login">
            Log In
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  // If user has no donations, show empty state
  if (donations.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Card.Title>Donation History</Card.Title>
          <Card.Text>
            You haven't made any donations yet.
          </Card.Text>
          <Button variant="primary" onClick={() => window.location.href = '/dashboard/donations?tab=campaigns'}>
            Browse Campaigns
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  // Get campaign details for each donation
  const donationsWithCampaigns = donations.map(donation => {
    const campaign = campaigns.find(c => c.id === donation.campaignId) || {
      title: donation.campaignId === 'general' ? 'General Donation to SentiSmart' : 'Unknown Campaign'
    };
    return { ...donation, campaignTitle: campaign.title };
  });
  
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Donation History</Card.Title>
        <Card.Text>
          View all your donations to campaigns and causes.
        </Card.Text>
        
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Campaign</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationsWithCampaigns.map(donation => (
              <tr key={donation.id}>
                <td>{new Date(donation.timestamp).toLocaleDateString()}</td>
                <td>{donation.campaignTitle}</td>
                <td>KSh {parseFloat(donation.amount).toLocaleString()}</td>
                <td>
                  <Badge bg={donation.status === 'completed' ? 'success' : 'warning'}>
                    {donation.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default DonationHistory;
