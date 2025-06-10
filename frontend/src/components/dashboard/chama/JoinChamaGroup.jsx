import React, { useState, useContext } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { Button, Form, Alert, Modal } from 'react-bootstrap'
import './ChamaStyles.scss'

const JoinChamaGroup = () => {
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [groupCode, setGroupCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // This function would need to be implemented in your ChamaContext
  // const { joinGroup } = useContext(ChamaContext)
  
  const handleJoinGroup = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!groupCode) {
      setError('Please enter a group code')
      return
    }
    
    try {
      // This would call your backend API to join a group
      // await joinGroup(groupCode)
      setSuccess('Successfully joined the group!')
      setGroupCode('')
      setTimeout(() => {
        setShowJoinModal(false)
        setSuccess('')
      }, 2000)
    } catch (err) {
      setError('Failed to join group. Please check the code and try again.')
    }
  }
  
  return (
    <>
      <Button 
        variant="outline-primary" 
        className="join-group-btn w-100"
        onClick={() => setShowJoinModal(true)}
      >
        Join Existing Group
      </Button>
      
      <Modal 
        show={showJoinModal} 
        onHide={() => setShowJoinModal(false)}
        centered
        className="join-chama-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Join Chama Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleJoinGroup} className="join-chama-form">
            <Form.Group className="mb-3">
              <Form.Label>Group Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the group code"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Ask the group creator for the code to join their Chama group.
              </Form.Text>
            </Form.Group>
            
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setShowJoinModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Join Group
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default JoinChamaGroup