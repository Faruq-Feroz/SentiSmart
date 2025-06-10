import React, { useState, useContext } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { Alert } from 'react-bootstrap'
import './ChamaStyles.scss'

const CreateChamaForm = () => {
  const { createGroup } = useContext(ChamaContext)
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    targetAmount: 0,
    members: []
  })
  const [memberEmail, setMemberEmail] = useState('')
  const [memberEmails, setMemberEmails] = useState([])
  const [formError, setFormError] = useState('')

  const handleCreateGroup = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!newGroupData.name) {
      setFormError('Please enter a group name')
      return
    }

    try {
      await createGroup({
        ...newGroupData,
        members: memberEmails
      })
      setNewGroupData({
        name: '',
        description: '',
        targetAmount: 0,
        members: []
      })
      setMemberEmails([])
    } catch (err) {
      setFormError('Failed to create group')
    }
  }

  const addMemberEmail = () => {
    if (memberEmail && !memberEmails.includes(memberEmail)) {
      if (memberEmails.length >= 3) {
        setFormError('Maximum 3 members allowed')
        return
      }
      setMemberEmails([...memberEmails, memberEmail])
      setMemberEmail('')
    }
  }

  const removeMemberEmail = (email) => {
    setMemberEmails(memberEmails.filter(e => e !== email))
  }

  return (
    <div className="create-chama-form">
      <h3>Create New Chama Group</h3>
      {formError && <Alert variant="danger">{formError}</Alert>}
      
      <form onSubmit={handleCreateGroup}>
        <div className="form-row">
          <label htmlFor="group-name">Group Name</label>
          <input
            id="group-name"
            type="text"
            placeholder="Enter group name"
            value={newGroupData.name}
            onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="group-description">Description</label>
          <textarea
            id="group-description"
            placeholder="Enter group description"
            value={newGroupData.description}
            onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
          />
        </div>

        <div className="form-row">
          <label htmlFor="target-amount">Target Amount (KSH)</label>
          <input
            id="target-amount"
            type="number"
            placeholder="Enter target amount"
            value={newGroupData.targetAmount}
            onChange={(e) => setNewGroupData({...newGroupData, targetAmount: Number(e.target.value)})}
            min="0"
          />
        </div>

        <div className="form-row">
          <label>Add Members (max 3)</label>
          <div className="member-input-group">
            <input
              type="email"
              placeholder="Enter member email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <button type="button" className="btn-add" onClick={addMemberEmail}>
              Add
            </button>
          </div>
          <div className="member-emails">
            {memberEmails.map((email, index) => (
              <div key={index} className="member-email-tag">
                {email}
                <button type="button" onClick={() => removeMemberEmail(email)} className="remove-email">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => {
            setNewGroupData({
              name: '',
              description: '',
              targetAmount: 0,
              members: []
            })
            setMemberEmails([])
          }}>
            Cancel
          </button>
          <button type="submit" className="btn-create">
            Create Group
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateChamaForm