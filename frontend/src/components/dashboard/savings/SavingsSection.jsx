import React, { useContext } from 'react'
import SavingsGoals from './SavingsGoals'
import { SavingsContext } from '../../../context/SavingsContext'
import { AuthContext } from '../../../context/AuthContext'
import './SavingsStyles.scss'

const SavingsSection = () => {
  const { savingsGoals } = useContext(SavingsContext)
  const { user } = useContext(AuthContext)
  
  // Calculate total savings across all goals
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  
  // Calculate total target amount across all goals
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  
  // Calculate overall progress percentage
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0
  
  return (
    <div className="savings-section">
      <div className="savings-overview">
        <h2>Savings Goals</h2>
        
        {user ? (
          <div className="savings-stats">
            <div className="stat-card">
              <div className="stat-title">Total Saved</div>
              <div className="stat-value">KSH {totalSaved.toFixed(2)}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Total Goals</div>
              <div className="stat-value">{savingsGoals.length}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-title">Overall Progress</div>
              <div className="stat-value">{overallProgress}%</div>
              <div className="overall-progress-bar">
                <div 
                  className="overall-progress-fill" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-prompt">
            Please log in to track your savings goals.
          </div>
        )}
      </div>
      
      <SavingsGoals />
    </div>
  )
}

export default SavingsSection