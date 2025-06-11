import React, { useState, useContext } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import './BudgetStyles.scss'

const SavedBudgets = () => {
  const { budget, saveBudget, loadBudget, deleteSavedBudget } = useContext(BudgetContext)
  const [budgetName, setBudgetName] = useState('')
  
  const handleSave = (e) => {
    e.preventDefault()
    if (budgetName.trim()) {
      saveBudget(budgetName)
      setBudgetName('')
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="saved-budgets-container">
      <h3>Saved Budgets</h3>
      
      <form onSubmit={handleSave} className="save-form">
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="Enter a name for this budget"
          className="form-control"
          required
        />
        <button type="submit" className="save-btn">Save Current Budget</button>
      </form>
      
      {budget.savedBudgets && budget.savedBudgets.length > 0 ? (
        <div className="saved-list">
          {budget.savedBudgets.map((savedBudget) => (
            <div key={savedBudget.id} className="saved-item">
              <div className="saved-info">
                <h4>{savedBudget.name}</h4>
                <p className="saved-date">Saved on: {formatDate(savedBudget.date)}</p>
                <p className="saved-summary">
                  Income: KSH {savedBudget.income.toFixed(2)} | 
                  Expenses: KSH {savedBudget.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)} | 
                  Savings: KSH {savedBudget.savings.toFixed(2)}
                </p>
              </div>
              <div className="saved-actions">
                <button 
                  onClick={() => loadBudget(savedBudget.id)}
                  className="load-btn"
                >
                  Load
                </button>
                <button 
                  onClick={() => deleteSavedBudget(savedBudget.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-saved">No saved budgets yet</p>
      )}
    </div>
  )
}

export default SavedBudgets