import React, { useState, useEffect, useContext } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { AuthContext } from '../../../context/AuthContext'
import { SocketContext } from '../../../context/SocketContext'
import { Button, Form, Modal, Table, ProgressBar, Alert, Spinner } from 'react-bootstrap'
import { initiateSTKPush } from '../../../services/mpesaService'
import './ChamaStyles.scss'

const ContributionTracker = () => {
  const { selectedGroup, addGroupContribution } = useContext(ChamaContext)
  const { user } = useContext(AuthContext)
  const { socket, connected, notifyContribution } = useContext(SocketContext)
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [contributionAmount, setContributionAmount] = useState('')
  const [contributionNotes, setContributionNotes] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [contributions, setContributions] = useState([])
  const [progress, setProgress] = useState(0)

  // Update contributions when selected group changes
  useEffect(() => {
    if (selectedGroup) {
      setContributions(selectedGroup.contributions || [])
      
      // Calculate progress percentage
      const totalContributed = selectedGroup.totalContributed || 0
      const targetAmount = selectedGroup.targetAmount || 0
      const calculatedProgress = targetAmount > 0 ? Math.round((totalContributed / targetAmount) * 100) : 0
      setProgress(calculatedProgress > 100 ? 100 : calculatedProgress)
    }
  }, [selectedGroup])

  // Listen for new contributions
  useEffect(() => {
    if (socket && connected && selectedGroup) {
      const handleContributionAdded = (contribution) => {
        // Update the local state with the new contribution
        setContributions(prev => [...prev, contribution])
        
        // Recalculate progress
        const newTotal = (selectedGroup.totalContributed || 0) + contribution.amount
        const targetAmount = selectedGroup.targetAmount || 0
        const calculatedProgress = targetAmount > 0 ? Math.round((newTotal / targetAmount) * 100) : 0
        setProgress(calculatedProgress > 100 ? 100 : calculatedProgress)
      }
      
      socket.on('contributionAdded', handleContributionAdded)
      
      return () => {
        socket.off('contributionAdded', handleContributionAdded)
      }
    }
  }, [socket, connected, selectedGroup])

  const handleContribute = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!contributionAmount || isNaN(contributionAmount) || Number(contributionAmount) <= 0) {
      setError('Please enter a valid contribution amount')
      setLoading(false)
      return
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number')
      setLoading(false)
      return
    }

    try {
      const amount = Number(contributionAmount)
      
      // Initiate STK Push
      const response = await initiateSTKPush(
        phoneNumber,
        amount,
        `Chama-${selectedGroup._id}`
      )
      
      // If STK Push was successful, record the contribution
      if (response && response.CheckoutRequestID) {
        const contributionData = {
          amount,
          notes: contributionNotes,
          phoneNumber: phoneNumber,
          transactionId: response.CheckoutRequestID
        }
        
        // Add contribution to database
        const updatedGroup = await addGroupContribution(selectedGroup._id, contributionData)
        
        // Notify other members via socket
        notifyContribution(selectedGroup._id, {
          contributor: user.uid,
          amount,
          date: new Date(),
          notes: contributionNotes
        })
        
        // Reset form
        setContributionAmount('')
        setContributionNotes('')
        setPhoneNumber('')
        setShowContributeModal(false)
        setSuccess('Contribution initiated! Please check your phone to complete the M-Pesa payment.')
        
        // Update local state
        setContributions(updatedGroup.contributions || [])
        
        // Recalculate progress
        const totalContributed = updatedGroup.totalContributed || 0
        const targetAmount = updatedGroup.targetAmount || 0
        const calculatedProgress = targetAmount > 0 ? Math.round((totalContributed / targetAmount) * 100) : 0
        setProgress(calculatedProgress > 100 ? 100 : calculatedProgress)
      }
    } catch (err) {
      setError(err.message || 'Failed to add contribution')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedGroup) {
    return <div className="select-group-prompt">Select a Chama group to view contributions</div>
  }

  return (
    <div className="contribution-tracker">
      {success && <Alert variant="success" className="mb-4">{success}</Alert>}
      <div className="tracker-header">
        <h4 className="mb-0">{selectedGroup.name} - Contributions</h4>
        <Button 
          variant="success" 
          onClick={() => setShowContributeModal(true)}
          className="px-4"
        >
          Add Contribution
        </Button>
      </div>
      
      <div className="progress-section mt-4">
        <div className="progress-info">
          <div className="progress-stat">
            <span className="stat-label">Target Amount:</span>
            <span className="stat-value">KSH {selectedGroup.targetAmount || 0}</span>
          </div>
          <div className="progress-stat">
            <span className="stat-label">Total Contributed:</span>
            <span className="stat-value">KSH {selectedGroup.totalContributed || 0}</span>
          </div>
          <div className="progress-stat">
            <span className="stat-label">Progress:</span>
            <span className="stat-value">{progress}%</span>
          </div>
        </div>
        
        <ProgressBar 
          now={progress} 
          label={`${progress}%`} 
          variant={progress < 30 ? "danger" : progress < 70 ? "warning" : "success"} 
          style={{ height: '25px', fontSize: '0.9rem', fontWeight: '600' }}
        />
      </div>
      
      <div className="contributions-section mt-4">
        <h5 className="mb-3">Contribution History</h5>
        {contributions.length === 0 ? (
          <div className="no-contributions p-4 text-center bg-light rounded">
            <p className="mb-0">No contributions yet. Be the first to contribute!</p>
          </div>
        ) : (
          <Table striped bordered hover responsive className="contribution-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contributor</th>
                <th>Amount</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[...contributions].reverse().map((contribution, index) => (
                <tr key={index}>
                  <td>{new Date(contribution.date).toLocaleDateString()}</td>
                  <td>{contribution.contributor === user?.uid ? 'You' : contribution.contributorName || 'Member'}</td>
                  <td className="contribution-amount">KSH {contribution.amount}</td>
                  <td>{contribution.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      
      {/* Contribute Modal */}
      <Modal 
        show={showContributeModal} 
        onHide={() => setShowContributeModal(false)}
        centered
        className="contribution-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleContribute} className="add-contribution-form">
            <Form.Group className="mb-3">
              <Form.Label>Amount (KSH)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter contribution amount"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                min="0.01"
                step="0.01"
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter M-Pesa phone number (e.g., 0712345678)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="form-control-lg"
              />
            </Form.Group>
      
            <Form.Group className="mb-3">
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add notes about this contribution"
                value={contributionNotes}
                onChange={(e) => setContributionNotes(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
      
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setShowContributeModal(false)} className="me-2 px-4">
                Cancel
              </Button>
              <Button variant="success" type="submit" disabled={loading} className="px-4">
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Processing...</span>
                  </>
                ) : (
                  'Contribute'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ContributionTracker
