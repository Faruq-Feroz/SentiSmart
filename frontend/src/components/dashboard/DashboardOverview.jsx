import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import FinancialSummary from './summary/FinancialSummary'
import SalaryInput from './input/SalaryInput'
import ExpenseInput from './input/ExpenseInput'
import FinancialAdvisor from './advisor/FinancialAdvisor'
import SavedBudgets from './budget/SavedBudgets'
import './DashboardStyles.css'

const DashboardOverview = () => {
  const { user } = useContext(AuthContext)
  const userName = user?.displayName?.split(' ')[0] || 'there'

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {userName}!</h2>
      
      <div className="dashboard-layout">
        <div className="input-section">
          <SalaryInput />
          <ExpenseInput />
          <SavedBudgets />
        </div>
        
        <div className="advisor-section">
          <FinancialAdvisor />
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview