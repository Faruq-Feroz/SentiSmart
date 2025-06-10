import React, { useState, useEffect, useContext } from 'react'
import { Carousel } from 'react-bootstrap'
import { getDailyTips } from '../../../services/adviceService'
import { AuthContext } from '../../../context/AuthContext'
import { BudgetContext } from '../../../context/BudgetContext'
import './DailyTips.css'

const DailyTips = () => {
  const [tips, setTips] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)
  const { budget } = useContext(BudgetContext)

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true)
        const data = await getDailyTips()
        
        // Personalize tips based on user data if available
        if (budget && budget.expenses && budget.expenses.length > 0) {
          // Find categories with highest spending
          const categories = {}
          budget.expenses.forEach(expense => {
            if (categories[expense.category]) {
              categories[expense.category] += expense.amount
            } else {
              categories[expense.category] = expense.amount
            }
          })
          
          // Sort categories by amount
          const sortedCategories = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0])
          
          // Prioritize tips related to top spending categories
          const prioritizedTips = [...data]
          prioritizedTips.sort((a, b) => {
            const aRelevance = sortedCategories.some(cat => 
              a.text.toLowerCase().includes(cat.toLowerCase())
            ) ? 1 : 0
            const bRelevance = sortedCategories.some(cat => 
              b.text.toLowerCase().includes(cat.toLowerCase())
            ) ? 1 : 0
            return bRelevance - aRelevance
          })
          
          setTips(prioritizedTips)
        } else {
          setTips(data)
        }
        
        setError(null)
      } catch (err) {
        setError('Failed to load tips. Please try again later.')
        console.error('Error fetching tips:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [user, budget])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  if (loading) {
    return <div className="tips-loading">Loading tips...</div>
  }

  if (error) {
    return <div className="tips-error">{error}</div>
  }

  if (tips.length === 0) {
    return null
  }

  return (
    <div className="daily-tip-container">
      <h3 className="daily-tip-title">Daily Financial Tips</h3>
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect}
        interval={8000}
        indicators={true}
        controls={true}
        className="tips-carousel"
      >
        {tips.map((tip, idx) => (
          <Carousel.Item key={idx}>
            <div className="tip-card">
              <div className="tip-icon">
                <i className={`fas ${tip.icon || 'fa-lightbulb'}`}></i>
              </div>
              <p className="tip-text">"{tip.text}"</p>
              {tip.category && (
                <div className="tip-category">{tip.category}</div>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default DailyTips
