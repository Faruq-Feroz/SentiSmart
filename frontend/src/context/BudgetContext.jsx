import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'

// Create the context
export const BudgetContext = createContext()

// Create the provider component
export const BudgetProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [budget, setBudget] = useState({
    income: 0,
    expenses: [],
    savings: 0,
    savedBudgets: [] // For storing multiple saved budgets
  })

  // Load budget data from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedBudget = localStorage.getItem(`budget_${user.uid}`)
      if (savedBudget) {
        setBudget(JSON.parse(savedBudget))
      }
    }
  }, [user])

  // Update savings whenever income or expenses change
  useEffect(() => {
    if (budget.income || budget.expenses.length > 0) {
      const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      const savings = budget.income - totalExpenses
      
      setBudget(prevBudget => ({
        ...prevBudget,
        savings
      }))
      
      // Save to localStorage if user is authenticated
      if (user) {
        localStorage.setItem(`budget_${user.uid}`, JSON.stringify({
          ...budget,
          savings
        }))
      }
    }
  }, [budget.income, budget.expenses, user])

  // Save current budget with a name
  const saveBudget = (name) => {
    if (!name) return
    
    const newSavedBudget = {
      id: Date.now(),
      name,
      date: new Date().toISOString(),
      income: budget.income,
      expenses: [...budget.expenses],
      savings: budget.savings
    }
    
    const updatedBudget = {
      ...budget,
      savedBudgets: [...budget.savedBudgets, newSavedBudget]
    }
    
    setBudget(updatedBudget)
    
    // Save to localStorage if user is authenticated
    if (user) {
      localStorage.setItem(`budget_${user.uid}`, JSON.stringify(updatedBudget))
    }
    
    return newSavedBudget.id
  }

  // Load a saved budget
  const loadBudget = (id) => {
    const savedBudget = budget.savedBudgets.find(budget => budget.id === id)
    
    if (savedBudget) {
      setBudget({
        ...budget,
        income: savedBudget.income,
        expenses: savedBudget.expenses,
        savings: savedBudget.savings
      })
    }
  }

  // Delete a saved budget
  const deleteSavedBudget = (id) => {
    const updatedSavedBudgets = budget.savedBudgets.filter(budget => budget.id !== id)
    
    const updatedBudget = {
      ...budget,
      savedBudgets: updatedSavedBudgets
    }
    
    setBudget(updatedBudget)
    
    // Update localStorage if user is authenticated
    if (user) {
      localStorage.setItem(`budget_${user.uid}`, JSON.stringify(updatedBudget))
    }
  }

  // Clear current budget
  const clearBudget = () => {
    setBudget({
      ...budget,
      income: 0,
      expenses: [],
      savings: 0
    })
  }

  return (
    <BudgetContext.Provider value={{
      budget,
      setBudget,
      saveBudget,
      loadBudget,
      deleteSavedBudget,
      clearBudget
    }}>
      {children}
    </BudgetContext.Provider>
  )
}

export default BudgetContext
