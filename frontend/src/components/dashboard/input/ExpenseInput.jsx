import React, { useContext, useState } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import './InputStyles.scss'

const ExpenseInput = () => {
  const { budget, setBudget } = useContext(BudgetContext)
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('Other')
  
  // Common expense categories with icons
  const categories = [
    { value: 'Housing/Rent', label: '🏠 Housing/Rent' },
    { value: 'Food', label: '🍽️ Food' },
    { value: 'Transportation', label: '🚗 Transportation' },
    { value: 'Utilities', label: '⚡ Utilities' },
    { value: 'Healthcare', label: '🏥 Healthcare' },
    { value: 'Entertainment', label: '🎬 Entertainment' },
    { value: 'Education', label: '📚 Education' },
    { value: 'Clothing', label: '👕 Clothing' },
    { value: 'Savings', label: '💰 Savings' },
    { value: 'Other', label: '📝 Other' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!expenseName || !expenseAmount) return
    
    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory
    }
    
    setBudget({
      ...budget,
      expenses: [...budget.expenses, newExpense],
      savings: budget.income - [...budget.expenses, newExpense].reduce((sum, exp) => sum + exp.amount, 0)
    })
    
    // Reset form
    setExpenseName('')
    setExpenseAmount('')
    setExpenseCategory('Other')
  }

  const handleDeleteExpense = (id) => {
    const updatedExpenses = budget.expenses.filter(expense => expense.id !== id)
    setBudget({
      ...budget,
      expenses: updatedExpenses,
      savings: budget.income - updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    })
  }

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.value === category)
    return categoryObj ? categoryObj.label.split(' ')[0] : '📝'
  }

  return (
    <div className="expense-input-container">
      <div className="section-header">
        <h3>💸 Track Your Expenses</h3>
        <p>Add your daily expenses to monitor your spending</p>
      </div>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-grid">
          <div className="input-field">
            <label>Expense Name</label>
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="e.g., Grocery shopping"
              className="styled-input"
              required
            />
          </div>
          
          <div className="input-field">
            <label>Amount</label>
            <div className="amount-input-group">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="0.00"
                className="styled-input amount-input"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="input-field">
            <label>Category</label>
            <select 
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="styled-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Make the submit button more visible and ensure it's not hidden */}
          <div className="submit-field">
            <button type="submit" className="add-expense-btn" style={{marginTop: '10px', width: '100%'}}>
              <span className="btn-icon">➕</span>
              Add Expense
            </button>
          </div>
        </div>
      </form>
      
      <div className="expenses-section">
        {budget.expenses.length > 0 ? (
          <>
            <div className="expenses-header">
              <h4>Recent Expenses</h4>
              <div className="total-expenses">
                Total: ${budget.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
              </div>
            </div>
            <div className="expenses-grid">
              {budget.expenses.map(expense => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-info">
                    <div className="expense-header-card">
                      <span className="expense-icon">{getCategoryIcon(expense.category)}</span>
                      <div className="expense-details">
                        <h5>{expense.name}</h5>
                        <span className="expense-category">{expense.category}</span>
                      </div>
                    </div>
                    <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="delete-expense-btn"
                    title="Delete expense"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-expenses-state">
            <div className="empty-icon">📊</div>
            <h4>No expenses tracked yet</h4>
            <p>Start adding your expenses to see insights about your spending habits</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseInput