import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, Alert } from 'react-bootstrap'

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const MonthlyInsights = () => {
  const { budget } = useContext(BudgetContext)
  const [chartData, setChartData] = useState(null)
  const [insights, setInsights] = useState([])
  
  useEffect(() => {
    if (budget && budget.savedBudgets && budget.savedBudgets.length > 0) {
      // Sort budgets by date
      const sortedBudgets = [...budget.savedBudgets].sort((a, b) => new Date(a.date) - new Date(b.date))
      
      // Extract data for line chart
      const labels = sortedBudgets.map(budget => {
        const date = new Date(budget.date)
        return `${date.getMonth() + 1}/${date.getFullYear()}`
      })
      
      const incomeData = sortedBudgets.map(budget => budget.income)
      const expensesData = sortedBudgets.map(budget => {
        return budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      })
      const savingsData = sortedBudgets.map(budget => budget.savings)
      
      setChartData({
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
          },
          {
            label: 'Expenses',
            data: expensesData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1
          },
          {
            label: 'Savings',
            data: savingsData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.1
          }
        ]
      })
      
      // Generate insights
      const newInsights = []
      
      // Compare current month with previous month
      if (sortedBudgets.length >= 2) {
        const currentBudget = sortedBudgets[sortedBudgets.length - 1]
        const previousBudget = sortedBudgets[sortedBudgets.length - 2]
        
        const currentExpenses = currentBudget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
        const previousExpenses = previousBudget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
        
        const expenseChange = ((currentExpenses - previousExpenses) / previousExpenses) * 100
        
        if (expenseChange > 0) {
          newInsights.push({
            type: 'warning',
            message: `Your expenses increased by ${expenseChange.toFixed(1)}% compared to last month.`
          })
        } else if (expenseChange < 0) {
          newInsights.push({
            type: 'success',
            message: `Great job! Your expenses decreased by ${Math.abs(expenseChange).toFixed(1)}% compared to last month.`
          })
        }
        
        // Check savings trend
        const savingsChange = ((currentBudget.savings - previousBudget.savings) / previousBudget.savings) * 100
        
        if (savingsChange > 10) {
          newInsights.push({
            type: 'success',
            message: `Excellent! Your savings increased by ${savingsChange.toFixed(1)}% compared to last month.`
          })
        } else if (savingsChange < 0) {
          newInsights.push({
            type: 'warning',
            message: `Your savings decreased by ${Math.abs(savingsChange).toFixed(1)}% compared to last month.`
          })
        }
      }
      
      // Add general insights based on current budget
      const currentBudget = sortedBudgets[sortedBudgets.length - 1]
      const totalExpenses = currentBudget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      
      if (currentBudget.savings < 0) {
        newInsights.push({
          type: 'danger',
          message: 'You are spending more than you earn. Consider reducing expenses.'
        })
      } else if (currentBudget.savings < (currentBudget.income * 0.1)) {
        newInsights.push({
          type: 'warning',
          message: 'Your savings are less than 10% of your income. Try to increase your savings rate.'
        })
      } else if (currentBudget.savings > (currentBudget.income * 0.3)) {
        newInsights.push({
          type: 'success',
          message: 'Great job! You are saving more than 30% of your income.'
        })
      }
      
      setInsights(newInsights)
    }
  }, [budget])

  if (!chartData) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Monthly Insights</Card.Title>
          <p>No historical budget data available. Save multiple budgets to see monthly trends and insights.</p>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Monthly Insights</Card.Title>
        
        <div style={{ height: '300px', position: 'relative', marginBottom: '20px' }}>
          <Line 
            data={chartData} 
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
        
        {insights.length > 0 ? (
          <div>
            <h5>Financial Insights</h5>
            {insights.map((insight, index) => (
              <Alert key={index} variant={insight.type}>
                {insight.message}
              </Alert>
            ))}
          </div>
        ) : (
          <p>Save more budgets to get personalized insights.</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default MonthlyInsights
