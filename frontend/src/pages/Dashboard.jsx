import React from 'react'
import { useLocation } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import DashboardOverview from '../components/dashboard/DashboardOverview'
import BudgetSection from '../components/dashboard/budget/BudgetSection'
import SavingsSection from '../components/dashboard/savings/SavingsSection'
import ChamaSection from '../components/dashboard/chama/ChamaSection'
import InsightsSection from '../components/dashboard/insights/InsightsSection'
import RecommendationsSection from '../components/dashboard/recommendations/RecommendationsSection'
import ReportsSection from '../components/dashboard/reports/ReportsSection'
import DonationsSection from '../components/dashboard/donations/DonationsSection'
import MPESASection from '../components/dashboard/mpesa/MPESASection'
import FinancialVideos from '../components/dashboard/videos/FinancialVideos'

const Dashboard = () => {
  const location = useLocation()
  const path = location.pathname

  // Render different components based on the current path
  const renderDashboardContent = () => {
    if (path === '/dashboard') return <DashboardOverview />
    if (path === '/dashboard/budget') return <BudgetSection />
    if (path === '/dashboard/savings') return <SavingsSection />
    if (path === '/dashboard/chama') return <ChamaSection />
    if (path === '/dashboard/insights') return <InsightsSection />
    if (path === '/dashboard/recommendations') return <RecommendationsSection />
    if (path === '/dashboard/videos') return <FinancialVideos />
    if (path === '/dashboard/reports') return <ReportsSection />
    if (path === '/dashboard/donations') return <DonationsSection />
    if (path === '/dashboard/mpesa') return <MPESASection />
    
    // Default to overview if path doesn't match
    return <DashboardOverview />
  }

  return (
    <DashboardLayout>
      {renderDashboardContent()}
    </DashboardLayout>
  )
}

export default Dashboard
