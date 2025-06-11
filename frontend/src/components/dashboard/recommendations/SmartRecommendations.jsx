import React, { useState, useEffect, useContext } from 'react'
import { getRecommendations } from '../../../services/adviceService'
import { AuthContext } from '../../../context/AuthContext'
import { BudgetContext } from '../../../context/BudgetContext'
import { SavingsContext } from '../../../context/SavingsContext'
import './SmartRecommendations.scss'

const SmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)
  const { budget } = useContext(BudgetContext)
  const { savingsGoals } = useContext(SavingsContext)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        let data = await getRecommendations()
        
        // Add local rule-based recommendations based on user data
        if (budget) {
          const localRecommendations = []
          
          // Check savings rate
          if (budget.income > 0) {
            const savingsRate = (budget.savings / budget.income) * 100
            
            if (savingsRate < 10) {
              localRecommendations.push({
                message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Try to save at least 20% of your income.`,
                type: 'warning',
                badge: 'Needs Work',
                action: 'SET_SAVINGS_GOAL'
              })
            } else if (savingsRate >= 30) {
              localRecommendations.push({
                message: `Great job! You're saving ${savingsRate.toFixed(1)}% of your income.`,
                type: 'success',
                badge: 'Excellent',
                action: 'VIEW_INVESTMENT_OPTIONS'
              })
            }
          }
          
          // Check expense categories
          if (budget.expenses && budget.expenses.length > 0) {
            const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
            
            // Group expenses by category
            const categories = {}
            budget.expenses.forEach(expense => {
              if (categories[expense.category]) {
                categories[expense.category] += expense.amount
              } else {
                categories[expense.category] = expense.amount
              }
            })
            
            // Check for high spending in specific categories
            Object.entries(categories).forEach(([category, amount]) => {
              const percentage = (amount / totalExpenses) * 100
              
              if (category === 'Food' && percentage > 30) {
                localRecommendations.push({
                  message: `You're spending ${percentage.toFixed(1)}% on food. Try meal planning to reduce this expense.`,
                  type: 'warning',
                  badge: 'Overspending Alert',
                  action: 'VIEW_FOOD_TIPS'
                })
              } else if (category === 'Transport' && percentage > 15) {
                localRecommendations.push({
                  message: `Transport costs are ${percentage.toFixed(1)}% of your budget. Consider carpooling or public transport.`,
                  type: 'warning',
                  badge: 'Overspending Alert',
                  action: 'VIEW_TRANSPORT_TIPS'
                })
              } else if (category === 'Rent' && percentage > 40) {
                localRecommendations.push({
                  message: `Your rent is ${percentage.toFixed(1)}% of your expenses. The recommended maximum is 30%.`,
                  type: 'warning',
                  badge: 'Overspending Alert',
                  action: 'VIEW_HOUSING_OPTIONS'
                })
              }
            })
          }
          
          // Check savings goals
          if (savingsGoals && savingsGoals.length > 0) {
            const goalProgress = savingsGoals.map(goal => {
              return {
                name: goal.name,
                progress: goal.currentAmount / goal.targetAmount * 100
              }
            })
            
            // Find goals with low progress
            const lowProgressGoals = goalProgress.filter(goal => goal.progress < 30)
            if (lowProgressGoals.length > 0) {
              localRecommendations.push({
                message: `Your ${lowProgressGoals[0].name} goal is only ${lowProgressGoals[0].progress.toFixed(1)}% complete. Try increasing your monthly contribution.`,
                type: 'info',
                badge: 'Goal Boost Needed',
                action: 'ADJUST_GOAL_CONTRIBUTION'
              })
            }
            
            // Find goals with high progress
            const highProgressGoals = goalProgress.filter(goal => goal.progress > 80 && goal.progress < 100)
            if (highProgressGoals.length > 0) {
              localRecommendations.push({
                message: `You're almost there! Your ${highProgressGoals[0].name} goal is ${highProgressGoals[0].progress.toFixed(1)}% complete.`,
                type: 'success',
                badge: 'Almost There',
                action: 'CELEBRATE_PROGRESS'
              })
            }
          }
          
          // Combine API recommendations with local ones
          data = [...data, ...localRecommendations]
          
          // Sort by type (success, warning, info)
          data.sort((a, b) => {
            const typeOrder = { success: 3, warning: 2, info: 1 }
            return typeOrder[b.type] - typeOrder[a.type]
          })
          
          // Limit to 5 recommendations
          data = data.slice(0, 5)
        }
        
        setRecommendations(data)
        setError(null)
      } catch (err) {
        setError('Failed to load recommendations. Please try again later.')
        console.error('Error fetching recommendations:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchRecommendations()
    }
  }, [user, budget, savingsGoals])

  // Helper function to get appropriate badge class
  const getBadgeClass = (type) => {
    switch (type) {
      case 'success':
        return 'badge-success'
      case 'warning':
        return 'badge-warning'
      case 'info':
        return 'badge-info'
      default:
        return 'badge-default'
    }
  }

  // Helper function to get user-friendly button text
  const getActionButtonText = (action) => {
    switch (action) {
      case 'SET_SAVINGS_GOAL':
        return 'Set Goal'
      case 'VIEW_INVESTMENT_OPTIONS':
        return 'View Investments'
      case 'VIEW_FOOD_TIPS':
        return 'Food Tips'
      case 'VIEW_TRANSPORT_TIPS':
        return 'Transport Tips'
      case 'VIEW_HOUSING_OPTIONS':
        return 'Housing Options'
      case 'ADJUST_GOAL_CONTRIBUTION':
        return 'Adjust Goal'
      case 'CELEBRATE_PROGRESS':
        return 'View Progress'
      default:
        return 'Learn More'
    }
  }

  // Helper function to get button class based on recommendation type
  const getButtonClass = (type) => {
    switch (type) {
      case 'success':
        return 'btn-success'
      case 'warning':
        return 'btn-warning'
      case 'info':
        return 'btn-info'
      default:
        return 'btn-default'
    }
  }

  if (loading) {
    return <div className="recommendations-loading">Loading recommendations...</div>
  }

  if (error) {
    return <div className="recommendations-error">{error}</div>
  }

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-empty">
        <h3>No recommendations yet</h3>
        <p>Add more financial data to get personalized recommendations.</p>
      </div>
    )
  }

  return (
    <div className="recommendations-container">
      <h3 className="recommendations-title">Smart Recommendations</h3>
      <div className="recommendations-list">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className={`recommendation-card ${getBadgeClass(recommendation.type)}`}
          >
            <div className="recommendation-content">
              <p className="recommendation-message">{recommendation.message}</p>
              {recommendation.badge && (
                <div className={`recommendation-badge ${getBadgeClass(recommendation.type)}`}>
                  {recommendation.badge}
                </div>
              )}
            </div>
            {recommendation.action && (
              <button className={`recommendation-action-btn ${getButtonClass(recommendation.type)}`}>
                {getActionButtonText(recommendation.action)}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmartRecommendations
