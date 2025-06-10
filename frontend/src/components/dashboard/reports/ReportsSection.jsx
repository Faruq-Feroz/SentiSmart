import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PDFDownload from './PDFDownload'
import BudgetTemplates from './BudgetTemplates'
import './ReportsSection.scss'

const ReportsSection = () => {
  return (
    <Container fluid className="reports-section">
      <h2 className="section-title">Financial Reports</h2>
      <p className="section-description">
        Generate personalized financial reports with insights and recommendations tailored to your financial habits.
      </p>
      
      <Row>
        <Col lg={12} className="mb-4">
          <PDFDownload />
        </Col>
      </Row>
      
      <Row>
        <Col lg={12} className="mb-4">
          <BudgetTemplates />
        </Col>
      </Row>
    </Container>
  )
}

export default ReportsSection