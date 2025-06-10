import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTimes, FaBars, FaChartPie, FaWallet, FaPiggyBank, FaUsers, 
         FaChartLine, FaLightbulb, FaFileAlt, FaHandHoldingHeart, FaMobile, FaVideo } from 'react-icons/fa'
import './SidebarStyles.css' // Import the CSS file

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen ? <h3>SentiSmart</h3> : <h3>SS</h3>}
        <button 
          onClick={toggleSidebar} 
          className="sidebar-toggle"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <span className="nav-icon"><FaChartPie /></span>
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/budget" className={`nav-link ${isActive('/dashboard/budget') ? 'active' : ''}`}>
              <span className="nav-icon"><FaWallet /></span>
              {isOpen && <span>Budget</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/savings" className={`nav-link ${isActive('/dashboard/savings') ? 'active' : ''}`}>
              <span className="nav-icon"><FaPiggyBank /></span>
              {isOpen && <span>Savings</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/chama" className={`nav-link ${isActive('/dashboard/chama') ? 'active' : ''}`}>
              <span className="nav-icon"><FaUsers /></span>
              {isOpen && <span>Chama</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/insights" className={`nav-link ${isActive('/dashboard/insights') ? 'active' : ''}`}>
              <span className="nav-icon"><FaChartLine /></span>
              {isOpen && <span>Insights</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/recommendations" className={`nav-link ${isActive('/dashboard/recommendations') ? 'active' : ''}`}>
              <span className="nav-icon"><FaLightbulb /></span>
              {isOpen && <span>Recommendations</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/videos" className={`nav-link ${isActive('/dashboard/videos') ? 'active' : ''}`}>
              <span className="nav-icon"><FaVideo /></span>
              {isOpen && <span>Videos</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reports" className={`nav-link ${isActive('/dashboard/reports') ? 'active' : ''}`}>
              <span className="nav-icon"><FaFileAlt /></span>
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/donations" className={`nav-link ${isActive('/dashboard/donations') ? 'active' : ''}`}>
              <span className="nav-icon"><FaHandHoldingHeart /></span>
              {isOpen && <span>Donations</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/mpesa" className={`nav-link ${isActive('/dashboard/mpesa') ? 'active' : ''}`}>
              <span className="nav-icon"><FaMobile /></span>
              {isOpen && <span>M-PESA</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default DashboardSidebar