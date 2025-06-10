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
    <div className="input-container">
      <h3>Monthly Income</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={salary}
            onChange={handleSalaryChange}
            placeholder="Enter your monthly income"
            className="form-control"
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="submit-btn">Update Income</button>
      </form>
    </div>
  )
}

export default SalaryInput
