import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

const BudgetTemplates = () => {
  const templates = [
    {
      id: 1,
      name: 'Student Budget',
      description: 'Ideal for university students with limited income and expenses.',
      categories: ['Tuition', 'Books', 'Food', 'Transport', 'Entertainment']
    },
    {
      id: 2,
      name: 'Family Budget',
      description: 'Comprehensive budget for families with multiple income sources and expenses.',
      categories: ['Housing', 'Utilities', 'Groceries', 'Education', 'Healthcare', 'Transport']
    },
    {
      id: 3,
      name: 'Savings-Focused',
      description: 'Budget template focused on maximizing savings and investments.',
      categories: ['Essentials', 'Investments', 'Emergency Fund', 'Retirement', 'Discretionary']
    }
  ]

  return (
    <Card className="report-card">
      <Card.Body>
        <Card.Title className="report-title">Budget Templates</Card.Title>
        <Card.Text>
          Start with a pre-configured budget template tailored to different financial situations.
        </Card.Text>
        
        <Row>
          {templates.map(template => (
            <Col md={4} key={template.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{template.name}</Card.Title>
                  <Card.Text>{template.description}</Card.Text>
                  <div className="mb-3">
                    <strong>Categories:</strong>
                    <ul>
                      {template.categories.map((category, index) => (
                        <li key={index}>{category}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline-primary">Use Template</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default BudgetTemplates
