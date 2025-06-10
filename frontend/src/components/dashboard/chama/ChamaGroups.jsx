import React, { useState, useContext } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { AuthContext } from '../../../context/AuthContext'
import { Button, Card, Modal, Alert } from 'react-bootstrap'
import CreateChamaForm from './CreateChamaForm'
import JoinChamaGroup from './JoinChamaGroup'
import './ChamaStyles.scss'

const ChamaGroups = () => {
  const { chamaGroups, loading, error, selectGroup, deleteGroup } = useContext(ChamaContext)
  const { user } = useContext(AuthContext)
  const [showCreateModal, setShowCreateModal] = useState(false)

  if (loading) return <div className="loading">Loading Chama groups...</div>

  return (
    <div className="chama-groups">
      <div className="chama-header">
        <h3>Your Chama Groups</h3>
        <div className="group-actions-container">
          <JoinChamaGroup />
          <Button variant="primary" onClick={() => setShowCreateModal(true)} className="w-100">
            Create New Group
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {chamaGroups.length === 0 ? (
        <div className="no-groups">
          <p>You don't have any Chama groups yet. Create one or join an existing group to get started!</p>
        </div>
      ) : (
        <div className="groups-grid">
          {chamaGroups.map(group => (
            <Card key={group._id} className="group-card">
              <Card.Body>
                <Card.Title className="mb-3">{group.name}</Card.Title>
                <Card.Text className="mb-3">{group.description}</Card.Text>
                <div className="group-stats">
                  <div className="stat">
                    <span className="stat-label">Members:</span>
                    <span className="stat-value">{group.members.length + 1}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Target:</span>
                    <span className="stat-value">KSH {group.targetAmount}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Contributed:</span>
                    <span className="stat-value">KSH {group.totalContributed}</span>
                  </div>
                </div>
                <div className="group-actions mt-3">
                  <Button variant="primary" onClick={() => selectGroup(group._id)}>
                    View Details
                  </Button>
                  {group.creator === user?.uid && (
                    <Button variant="outline-danger" onClick={() => deleteGroup(group._id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Chama Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateChamaForm onCancel={() => setShowCreateModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ChamaGroups
