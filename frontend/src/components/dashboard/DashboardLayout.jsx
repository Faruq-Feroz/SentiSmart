import React, { useState, useEffect } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'
import './SidebarStyles.css'

const DashboardLayout = ({ children }) => {
  // Default sidebar state - closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Only auto-open on desktop
      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay active" 
          onClick={handleOverlayClick}
        />
      )}
      
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : (sidebarOpen ? '250px' : '70px'),
        transition: 'margin-left 0.3s ease',
        width: '100%'
      }}>
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout