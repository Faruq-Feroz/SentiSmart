import React from 'react'
import SalaryInput from '../input/SalaryInput'
import ExpenseInput from '../input/ExpenseInput'

const BudgetSection = () => {
  return (
    <div>
      <h2>Budget Management</h2>
      <div>
        <SalaryInput />
        <ExpenseInput />
      </div>
    </div>
  )
}

export default BudgetSection