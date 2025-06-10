import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import { SavingsContext } from '../../../context/SavingsContext'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { Card, ProgressBar, Row, Col } from 'react-bootstrap'

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const ImprovementTracking = () => {
  const { budget } = useContext(BudgetContext)
  const { savingsGoals } = useContext(SavingsContext)
  const [radarData, setRadarData] = useState(null)
  const [scores, setScores] = useState(null)
  
  useEffect(() => {
    if (budget) {
      // Calculate financial health scores
      const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      const savingsRate = budget.income > 0 ? (budget.savings / budget.income) * 100 : 0
      
      // Calculate expense diversity (how spread out expenses are across categories)
      const categories = {}
      budget.expenses.forEach(expense => {
        if (categories[expense.category]) {
          categories[expense.category] += expense.amount
        } else {
          categories[expense.category] = expense.amount
        }
      })
      
      const categoryCount = Object.keys(categories).length
      const diversityScore = Math.min(categoryCount * 10, 100) // More categories = better diversity
      
      // Calculate debt-to-income ratio (simplified)
      const debtExpenses = budget.expenses.filter(expense => 
        expense.category === 'Debt' || expense.category === 'Loan' || expense.category === 'Credit'
      ).reduce((sum, expense) => sum + expense.amount, 0)
      
      const debtToIncomeRatio = budget.income > 0 ? (debtExpenses / budget.income) * 100 : 0
      const debtScore = 100 - Math.min(debtToIncomeRatio * 2, 100) // Lower debt ratio = better score
      
      // Calculate savings goal progress
      const savingsGoalProgress = savingsGoals.length > 0 ?
        savingsGoals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount) * 100, 0) / savingsGoals.length :
        0
      
      // Calculate budget adherence based on saved budgets
      let budgetAdherenceScore = 50 // Default
      if (budget.savedBudgets && budget.savedBudgets.length > 1) {
        // Compare actual vs planned expenses in past budgets
        budgetAdherenceScore = 75 // Simplified for this implementation
      }
      
      // Set financial health scores
      const newScores = {
        savingsRate: Math.min(savingsRate * 3, 100), // 33% savings = 100 score
        expenseDiversity: diversityScore,
        debtManagement: debtScore,
        savingsGoalProgress: Math.min(savingsGoalProgress, 100),
        budgetAdherence: budgetAdherenceScore
      }
      
      setScores(newScores)
      
      // Create radar chart data
      setRadarData({
        labels: ['Savings Rate', 'Expense Diversity', 'Debt Management', 'Savings Goals', 'Budget Adherence'],
        datasets: [
          {
            label: 'Financial Health',
            data: [
              newScores.savingsRate,
              newScores.expenseDiversity,
              newScores.debtManagement,
              newScores.savingsGoalProgress,
              newScores.budgetAdherence
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      })
    }
  }, [budget, savingsGoals])

  if (!radarData || !scores) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Financial Health Tracking</Card.Title>
          <p>Add budget and savings data to see your financial health metrics.</p>
        </Card.Body>
      </Card>
    )
  }

  // Calculate overall financial health score
  const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.values(scores).length
  
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Financial Health Tracking</Card.Title>
        
        <Row className="mb-4">
          <Col md={4}>
            <h5 className="text-center">Overall Financial Health</h5>
            <div className="text-center mb-2">
              <h2>{Math.round(overallScore)}%</h2>
            </div>
            <ProgressBar 
              now={overallScore} 
              variant={overallScore > 75 ? 'success' : overallScore > 50 ? 'info' : overallScore > 25 ? 'warning' : 'danger'} 
              style={{ height: '20px' }}
            />
          </Col>
          <Col md={8}>
            <div style={{ height: '250px', position: 'relative' }}>
              <Radar 
                data={radarData} 
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20
                      }
                    }
                  }
                }} 
              />
            </div>
          </Col>
        </Row>
        
        <h5>Financial Health Metrics</h5>
        <Row>
          <Col md={6}>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Savings Rate</span>
                <span>{Math.round(scores.savingsRate)}%</span>
              </div>
              <ProgressBar now={scores.savingsRate} variant="success" />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Expense Diversity</span>
                <span>{Math.round(scores.expenseDiversity)}%</span>
              </div>
              <ProgressBar now={scores.expenseDiversity} variant="info" />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Debt Management</span>
                <span>{Math.round(scores.debtManagement)}%</span>
              </div>
              <ProgressBar now={scores.debtManagement} variant="warning" />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Savings Goals Progress</span>
                <span>{Math.round(scores.savingsGoalProgress)}%</span>
              </div>
              <ProgressBar now={scores.savingsGoalProgress} variant="success" />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Budget Adherence</span>
                <span>{Math.round(scores.budgetAdherence)}%</span>
              </div>
              <ProgressBar now={scores.budgetAdherence} variant="info" />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ImprovementTracking
