import React, { useContext, useState, useEffect } from 'react'
import { SavingsContext } from '../../../context/SavingsContext'
import { BudgetContext } from '../../../context/BudgetContext'
import './SavingsStyles.scss'

const GoalAdvice = () => {
  const { savingsGoals } = useContext(SavingsContext)
  const { budget } = useContext(BudgetContext)
  const [advice, setAdvice] = useState([])
  
  useEffect(() => {
    generateAdvice()
  }, [savingsGoals, budget])
  
  const generateAdvice = () => {
    const newAdvice = []
    
    // Calculate total monthly income
    const monthlyIncome = budget.income
    
    // Calculate total expenses
    const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Calculate available savings amount
    const availableSavings = monthlyIncome - totalExpenses
    
    // If no income or negative savings, suggest setting income
    if (monthlyIncome <= 0) {
      newAdvice.push({
        type: 'warning',
        text: 'Please set your monthly income to get personalized savings advice.'
      })
      setAdvice(newAdvice)
      return
    }
    
    // If expenses exceed income, suggest reducing expenses
    if (availableSavings < 0) {
      newAdvice.push({
        type: 'danger',
        text: 'Your expenses exceed your income. Consider reducing expenses before setting savings goals.'
      })
      setAdvice(newAdvice)
      return
    }
    
    // If no savings goals, suggest creating one
    if (savingsGoals.length === 0) {
      newAdvice.push({
        type: 'info',
        text: 'You haven\'t set any savings goals yet. Consider creating one to start tracking your progress.'
      })
    }
    
    // Calculate total monthly contribution needed for all goals
    let totalMonthlyNeeded = 0
    
    savingsGoals.forEach(goal => {
      if (!goal.isCompleted) {
        const targetDate = new Date(goal.targetDate)
        const today = new Date()
        const monthsRemaining = (targetDate.getFullYear() - today.getFullYear()) * 12 + 
                              (targetDate.getMonth() - today.getMonth())
        
        if (monthsRemaining > 0) {
          const amountNeeded = goal.targetAmount - goal.currentAmount
          const monthlyNeeded = amountNeeded / monthsRemaining
          totalMonthlyNeeded += monthlyNeeded
        }
      }
    })
    
    // If total monthly needed exceeds available savings
    if (totalMonthlyNeeded > availableSavings && savingsGoals.length > 0) {
      newAdvice.push({
        type: 'warning',
        text: `Your savings goals require $${totalMonthlyNeeded.toFixed(2)} monthly, but you only have $${availableSavings.toFixed(2)} available. Consider extending goal deadlines or reducing expenses.`
      })
    } else if (savingsGoals.length > 0) {
      newAdvice.push({
        type: 'success',
        text: `You need $${totalMonthlyNeeded.toFixed(2)} monthly for your goals and have $${availableSavings.toFixed(2)} available. You're on track!`
      })
    }
    
    // Check for goals with passed target dates
    const overduedGoals = savingsGoals.filter(goal => {
      const targetDate = new Date(goal.targetDate)
      const today = new Date()
      return targetDate < today && !goal.isCompleted
    })
    
    if (overduedGoals.length > 0) {
      newAdvice.push({
        type: 'warning',
        text: `You have ${overduedGoals.length} goal(s) with passed target dates. Consider updating these goals with new deadlines.`
      })
    }
    
    // Suggest emergency fund if none exists
    const hasEmergencyFund = savingsGoals.some(goal => 
      goal.category === 'Emergency Fund'
    )
    
    if (!hasEmergencyFund) {
      newAdvice.push({
        type: 'info',
        text: 'Consider creating an Emergency Fund goal. Financial experts recommend saving 3-6 months of expenses for emergencies.'
      })
    }
    
    // Suggest diversifying goals if all are in the same category
    const categories = savingsGoals.map(goal => goal.category)
    const uniqueCategories = new Set(categories)
    
    if (savingsGoals.length > 1 && uniqueCategories.size === 1) {
      newAdvice.push({
        type: 'info',
        text: `All your goals are in the "${categories[0]}" category. Consider diversifying your savings goals across different categories.`
      })
    }
    
    setAdvice(newAdvice)
  }
  
  return (
    <div className="goal-advice">
      <h3>Savings Goal Advice</h3>
      
      {advice.length === 0 ? (
        <p>Set up your income, expenses, and savings goals to get personalized advice.</p>
      ) : (
        <div className="advice-list">
          {advice.map((item, index) => (
            <div key={index} className={`advice-item ${item.type}`}>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GoalAdvice
