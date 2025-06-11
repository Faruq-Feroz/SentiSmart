// FinancialAdvisor.jsx
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { BudgetContext } from '../../../context/BudgetContext'
import './AdvisorStyles.scss'

const FinancialAdvisor = () => {
  const { user } = useContext(AuthContext)
  const { budget, setBudget } = useContext(BudgetContext)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [showAdviceButton, setShowAdviceButton] = useState(true)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initial greeting when component mounts
  useEffect(() => {
    const userName = user?.displayName?.split(' ')[0] || 'there'
    const initialMessage = {
      type: 'assistant',
      text: `Hello ${userName}! I'm your financial advisor. How can I help you today?`,
      timestamp: new Date(),
      showButton: true
    }
    setMessages([initialMessage])
  }, [user])

  // Handle financial advice request
  const handleAdviceRequest = async () => {
    setLoading(true)
    setShowAdviceButton(false)
    setHasAnalyzed(true)
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: 'Please provide me with financial advice',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate personalized advice
    const advice = generatePersonalizedAdvice()
    
    // Add assistant response
    const assistantMessage = {
      type: 'assistant',
      text: advice,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
    setLoading(false)
  }

  // Generate financial advice based on budget data
  const generateAdvice = async () => {
    setLoading(true)
    setHasAnalyzed(true)
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: 'Please analyze my financial situation',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate personalized advice
    const advice = generatePersonalizedAdvice()
    
    // Add assistant response
    const assistantMessage = {
      type: 'assistant',
      text: advice,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
    setLoading(false)
  }

  // Generate personalized financial advice based on budget data
  const generatePersonalizedAdvice = () => {
    const userName = user?.displayName?.split(' ')[0] || 'there'
    const totalExpenses = budget.expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0
    const savings = (budget.income || 0) - totalExpenses
    const savingsPercentage = budget.income > 0 ? (savings / budget.income) * 100 : 0
    
    let advice = `📊 **Financial Analysis for ${userName}**\n\n`
    
    // Income analysis
    if (!budget.income || budget.income === 0) {
      advice += "⚠️ **Income Status**: No income recorded\n"
      advice += "Please update your monthly income to get personalized advice.\n\n"
    } else {
      advice += `💰 **Monthly Income**: $${budget.income.toFixed(2)}\n\n`
    }
    
    // Expense analysis
    if (!budget.expenses || budget.expenses.length === 0) {
      advice += "📝 **Expenses**: No expenses tracked yet\n"
      advice += "Start adding your expenses to get detailed spending insights.\n\n"
    } else {
      advice += `💸 **Total Expenses**: $${totalExpenses.toFixed(2)} (${(totalExpenses / budget.income * 100).toFixed(1)}% of income)\n\n`
      
      // Categorize expenses
      const expensesByCategory = {}
      budget.expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
          expensesByCategory[expense.category] = 0
        }
        expensesByCategory[expense.category] += expense.amount
      })
      
      // Find highest expense category
      let highestCategory = ''
      let highestAmount = 0
      
      Object.entries(expensesByCategory).forEach(([category, amount]) => {
        if (amount > highestAmount) {
          highestCategory = category
          highestAmount = amount
        }
      })
      
      if (highestCategory) {
        advice += `🔍 **Top Spending Category**: ${highestCategory} - $${highestAmount.toFixed(2)} (${(highestAmount / totalExpenses * 100).toFixed(1)}% of expenses)\n\n`
      }
    }
    
    // Savings analysis
    if (budget.income > 0) {
      advice += `💵 **Monthly Savings**: $${savings.toFixed(2)} (${savingsPercentage.toFixed(1)}% of income)\n\n`
      
      if (savingsPercentage < 0) {
        advice += `🚨 **Alert**: You're spending more than you earn! This needs immediate attention.\n\n`
      } else if (savingsPercentage < 10) {
        advice += `⚡ **Savings Goal**: Aim for at least 10-20% savings rate for financial security.\n\n`
      } else if (savingsPercentage < 20) {
        advice += `✅ **Good Progress**: You're saving well! Try to reach 20% for optimal financial health.\n\n`
      } else {
        advice += `🎉 **Excellent**: You're saving over 20% - fantastic financial discipline!\n\n`
      }
    }
    
    // Recommendations
    advice += "🎯 **Personalized Recommendations**:\n\n"
    
    if (!budget.income || budget.income === 0) {
      advice += "1. **Set Your Income** - Add your monthly income for accurate analysis\n"
    }
    
    if (!budget.expenses || budget.expenses.length === 0) {
      advice += "2. **Track Expenses** - Start logging your daily expenses\n"
    }
    
    if (savingsPercentage < 20 && budget.income > 0) {
      advice += "3. **Boost Savings** - Follow the 50/30/20 rule (50% needs, 30% wants, 20% savings)\n"
      advice += "4. **Review Spending** - Look for non-essential expenses to reduce\n"
    }
    
    if (savingsPercentage >= 20) {
      advice += "3. **Investment Planning** - Consider investing your surplus for long-term growth\n"
      advice += "4. **Emergency Fund** - Ensure you have 3-6 months of expenses saved\n"
    }
    
    // Add motivational tip
    const tips = [
      "Small changes in spending habits can lead to significant savings over time!",
      "Automating your savings helps build wealth without thinking about it.",
      "The best time to start investing was yesterday, the second best time is today.",
      "Building an emergency fund provides peace of mind and financial security.",
      "Tracking expenses for just one month can reveal surprising spending patterns."
    ]
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    advice += `\n💡 **Pro Tip**: ${randomTip}`
    
    return advice
  }

  return (
    <div className="advisor-container">
      <div className="advisor-header">
        <div className="header-content">
          <div className="ai-icon">🤖</div>
          <div className="header-text">
            <h3>AI Financial Advisor</h3>
            <p>Get personalized insights about your finances</p>
          </div>
        </div>
      </div>
      
      {!hasAnalyzed && (
        <div className="analyze-section">
          <div className="analyze-content">
            <h4>Ready for Your Financial Analysis?</h4>
            <p>I'll analyze your income, expenses, and savings to provide personalized recommendations.</p>
            <button 
              className="analyze-button"
              onClick={generateAdvice}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="button-icon">📊</span>
                  Analyse My Finances
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      <div className={`chat-messages ${!hasAnalyzed ? 'compact' : ''}`}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="message-bubble">
              <div className="message-content">
                {message.text.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={i}>{line.slice(2, -2)}</strong>
                  }
                  return line ? <p key={i}>{line}</p> : <br key={i} />
                })}
              </div>
              {message.showButton && showAdviceButton && (
                <div className="advice-button-container">
                  <button 
                    className="advice-button"
                    onClick={handleAdviceRequest}
                    disabled={loading}
                  >
                    {loading ? 'Getting advice...' : 'Ask for Financial Advice'}
                  </button>
                </div>
              )}
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-bubble loading-message">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <p>Analyzing your financial data...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {hasAnalyzed && (
        <div className="chat-footer">
          <button 
            className="reanalyze-button"
            onClick={generateAdvice}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Again'}
          </button>
        </div>
      )}
    </div>
  )
}

export default FinancialAdvisor