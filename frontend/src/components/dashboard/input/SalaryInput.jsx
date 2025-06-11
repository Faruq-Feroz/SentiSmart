import React, { useContext, useState } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import './InputStyles.scss'

const SalaryInput = () => {
  const { budget, setBudget } = useContext(BudgetContext)
  const [salary, setSalary] = useState(budget.income || '')

  const handleSalaryChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    setSalary(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBudget({
      ...budget,
      income: salary
    })
  }

  return (
    <div className="expense-input-container">
      <div className="section-header">
        <h3>Monthly Income</h3>
        <p>Enter your monthly income to get personalized financial insights.</p>
      </div>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="amount-input-group">
          <span className="currency-symbol">KSH</span>
          <input
            type="number"
            value={salary}
            onChange={handleSalaryChange}
            placeholder="Enter your monthly income"
            className="styled-input amount-input"
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="add-expense-btn" style={{marginTop: '20px'}}>Update Income</button>
      </form>
    </div>
  )
}

export default SalaryInput
