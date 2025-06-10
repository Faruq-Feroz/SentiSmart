import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { Card, Row, Col } from 'react-bootstrap'

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const SpendingPatterns = () => {
  const { budget } = useContext(BudgetContext)
  const [pieData, setPieData] = useState(null)
  const [barData, setBarData] = useState(null)
  
  useEffect(() => {
    if (budget && budget.expenses && budget.expenses.length > 0) {
      // Process data for pie chart
      const categories = {}
      budget.expenses.forEach(expense => {
        if (categories[expense.category]) {
          categories[expense.category] += expense.amount
        } else {
          categories[expense.category] = expense.amount
        }
      })
      
      const categoryLabels = Object.keys(categories)
      const categoryValues = Object.values(categories)
      
      // Create pie chart data
      setPieData({
        labels: categoryLabels,
        datasets: [
          {
            label: 'Spending by Category',
            data: categoryValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })
      
      // Create bar chart data for top expenses
      const sortedExpenses = [...budget.expenses].sort((a, b) => b.amount - a.amount).slice(0, 5)
      
      setBarData({
        labels: sortedExpenses.map(expense => expense.description),
        datasets: [
          {
            label: 'Top Expenses',
            data: sortedExpenses.map(expense => expense.amount),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      })
    }
  }, [budget])

  if (!pieData || !barData) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Spending Patterns</Card.Title>
          <p>No expense data available. Add some expenses to see your spending patterns.</p>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Spending Patterns</Card.Title>
        <Row>
          <Col md={6}>
            <h5 className="text-center mb-3">Spending by Category</h5>
            <div style={{ height: '300px', position: 'relative' }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </Col>
          <Col md={6}>
            <h5 className="text-center mb-3">Top Expenses</h5>
            <div style={{ height: '300px', position: 'relative' }}>
              <Bar 
                data={barData} 
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Amount'
                      }
                    }
                  }
                }} 
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SpendingPatterns
