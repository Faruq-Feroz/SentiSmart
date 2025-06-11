// DashboardOverview.jsx
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import FinancialSummary from './summary/FinancialSummary'
import SalaryInput from './input/SalaryInput'
import ExpenseInput from './input/ExpenseInput'
import FinancialAdvisor from './advisor/FinancialAdvisor'
import SavedBudgets from './budget/SavedBudgets'
import './DashboardStyles.css'

const DashboardOverview = () => {
  const { user } = useContext(AuthContext)
  const userName = user?.displayName?.split(' ')[0] || 'there'
  const containerRef = useRef(null)
  const welcomeRef = useRef(null)
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    // Initial scroll attempts
    const initialScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    initialScroll();
    
    // Then set a timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Try scrolling again
      initialScroll();
      
      // Scroll to welcome message with negative offset to account for sticky header
      if (welcomeRef.current) {
        const headerHeight = 60; // Approximate height of the sticky header
        const yPosition = welcomeRef.current.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: 0, // Force to absolute top first
          behavior: 'auto'
        });
        
        // Then immediately scroll to the welcome message with offset
        window.scrollTo({
          top: Math.max(0, yPosition - 20), // Subtract additional 20px to ensure it's visible
          behavior: 'auto'
        });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="dashboard-container" ref={containerRef}>
      <div className="dashboard-header" ref={welcomeRef}>
        <h2 className="dashboard-title">Welcome back, {userName}!</h2>
        <p className="dashboard-subtitle">Let's manage your finances smartly</p>
      </div>
     
      <div className="dashboard-layout">
        <div className="input-section">
          <SalaryInput />
          <ExpenseInput variant="compact" />
          <SavedBudgets />
        </div>
       
        <div className="advisor-section">
          <FinancialAdvisor />
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview