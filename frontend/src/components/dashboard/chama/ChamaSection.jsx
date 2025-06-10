import React, { useState, useContext } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { AuthContext } from '../../../context/AuthContext'
import ChamaGroups from './ChamaGroups'
import ChamaChat from './ChamaChat'
import ContributionTracker from './ContributionTracker'
import GroupMembers from './GroupMembers'
import { Tabs, Tab, Alert } from 'react-bootstrap'
import './ChamaStyles.scss'

const ChamaSection = () => {
  const { selectedGroup, error } = useContext(ChamaContext)
  const { user, isAuthenticated } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('contributions')

  if (!isAuthenticated) {
    return (
      <div className="chama-section">
        <h2>Chama Groups</h2>
        <div className="login-prompt">
          Please log in to access Chama groups.
        </div>
      </div>
    )
  }

  return (
    <div className="chama-section">
      <h2>Chama Groups</h2>
      <p className="section-description">
        Team up with up to 3 friends to save money together. Track contributions and chat in real-time.
      </p>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="chama-content">
        <div className="chama-sidebar">
          <ChamaGroups />
        </div>
        
        {selectedGroup ? (
          <div className="chama-main">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="contributions" title="Contributions">
                <ContributionTracker />
              </Tab>
              <Tab eventKey="members" title="Members">
                <GroupMembers />
              </Tab>
              <Tab eventKey="chat" title="Group Chat">
                <ChamaChat />
              </Tab>
            </Tabs>
          </div>
        ) : (
          <div className="chama-main empty-state">
            <div className="empty-state-message">
              <h4>Select a Chama group or create a new one</h4>
              <p>Track contributions and chat with your group members in real-time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChamaSection