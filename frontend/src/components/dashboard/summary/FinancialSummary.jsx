import React, { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import './SummaryStyles.css'

const FinancialSummary = () => {
  const { budget } = useContext(BudgetContext)
  const [status, setStatus] = useState('Good')
  const [tips, setTips] = useState([])

  // Calculate total expenses
  const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Calculate savings
  const savings = budget.income - totalExpenses
  
  // Calculate savings percentage
  const savingsPercentage = budget.income > 0 ? (savings / budget.income) * 100 : 0
  
  // Determine financial status
  useEffect(() => {
    if (savingsPercentage >= 20) {
      setStatus('Good')
    } else if (savingsPercentage > 0) {
      setStatus('Needs Work')
    } else {
      setStatus('Overspending')
    }
    
    // Generate tips based on financial situation
    generateTips()
  }, [budget, savingsPercentage])
  
  // Generate personalized tips
  const generateTips = () => {
    const newTips = []
    
    // Income-based tips
    if (budget.income === 0) {
      newTips.push('Please enter your monthly income to get personalized advice.')
    }
    
    // Savings-based tips
    if (savingsPercentage < 20 && budget.income > 0) {
      newTips.push('Aim to save at least 20% of your income each month for financial security.')
    }
    
    if (savingsPercentage < 0) {
      newTips.push('Your expenses exceed your income. Consider reducing non-essential spending.')
    }
    
    // Expense-based tips
    const housingExpenses = budget.expenses
      .filter(exp => exp.category === 'Housing/Rent')
      .reduce((sum, exp) => sum + exp.amount, 0)
    
    if (housingExpenses > budget.income * 0.4 && budget.income > 0) {
      newTips.push('Your housing costs exceed 40% of your income. This might be stretching your budget too thin.')
    }
    
    const foodExpenses = budget.expenses
      .filter(exp => exp.category === 'Food')
      .reduce((sum, exp) => sum + exp.amount, 0)
    
    if (foodExpenses > budget.income * 0.3 && budget.income > 0) {
      newTips.push("You're spending over 30% of your income on food. Consider meal planning to reduce costs.")
    }
    
    // General tips
    if (newTips.length === 0) {
      newTips.push('Great job managing your finances! Consider investing your extra savings.')
    }
    
    setTips(newTips)
  }

  // Get status badge class
  const getStatusClass = () => {
    switch (status) {
      case 'Good':
        return 'status-good'
      case 'Needs Work':
        return 'status-warning'
      case 'Overspending':
        return 'status-danger'
      default:
        return ''
    }
  }

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h3>Financial Summary</h3>
        <div className={`status-badge ${getStatusClass()}`}>{status}</div>
      </div>
      
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Monthly Income:</span>
          <span className="stat-value">${budget.income.toFixed(2)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Total Expenses:</span>
          <span className="stat-value">${totalExpenses.toFixed(2)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Remaining Savings:</span>
          <span className="stat-value ${savings < 0 ? 'negative' : ''}">
            ${savings.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-label">
          <span>Spending: {Math.min(100, (totalExpenses / budget.income * 100) || 0).toFixed(0)}% of income</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${Math.min(100, (totalExpenses / budget.income * 100) || 0)}%`,
              backgroundColor: savingsPercentage >= 20 ? '#4CAF50' : savingsPercentage > 0 ? '#FFC107' : '#F44336'
            }}
          ></div>
        </div>
      </div>
      
      <div className="tips-container">
        <h4>AI-Generated Tips</h4>
        <ul className="tips-list">
          {tips.map((tip, index) => (
            <li key={index} className="tip-item">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FinancialSummary
