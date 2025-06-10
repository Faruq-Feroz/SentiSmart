import React, { useState, useContext, useEffect } from 'react'
import { SavingsContext } from '../../../context/SavingsContext'
import { AuthContext } from '../../../context/AuthContext'
import './SavingsStyles.scss'

const SavingsGoals = () => {
  const { savingsGoals, savingsTips, loading, error, addSavingsGoal, updateGoal, removeGoal } = useContext(SavingsContext)
  const { user } = useContext(AuthContext)
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: 'Other',
    priority: 'Medium',
    notes: ''
  })
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
  const [showTips, setShowTips] = useState(true)

  // Reset form when closing
  useEffect(() => {
    if (!showForm) {
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: 'Other',
        priority: 'Medium',
        notes: ''
      })
      setEditMode(false)
      setEditId(null)
    }
  }, [showForm])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Format the data
      const goalData = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount) || 0
      }
      
      if (editMode) {
        await updateGoal(editId, goalData)
      } else {
        await addSavingsGoal(goalData)
      }
      
      setShowForm(false)
    } catch (err) {
      console.error('Error saving goal:', err)
    }
  }

  const handleEdit = (goal) => {
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      targetDate: new Date(goal.targetDate).toISOString().split('T')[0],
      category: goal.category,
      priority: goal.priority,
      notes: goal.notes || ''
    })
    setEditMode(true)
    setEditId(goal._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      try {
        await removeGoal(id)
      } catch (err) {
        console.error('Error deleting goal:', err)
      }
    }
  }

  const handleContribution = async (goal, amount) => {
    try {
      const newAmount = goal.currentAmount + amount
      await updateGoal(goal._id, { currentAmount: newAmount })
    } catch (err) {
      console.error('Error updating contribution:', err)
    }
  }

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Calculate days remaining
  const calculateDaysRemaining = (targetDate) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Calculate monthly contribution needed
  const calculateMonthlyContribution = (goal) => {
    const today = new Date()
    const targetDate = new Date(goal.targetDate)
    const monthsRemaining = (targetDate.getFullYear() - today.getFullYear()) * 12 + 
                           (targetDate.getMonth() - today.getMonth())
    
    if (monthsRemaining <= 0) return 0
    
    const amountNeeded = goal.targetAmount - goal.currentAmount
    return amountNeeded / monthsRemaining
  }

  if (loading) {
    return <div className="loading">Loading savings goals...</div>
  }

  return (
    <div className="savings-goals-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="savings-header">
        <h3>Your Savings Goals</h3>
        <button 
          className="add-goal-btn" 
          onClick={() => setShowForm(true)}
        >
          Add New Goal
        </button>
      </div>
      
      {showTips && savingsTips.length > 0 && (
        <div className="savings-tips">
          <h4>Savings Tips</h4>
          <button className="close-tips" onClick={() => setShowTips(false)}>×</button>
          <ul>
            {savingsTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showForm && (
        <div className="goal-form-container">
          <div className="goal-form">
            <h4>{editMode ? 'Edit Savings Goal' : 'Create New Savings Goal'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Goal Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Target Amount ($)</label>
                <input 
                  type="number" 
                  name="targetAmount" 
                  value={formData.targetAmount} 
                  onChange={handleChange} 
                  min="1" 
                  step="0.01" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Current Amount ($)</label>
                <input 
                  type="number" 
                  name="currentAmount" 
                  value={formData.currentAmount} 
                  onChange={handleChange} 
                  min="0" 
                  step="0.01" 
                />
              </div>
              
              <div className="form-group">
                <label>Target Date</label>
                <input 
                  type="date" 
                  name="targetDate" 
                  value={formData.targetDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                >
                  <option value="Emergency Fund">Emergency Fund</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Education">Education</option>
                  <option value="Home">Home</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Priority</label>
                <select 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit">{editMode ? 'Update Goal' : 'Create Goal'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {savingsGoals.length === 0 ? (
        <div className="no-goals">
          <p>You don't have any savings goals yet. Click "Add New Goal" to get started!</p>
        </div>
      ) : (
        <div className="goals-grid">
          {savingsGoals.map(goal => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
            const daysRemaining = calculateDaysRemaining(goal.targetDate)
            const monthlyContribution = calculateMonthlyContribution(goal)
            
            return (
              <div key={goal._id} className={`goal-card ${goal.isCompleted ? 'completed' : ''}`}>
                <div className="goal-header">
                  <h4>{goal.name}</h4>
                  <span className={`priority-badge ${goal.priority.toLowerCase()}`}>
                    {goal.priority}
                  </span>
                </div>
                
                <div className="goal-category">{goal.category}</div>
                
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{progress}% Complete</div>
                </div>
                
                <div className="goal-amounts">
                  <div>
                    <span className="amount-label">Current:</span>
                    <span className="amount-value">${goal.currentAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="amount-label">Target:</span>
                    <span className="amount-value">${goal.targetAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="goal-date">
                  <div>
                    <span className="date-label">Target Date:</span>
                    <span className="date-value">{formatDate(goal.targetDate)}</span>
                  </div>
                  {daysRemaining > 0 ? (
                    <div className="days-remaining">{daysRemaining} days remaining</div>
                  ) : (
                    <div className="days-overdue">Target date passed</div>
                  )}
                </div>
                
                {!goal.isCompleted && monthlyContribution > 0 && (
                  <div className="monthly-contribution">
                    Suggested monthly contribution: ${monthlyContribution.toFixed(2)}
                  </div>
                )}
                
                {goal.notes && (
                  <div className="goal-notes">
                    <strong>Notes:</strong> {goal.notes}
                  </div>
                )}
                
                {goal.isCompleted ? (
                  <div className="goal-completed-message">Goal Completed! 🎉</div>
                ) : (
                  <div className="goal-actions">
                    <div className="contribution-actions">
                      <button onClick={() => handleContribution(goal, 10)}>+$10</button>
                      <button onClick={() => handleContribution(goal, 50)}>+$50</button>
                      <button onClick={() => handleContribution(goal, 100)}>+$100</button>
                    </div>
                    <div className="edit-actions">
                      <button onClick={() => handleEdit(goal)}>Edit</button>
                      <button onClick={() => handleDelete(goal._id)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SavingsGoals
