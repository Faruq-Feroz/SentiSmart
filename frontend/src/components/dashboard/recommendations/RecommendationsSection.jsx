import React from 'react'
import SmartRecommendations from './SmartRecommendations'
import DailyTips from './DailyTips'
import RecommendationBadges from './RecommendationBadges'
import './RecommendationsSection.scss'

const RecommendationsSection = () => {
  return (
    <div className="recommendations-section">
      <h2 className="section-title">Smart Recommendations & Tips</h2>
      <div className="recommendations-grid">
        <SmartRecommendations />
        <DailyTips />
      </div>
      <RecommendationBadges />
    </div>
  )
}

export default RecommendationsSection