import React, { useContext, useState } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import './InputStyles.scss'

const ExpenseInput = () => {
  const { budget, setBudget } = useContext(BudgetContext)
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('Other')
  
  // Common expense categories
  const categories = [
    'Housing/Rent', 
    'Food', 
    'Transportation', 
    'Utilities', 
    'Healthcare', 
    'Entertainment', 
    'Education',
    'Clothing',
    'Savings',
    'Other'
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

  return (
    <div className="input-container">
      <h3>Expenses</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense name"
            className="form-control"
            required
          />
          
          <div className="input-group">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Amount"
              className="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <select 
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className="form-control"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button type="submit" className="add-btn">Add</button>
        </div>
      </form>
      
      <div className="expenses-list">
        {budget.expenses.length > 0 ? (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {budget.expenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-expenses">No expenses added yet</p>
        )}
      </div>
    </div>
  )
}

export default ExpenseInput
