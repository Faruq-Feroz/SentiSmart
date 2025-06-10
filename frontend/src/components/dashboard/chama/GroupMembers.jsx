import React, { useContext, useState, useEffect } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { AuthContext } from '../../../context/AuthContext'
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import './ChamaStyles.scss'

const GroupMembers = () => {
  const { selectedGroup } = useContext(ChamaContext)
  const { user } = useContext(AuthContext)
  const [members, setMembers] = useState([])
  const [isCreator, setIsCreator] = useState(false)
  
  useEffect(() => {
    if (selectedGroup) {
      // Format members data
      const membersList = [
        // Add creator as first member
        { id: selectedGroup.creator, email: selectedGroup.creatorEmail || 'Group Creator', isCreator: true },
        // Add other members
        ...selectedGroup.members.map(member => ({
          id: member.id || member,
          email: member.email || 'Member',
          isCreator: false
        }))
      ]
      
      setMembers(membersList)
      setIsCreator(selectedGroup.creator === user?.uid)
    }
  }, [selectedGroup, user])

  if (!selectedGroup) {
    return <div className="select-group-prompt">Select a Chama group to view members</div>
  }

  return (
    <div className="group-members-container">
      <div className="members-header">
        <h4>{selectedGroup.name} - Members</h4>
      </div>
      
      <Table striped bordered hover responsive className="members-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.email}</td>
              <td>{member.isCreator ? 'Creator' : 'Member'}</td>
              <td>
                <span className="member-status active">Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default GroupMembers