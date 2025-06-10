import React, { useContext } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import { SavingsContext } from '../../../context/SavingsContext'

const RecommendationBadges = () => {
  const { budget } = useContext(BudgetContext)
  const { savingsGoals } = useContext(SavingsContext)
  
  const badges = []
  
  // Calculate badges based on budget data
  if (budget) {
    // Savings rate badge
    if (budget.income > 0) {
      const savingsRate = (budget.savings / budget.income) * 100
      
      if (savingsRate >= 30) {
        badges.push({
          title: 'Super Saver',
          description: 'Saving 30% or more of income',
          type: 'success'
        })
      } else if (savingsRate >= 20) {
        badges.push({
          title: 'Good Saver',
          description: 'Saving 20-30% of income',
          type: 'success'
        })
      } else if (savingsRate < 10 && savingsRate >= 0) {
        badges.push({
          title: 'Low Savings',
          description: 'Saving less than 10% of income',
          type: 'warning'
        })
      } else if (savingsRate < 0) {
        badges.push({
          title: 'Overspending',
          description: 'Spending more than income',
          type: 'danger'
        })
      }
    }
    
    // Budget diversity badge
    if (budget.expenses && budget.expenses.length > 0) {
      const categories = new Set(budget.expenses.map(expense => expense.category))
      
      if (categories.size >= 5) {
        badges.push({
          title: 'Diverse Budget',
          description: 'Tracking 5+ expense categories',
          type: 'info'
        })
      }
    }
    
    // Consistent budgeting badge
    if (budget.savedBudgets && budget.savedBudgets.length >= 3) {
      badges.push({
        title: 'Consistent Budgeter',
        description: 'Maintained budget for 3+ months',
        type: 'success'
      })
    }
  }
  
  // Savings goals badges
  if (savingsGoals && savingsGoals.length > 0) {
    // Goal setter badge
    if (savingsGoals.length >= 2) {
      badges.push({
        title: 'Goal Setter',
        description: 'Set multiple savings goals',
        type: 'info'
      })
    }
    
    // Goal achiever badge
    const completedGoals = savingsGoals.filter(goal => 
      goal.currentAmount >= goal.targetAmount
    )
    
    if (completedGoals.length > 0) {
      badges.push({
        title: 'Goal Achiever',
        description: 'Completed at least one savings goal',
        type: 'success'
      })
    }
  }
  
  if (badges.length === 0) {
    return null
  }
  
  return (
    <div className="badges-container">
      <h3 className="badges-title">Your Achievement Badges</h3>
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <div key={index} className={`badge-card badge-${badge.type}`}>
            <div className="badge-icon">
              <i className={`fas ${getBadgeIcon(badge.title)}`}></i>
            </div>
            <h4 className="badge-title">{badge.title}</h4>
            <p className="badge-description">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to get appropriate icon for badge
const getBadgeIcon = (title) => {
  switch (title) {
    case 'Super Saver':
      return 'fa-award'
    case 'Good Saver':
      return 'fa-thumbs-up'
    case 'Low Savings':
      return 'fa-exclamation-circle'
    case 'Overspending':
      return 'fa-exclamation-triangle'
    case 'Diverse Budget':
      return 'fa-th-large'
    case 'Consistent Budgeter':
      return 'fa-calendar-check'
    case 'Goal Setter':
      return 'fa-bullseye'
    case 'Goal Achiever':
      return 'fa-trophy'
    default:
      return 'fa-star'
  }
}

export default RecommendationBadges
