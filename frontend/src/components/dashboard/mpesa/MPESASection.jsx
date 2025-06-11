import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import RentSimulation from '../../mpesa/RentSimulation';
import UtilitySimulation from '../../mpesa/UtilitySimulation';

const MPESASection = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>M-PESA Bill Payments</h2>
          <p className="text-muted">
            Pay your rent and utility bills directly through M-PESA.
          </p>
          <Alert variant="info">
            <Alert.Heading>M-PESA Payment System</Alert.Heading>
            <p>
              You can use this feature to manage your bills through mobile money platforms.
            </p>
          </Alert>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4">
          <RentSimulation />
        </Col>
        <Col md={6} className="mb-4">
          <UtilitySimulation />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header as="h5">Payment History</Card.Header>
            <Card.Body>
              <p>Your bill payment history will appear here once you've made payments.</p>
              {/* In a real implementation, you would fetch and display payment history here */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MPESASection;