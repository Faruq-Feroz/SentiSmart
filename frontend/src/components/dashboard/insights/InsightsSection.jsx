import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SpendingPatterns from './SpendingPatterns'
import MonthlyInsights from './MonthlyInsights'
import ImprovementTracking from './ImprovementTracking'
import CutbackSuggestions from './CutbackSuggestions'

const InsightsSection = () => {
  return (
    <Container fluid>
      <h2 className="mb-4">Financial Insights</h2>
      <p className="mb-4">Gain valuable insights into your financial habits and discover opportunities for improvement.</p>
      
      <Row>
        <Col lg={6} className="mb-4">
          <SpendingPatterns />
        </Col>
        <Col lg={6} className="mb-4">
          <MonthlyInsights />
        </Col>
      </Row>
      
      <Row>
        <Col lg={6} className="mb-4">
          <ImprovementTracking />
        </Col>
        <Col lg={6} className="mb-4">
          <CutbackSuggestions />
        </Col>
      </Row>
    </Container>
  )
}

export default InsightsSection