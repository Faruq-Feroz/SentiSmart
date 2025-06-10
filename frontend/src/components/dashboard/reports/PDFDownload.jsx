import React, { useContext, useRef, useState } from 'react'
import { Card, Button, Row, Col, ProgressBar, Table } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'
import { BudgetContext } from '../../../context/BudgetContext'
import { SavingsContext } from '../../../context/SavingsContext'
import { Pie, Bar } from 'react-chartjs-2'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const PDFDownload = () => {
  const { user } = useContext(AuthContext)
  const { budget } = useContext(BudgetContext)
  const { savingsGoals } = useContext(SavingsContext)
  const [loading, setLoading] = useState(false)
  const reportRef = useRef(null)

  // Calculate total expenses
  const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Calculate financial health score (simple algorithm)
  const calculateFinancialScore = () => {
    if (budget.income === 0) return 0
    
    // Factors to consider
    const savingsRatio = budget.savings / budget.income // Higher is better
    const expenseRatio = totalExpenses / budget.income // Lower is better
    const hasSavingsGoals = savingsGoals.length > 0 // Having goals is good
    const diversifiedExpenses = new Set(budget.expenses.map(e => e.category)).size > 3 // Diverse spending is good
    
    // Calculate base score
    let score = 50 // Start at neutral
    
    // Adjust based on savings ratio (0-30 points)
    if (savingsRatio >= 0.3) score += 30
    else if (savingsRatio >= 0.2) score += 25
    else if (savingsRatio >= 0.15) score += 20
    else if (savingsRatio >= 0.1) score += 15
    else if (savingsRatio >= 0.05) score += 10
    else if (savingsRatio > 0) score += 5
    
    // Adjust based on expense ratio (0-10 points)
    if (expenseRatio <= 0.5) score += 10
    else if (expenseRatio <= 0.7) score += 5
    else if (expenseRatio > 0.9) score -= 5
    
    // Bonus points
    if (hasSavingsGoals) score += 5
    if (diversifiedExpenses) score += 5
    
    // Ensure score is between 0-100
    return Math.min(Math.max(Math.round(score), 0), 100)
  }
  
  const financialScore = calculateFinancialScore()
  
  // Get financial health label based on score
  const getFinancialHealthLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Fair'
    if (score >= 50) return 'Needs Improvement'
    if (score >= 30) return 'Concerning'
    return 'Critical'
  }
  
  // Generate personalized advice based on budget data
  const generatePersonalizedAdvice = () => {
    const advice = []
    
    // Check savings ratio
    const savingsRatio = budget.savings / budget.income
    if (savingsRatio < 0.1) {
      advice.push('Consider increasing your savings to at least 10% of your income for better financial security.')
    }
    
    // Check for high expense categories
    const expensesByCategory = {}
    budget.expenses.forEach(expense => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0
      }
      expensesByCategory[expense.category] += expense.amount
    })
    
    const highExpenseCategories = Object.entries(expensesByCategory)
      .filter(([_, amount]) => amount > budget.income * 0.3)
      .map(([category]) => category)
    
    if (highExpenseCategories.length > 0) {
      advice.push(`Your spending in ${highExpenseCategories.join(', ')} is relatively high. Consider reviewing these expenses for potential savings.`)
    }
    
    // Check for savings goals
    if (savingsGoals.length === 0) {
      advice.push('Setting specific savings goals can help you stay motivated and track your progress better.')
    }
    
    // Add general advice if specific advice is limited
    if (advice.length < 3) {
      advice.push('Regularly review your budget to ensure it aligns with your financial goals and priorities.')
      advice.push('Consider diversifying your income sources to increase financial stability.')
    }
    
    return advice
  }
  
  const personalizedAdvice = generatePersonalizedAdvice()
  
  // Prepare chart data for expenses by category
  const prepareExpenseChartData = () => {
    const categories = {}
    budget.expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0
      }
      categories[expense.category] += expense.amount
    })
    
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#8AC249'
          ],
          borderWidth: 1
        }
      ]
    }
  }
  
  // Prepare chart data for income vs expenses
  const prepareIncomeExpenseData = () => {
    return {
      labels: ['Income', 'Expenses', 'Savings'],
      datasets: [
        {
          label: 'Amount (KSh)',
          data: [budget.income, totalExpenses, budget.savings],
          backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB']
        }
      ]
    }
  }
  
  // Handle PDF generation
  const generatePDF = async () => {
    if (!reportRef.current) return
    
    setLoading(true)
    
    try {
      const reportElement = reportRef.current
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Calculate dimensions to fit A4 page
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      
      // Generate filename with user name and date
      const userName = user?.displayName || 'User'
      const date = new Date().toISOString().split('T')[0]
      const fileName = `${userName}_Financial_Report_${date}.pdf`
      
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Card className="report-card">
      <Card.Body>
        <Card.Title className="report-title">Personalized Financial Report</Card.Title>
        <Card.Text>
          Generate a comprehensive financial report with personalized insights and recommendations based on your budget data.
        </Card.Text>
        
        <div className="pdf-report" ref={reportRef}>
          <div className="pdf-header">
            <h2>SentiSmart Financial Report</h2>
            <p>Prepared for: {user?.displayName || 'User'}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Financial Health Score</h3>
            <div className="financial-score">{financialScore}</div>
            <div className="score-label">{getFinancialHealthLabel(financialScore)}</div>
            <ProgressBar 
              now={financialScore} 
              variant={financialScore >= 70 ? 'success' : financialScore >= 50 ? 'warning' : 'danger'} 
              style={{ height: '10px', marginBottom: '20px' }}
            />
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Budget Summary</h3>
            <Row>
              <Col md={6}>
                <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <td><strong>Monthly Income</strong></td>
                      <td>KSh {budget.income.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Total Expenses</strong></td>
                      <td>KSh {totalExpenses.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Savings</strong></td>
                      <td>KSh {budget.savings.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td><strong>Savings Rate</strong></td>
                      <td>{budget.income ? Math.round((budget.savings / budget.income) * 100) : 0}%</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <div className="chart-container">
                  <Bar 
                    data={prepareIncomeExpenseData()} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }} 
                  />
                </div>
              </Col>
            </Row>
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Expense Breakdown</h3>
            <Row>
              <Col md={6}>
                <div className="chart-container">
                  <Pie 
                    data={prepareExpenseChartData()} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false 
                    }} 
                  />
                </div>
              </Col>
              <Col md={6}>
                <div>
                  {Object.entries(budget.expenses.reduce((acc, expense) => {
                    if (!acc[expense.category]) acc[expense.category] = 0
                    acc[expense.category] += expense.amount
                    return acc
                  }, {})).map(([category, amount], index) => (
                    <div className="expense-item" key={index}>
                      <span className="expense-category">{category}</span>
                      <span className="expense-amount">KSh {amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Personalized Recommendations</h3>
            {personalizedAdvice.map((advice, index) => (
              <div className="advice-item" key={index}>
                {advice}
              </div>
            ))}
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Savings Goals</h3>
            {savingsGoals.length > 0 ? (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Target Amount</th>
                    <th>Current Amount</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsGoals.map((goal, index) => (
                    <tr key={index}>
                      <td>{goal.name}</td>
                      <td>KSh {goal.targetAmount.toLocaleString()}</td>
                      <td>KSh {goal.currentAmount.toLocaleString()}</td>
                      <td>
                        <ProgressBar 
                          now={Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)} 
                          variant="success" 
                          style={{ height: '8px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No savings goals set. Consider creating savings goals to track your progress.</p>
            )}
          </div>
          
          <div className="pdf-section">
            <h3 className="pdf-section-title">Next Steps</h3>
            <ul>
              <li>Review your budget regularly and adjust as needed</li>
              <li>Track your expenses to identify areas for improvement</li>
              <li>Set specific, measurable financial goals</li>
              <li>Consider consulting with a financial advisor for personalized guidance</li>
            </ul>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>
            <p>Generated by SentiSmart Financial Assistant</p>
          </div>
        </div>
        
        <Button 
          className="pdf-download-btn" 
          onClick={generatePDF} 
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download PDF Report'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default PDFDownload
