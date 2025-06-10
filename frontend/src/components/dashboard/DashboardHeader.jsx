import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBell, FaSignOutAlt, FaBars, FaUserCog, FaUserSlash, FaTrash } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { NotificationContext } from '../../context/NotificationContext'

const DashboardHeader = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext)
  const { notifications, addNotification } = useContext(NotificationContext)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [tips, setTips] = useState([])
  const navigate = useNavigate()

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.displayName) return 'U'
    return user.displayName.split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowUserMenu(false)
  }

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    setShowNotifications(false)
  }

  // Handle delete account (frontend only for now)
  const handleDeleteAccount = () => {
    setShowDeleteModal(true)
    setShowUserMenu(false)
  }

  // Handle suspend account (frontend only for now)
  const handleSuspendAccount = () => {
    setShowSuspendModal(true)
    setShowUserMenu(false)
  }

  // Confirm delete account
  const confirmDeleteAccount = () => {
    // This would connect to backend in the future
    alert('Your account will be deleted. This is just a frontend demo.')
    setShowDeleteModal(false)
    // In a real implementation, we would call an API endpoint here
    // and then log the user out after successful deletion
    handleLogout()
  }

  // Confirm suspend account
  const confirmSuspendAccount = () => {
    // This would connect to backend in the future
    alert('Your account will be suspended. This is just a frontend demo.')
    setShowSuspendModal(false)
    // In a real implementation, we would call an API endpoint here
    // and then log the user out after successful suspension
    handleLogout()
  }

  // Financial tips for notifications
  useEffect(() => {
    // These would normally come from your backend API
    const financialTips = [
      {
        id: 1,
        text: "Save at least 20% of your income each month for financial security.",
        category: "savings"
      },
      {
        id: 2,
        text: "Track all your expenses for a month to identify spending patterns.",
        category: "budgeting"
      },
      {
        id: 3,
        text: "Set up automatic transfers to your savings account on payday.",
        category: "automation"
      },
      {
        id: 4,
        text: "Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings.",
        category: "budgeting"
      },
      {
        id: 5,
        text: "Build an emergency fund that covers 3-6 months of expenses.",
        category: "emergency"
      }
    ]
    
    setTips(financialTips)
    
    // Add a random tip as a notification when component mounts
    const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)]
    addNotification({
      id: Date.now(),
      title: 'Financial Tip',
      message: randomTip.text,
      timestamp: new Date(),
      read: false
    })
  }, [])

  return (
    <header style={{ 
      padding: '15px 20px', 
      borderBottom: '1px solid #dee2e6', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      background: 'white',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={toggleSidebar}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '20px',
            marginRight: '15px'
          }}
        >
          <FaBars />
        </button>
        <h2>Dashboard</h2>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Notifications */}
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <button 
            onClick={toggleNotifications}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '20px' 
            }}
          >
            <FaBell />
            {notifications.length > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-5px', 
                right: '-5px', 
                background: 'red', 
                color: 'white', 
                borderRadius: '50%', 
                width: '18px', 
                height: '18px', 
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {notifications.length}
              </span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div style={{ 
              position: 'absolute', 
              top: '40px', 
              right: '-10px', 
              width: '300px', 
              background: 'white', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              borderRadius: '4px',
              zIndex: 1000
            }}>
              <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <h4 style={{ margin: 0 }}>Notifications</h4>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      style={{ 
                        padding: '10px', 
                        borderBottom: '1px solid #eee',
                        background: notification.read ? 'white' : '#f0f7ff'
                      }}
                    >
                      <h5 style={{ margin: '0 0 5px' }}>{notification.title}</h5>
                      <p style={{ margin: '0 0 5px' }}>{notification.message}</p>
                      <small style={{ color: '#777' }}>
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* User account */}
        <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#333' }}>Home</Link>
        
        {/* User avatar with initials */}
        <div 
          onClick={toggleUserMenu}
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: '#007bff', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginRight: '15px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {getUserInitials()}
        </div>
        
        {/* User menu dropdown */}
        {showUserMenu && (
          <div style={{ 
            position: 'absolute', 
            top: '70px', 
            right: '80px', 
            width: '200px', 
            background: 'white', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
            borderRadius: '4px',
            zIndex: 1000
          }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <h4 style={{ margin: 0 }}>{user?.displayName || 'User'}</h4>
              <small style={{ color: '#777' }}>{user?.email}</small>
            </div>
            <div>
              <button 
                onClick={handleSuspendAccount}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px', 
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <FaUserSlash style={{ marginRight: '10px', color: '#f0ad4e' }} />
                Suspend Account
              </button>
              <button 
                onClick={handleDeleteAccount}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px', 
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#dc3545'
                }}
              >
                <FaTrash style={{ marginRight: '10px' }} />
                Delete Account
              </button>
              <button 
                onClick={handleLogout}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px', 
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <FaSignOutAlt style={{ marginRight: '10px' }} />
                Logout
              </button>
            </div>
          </div>
        )}
        
        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%'
            }}>
              <h3 style={{ color: '#dc3545', marginTop: 0 }}>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteAccount}
                  style={{ 
                    padding: '8px 16px', 
                    border: 'none',
                    borderRadius: '4px',
                    background: '#dc3545',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Suspend Account Modal */}
        {showSuspendModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%'
            }}>
              <h3 style={{ color: '#f0ad4e', marginTop: 0 }}>Suspend Account</h3>
              <p>Are you sure you want to suspend your account? You can reactivate it later by contacting support.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  onClick={() => setShowSuspendModal(false)}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmSuspendAccount}
                  style={{ 
                    padding: '8px 16px', 
                    border: 'none',
                    borderRadius: '4px',
                    background: '#f0ad4e',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Suspend Account
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Remove the standalone logout button since it's now in the dropdown */}
      </div>
    </header>
  )
}

export default DashboardHeader