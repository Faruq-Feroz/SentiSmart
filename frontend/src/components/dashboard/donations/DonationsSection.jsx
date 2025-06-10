import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import DonateShilling from './DonateShilling';
import DonationHistory from './DonationHistory';
import CampaignCreator from './CampaignCreator';
import CampaignsList from './CampaignsList';
import MyCampaigns from './MyCampaigns';
import { DonationProvider } from '../../../context/DonationContext';

const DonationsSection = () => {
  const [activeTab, setActiveTab] = useState('donate');

  return (
    <DonationProvider>
      <Container className="py-4">
        <h2 className="mb-4">Donations & Campaigns</h2>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="donate" title="Donate">
            <DonateShilling />
          </Tab>
          <Tab eventKey="campaigns" title="Browse Campaigns">
            <CampaignsList />
          </Tab>
          <Tab eventKey="create" title="Create Campaign">
            <CampaignCreator />
          </Tab>
          <Tab eventKey="my-campaigns" title="My Campaigns">
            <MyCampaigns />
          </Tab>
          <Tab eventKey="history" title="Donation History">
            <DonationHistory />
          </Tab>
        </Tabs>
      </Container>
    </DonationProvider>
  );
};

export default DonationsSection;