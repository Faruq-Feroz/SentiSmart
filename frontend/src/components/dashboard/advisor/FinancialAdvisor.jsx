import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { BudgetContext } from '../../../context/BudgetContext'
import './AdvisorStyles.scss'

const FinancialAdvisor = () => {
  const { user } = useContext(AuthContext)
  const { budget, setBudget } = useContext(BudgetContext)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
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
      timestamp: new Date()
    }
    setMessages([initialMessage])
  }, [user])

  // Generate financial advice based on budget data
  const generateAdvice = async () => {
    setLoading(true)
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: inputMessage || 'Can you analyze my financial situation?',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
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
    const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const savings = budget.income - totalExpenses
    const savingsPercentage = budget.income > 0 ? (savings / budget.income) * 100 : 0
    
    let advice = `Hi ${userName}, here's my analysis of your financial situation:\n\n`
    
    // Income analysis
    if (budget.income === 0) {
      advice += "I notice you haven't set your income yet. Please update your monthly income so I can provide more personalized advice.\n\n"
    } else {
      advice += `Your monthly income is $${budget.income.toFixed(2)}.\n\n`
      
      // NEW: Income trend analysis
      if (budget.previousIncome && budget.previousIncome > 0) {
        const incomeDifference = budget.income - budget.previousIncome
        const percentChange = (incomeDifference / budget.previousIncome) * 100
        
        if (incomeDifference > 0) {
          advice += `Congratulations! Your income has increased by ${percentChange.toFixed(1)}% since your last update. This is a great opportunity to increase your savings rate.\n\n`
        } else if (incomeDifference < 0) {
          advice += `I notice your income has decreased by ${Math.abs(percentChange).toFixed(1)}% since your last update. Let's adjust your budget to accommodate this change.\n\n`
        }
      }
    }
    
    // Expense analysis
    if (budget.expenses.length === 0) {
      advice += "You haven't added any expenses yet. Start tracking your expenses to get insights on your spending habits.\n\n"
    } else {
      advice += `Your total monthly expenses are $${totalExpenses.toFixed(2)}, which is ${(totalExpenses / budget.income * 100).toFixed(1)}% of your income.\n\n`
      
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
      
      advice += `Your highest spending category is ${highestCategory} at $${highestAmount.toFixed(2)} (${(highestAmount / totalExpenses * 100).toFixed(1)}% of expenses).\n\n`
      
      // Check for concerning expense patterns
      if (highestCategory === 'Housing/Rent' && highestAmount > budget.income * 0.4) {
        advice += `Your housing costs exceed 40% of your income. This might be stretching your budget too thin. Consider if there are ways to reduce this expense or find a roommate to share costs.\n\n`
      }
      
      if (highestCategory === 'Food' && highestAmount > budget.income * 0.3) {
        advice += `You're spending over 30% of your income on food. Consider meal planning, cooking at home more often, and using grocery shopping apps that offer discounts to reduce costs.\n\n`
      }
      
      // NEW: Transportation expense analysis
      const transportationExpenses = expensesByCategory['Transportation'] || 0
      if (transportationExpenses > budget.income * 0.15) {
        advice += `Your transportation costs are relatively high at ${(transportationExpenses / budget.income * 100).toFixed(1)}% of your income. Consider carpooling, public transit, or exploring remote work options if available.\n\n`
      }
      
      // NEW: Entertainment expense analysis
      const entertainmentExpenses = expensesByCategory['Entertainment'] || 0
      if (entertainmentExpenses > budget.income * 0.1) {
        advice += `Your entertainment spending is ${(entertainmentExpenses / budget.income * 100).toFixed(1)}% of your income. Look for free or low-cost entertainment options like community events, parks, or streaming services instead of more expensive outings.\n\n`
      }
      
      // NEW: Utilities expense analysis
      const utilitiesExpenses = expensesByCategory['Utilities'] || 0
      if (utilitiesExpenses > budget.income * 0.1) {
        advice += `Your utility bills account for ${(utilitiesExpenses / budget.income * 100).toFixed(1)}% of your income. Consider energy-saving measures like LED bulbs, unplugging devices when not in use, and adjusting your thermostat to reduce costs.\n\n`
      }
    }
    
    // Savings analysis
    if (budget.income > 0) {
      advice += `You're currently saving $${savings.toFixed(2)} per month, which is ${savingsPercentage.toFixed(1)}% of your income.\n\n`
      
      if (savingsPercentage < 0) {
        advice += `⚠️ Warning: You're spending more than you earn. This is not sustainable long-term and will lead to debt. Let's look at ways to reduce your expenses or increase your income.\n\n`
        advice += `Consider the 50/30/20 rule: allocate 50% of your income to needs, 30% to wants, and 20% to savings. Right now, you're exceeding 100% on needs and wants combined.\n\n`
      } else if (savingsPercentage < 10) {
        advice += `Your savings rate is below the recommended minimum of 10%. Try to find areas where you can cut back on expenses.\n\n`
        advice += `The 50/30/20 rule suggests allocating 20% of your income to savings. You're currently at ${savingsPercentage.toFixed(1)}%, which means you should aim to save about $${(budget.income * 0.2).toFixed(2)} per month.\n\n`
      } else if (savingsPercentage < 20) {
        advice += `Your savings rate is good, but aiming for 20% would provide more financial security. Consider small adjustments to increase your savings.\n\n`
        advice += `You're on the right track! Just a few small changes could get you to the ideal 20% savings rate.\n\n`
      } else {
        advice += `Great job! You're saving more than 20% of your income, which is excellent for long-term financial health.\n\n`
        advice += `With your strong savings rate, you might want to consider different investment options to make your money work harder for you.\n\n`
      }
      
      // NEW: Emergency fund analysis
      if (budget.emergencyFund) {
        const monthsCovered = budget.emergencyFund / totalExpenses
        if (monthsCovered < 3) {
          advice += `Your emergency fund would cover your expenses for about ${monthsCovered.toFixed(1)} months. Financial experts recommend having 3-6 months of expenses saved. Keep building this fund!\n\n`
        } else if (monthsCovered >= 3 && monthsCovered < 6) {
          advice += `Your emergency fund would cover your expenses for about ${monthsCovered.toFixed(1)} months, which is a good start. Consider building it up to 6 months for extra security.\n\n`
        } else {
          advice += `Excellent! Your emergency fund would cover your expenses for about ${monthsCovered.toFixed(1)} months, which exceeds the recommended 3-6 months of expenses.\n\n`
        }
      } else {
        advice += `I don't see information about your emergency fund. Financial experts recommend saving 3-6 months of expenses in an easily accessible account for unexpected situations.\n\n`
      }
    }
    
    // NEW: Debt analysis
    if (budget.debts && budget.debts.length > 0) {
      const totalDebt = budget.debts.reduce((sum, debt) => sum + debt.amount, 0)
      const monthlyDebtPayments = budget.debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0)
      const debtToIncomeRatio = monthlyDebtPayments / budget.income
      
      advice += `Your total debt is $${totalDebt.toFixed(2)}, with monthly payments of $${monthlyDebtPayments.toFixed(2)}.\n\n`
      
      if (debtToIncomeRatio > 0.4) {
        advice += `⚠️ Your debt-to-income ratio is ${(debtToIncomeRatio * 100).toFixed(1)}%, which is considered high. Lenders typically prefer a ratio below 36%. Focus on paying down high-interest debt first.\n\n`
      } else if (debtToIncomeRatio > 0.3) {
        advice += `Your debt-to-income ratio is ${(debtToIncomeRatio * 100).toFixed(1)}%, which is moderate but approaching the high range. Consider accelerating payments on high-interest debt.\n\n`
      } else {
        advice += `Your debt-to-income ratio is ${(debtToIncomeRatio * 100).toFixed(1)}%, which is in a healthy range. Continue making regular payments and consider the debt snowball or avalanche method to pay off debt efficiently.\n\n`
      }
    }
    
    // NEW: Financial goals analysis
    if (budget.financialGoals && budget.financialGoals.length > 0) {
      advice += "Progress on your financial goals:\n"
      
      budget.financialGoals.forEach(goal => {
        const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100
        advice += `- ${goal.name}: $${goal.currentAmount.toFixed(2)}/$${goal.targetAmount.toFixed(2)} (${progressPercentage.toFixed(1)}% complete)\n`
        
        if (goal.targetDate) {
          const today = new Date()
          const targetDate = new Date(goal.targetDate)
          const monthsRemaining = (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth())
          const monthlyContributionNeeded = (goal.targetAmount - goal.currentAmount) / monthsRemaining
          
          if (monthsRemaining > 0) {
            advice += `  You need to save $${monthlyContributionNeeded.toFixed(2)} monthly to reach this goal by ${targetDate.toLocaleDateString()}.\n`
          } else {
            advice += `  This goal's target date has passed. Consider setting a new timeline.\n`
          }
        }
      })
      
      advice += "\n"
    }
    
    // Recommendations
    advice += "Here are my recommendations:\n"
    
    if (budget.income === 0) {
      advice += "1. Set your monthly income\n"
    }
    
    if (budget.expenses.length === 0) {
      advice += "1. Start tracking your expenses\n"
    }
    
    if (savingsPercentage < 20 && budget.income > 0) {
      advice += "1. Aim to save at least 20% of your income\n"
      advice += "2. Review your budget for non-essential expenses you can reduce\n"
      
      // NEW: Specific recommendations based on expense categories
      const expensesByCategory = {}
      budget.expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
          expensesByCategory[expense.category] = 0
        }
        expensesByCategory[expense.category] += expense.amount
      })
      
      if (expensesByCategory['Entertainment'] > budget.income * 0.08) {
        advice += "3. Reduce entertainment expenses by finding free or low-cost alternatives\n"
      }
      
      if (expensesByCategory['Food'] > budget.income * 0.15) {
        advice += "4. Cut food costs by meal planning and reducing dining out\n"
      }
      
      if (expensesByCategory['Shopping'] > budget.income * 0.1) {
        advice += "5. Implement a 24-hour rule before making non-essential purchases\n"
      }
    }
    
    if (savingsPercentage >= 20) {
      advice += "1. Consider investing your savings for long-term growth\n"
      advice += "2. Set up an emergency fund if you haven't already\n"
      advice += "3. Think about your financial goals and allocate savings accordingly\n"
      
      // NEW: Investment recommendations
      advice += "4. Look into tax-advantaged retirement accounts like 401(k) or IRA\n"
      advice += "5. Consider diversifying your investments across different asset classes\n"
    }
    
    // NEW: Add seasonal tips based on current month
    const currentMonth = new Date().getMonth()
    
    if (currentMonth >= 0 && currentMonth <= 2) { // Jan-Mar
      advice += "\nSeasonal Tip: It's tax season! Make sure you're gathering all necessary documents and considering tax-advantaged investments.\n"
    } else if (currentMonth >= 3 && currentMonth <= 5) { // Apr-Jun
      advice += "\nSeasonal Tip: Spring is a good time to review your insurance policies and make sure you're adequately covered.\n"
    } else if (currentMonth >= 6 && currentMonth <= 8) { // Jul-Sep
      advice += "\nSeasonal Tip: Back-to-school season can be expensive. Look for sales and consider second-hand options for supplies and clothing.\n"
    } else { // Oct-Dec
      advice += "\nSeasonal Tip: Holiday season is approaching. Set a holiday budget now to avoid January credit card shock.\n"
    }
    
    // NEW: Add a random financial tip
    const financialTips = [
      "Automate your savings by setting up automatic transfers to your savings account on payday.",
      "Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings.",
      "Build an emergency fund that covers 3-6 months of expenses.",
      "Pay off high-interest debt before focusing on investments.",
      "Review your budget regularly and adjust as your income or expenses change.",
      "Avoid impulse purchases by waiting 24 hours before buying non-essential items.",
      "Invest in your skills to increase your earning potential.",
      "Use mobile banking apps to monitor your accounts and track spending.",
      "Consider using cash for discretionary spending to make your budget more tangible.",
      "Shop around for better rates on insurance, phone plans, and other recurring expenses.",
      "Take advantage of employer matching for retirement contributions—it's free money!",
      "Create separate savings accounts for different financial goals to track progress better.",
      "Look into refinancing high-interest loans if your credit score has improved.",
      "Check your credit report annually for errors that might affect your credit score.",
      "Consider a side hustle to increase your income and accelerate your financial goals."
    ]
    
    const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)]
    advice += `\nFinancial Tip: ${randomTip}\n`
    
    return advice
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() || !loading) {
      generateAdvice()
    }
  }

  return (
    <div className="advisor-container">
      <div className="chat-header">
        <h3>Financial Advisor</h3>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message assistant loading">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask for financial advice..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default FinancialAdvisor