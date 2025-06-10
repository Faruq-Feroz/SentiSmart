import React, { useContext, useState, useEffect } from 'react'
import { BudgetContext } from '../../../context/BudgetContext'
import { Card, ListGroup, Badge } from 'react-bootstrap'

const CutbackSuggestions = () => {
  const { budget } = useContext(BudgetContext)
  const [suggestions, setSuggestions] = useState([])
  
  useEffect(() => {
    if (budget && budget.expenses && budget.expenses.length > 0) {
      const newSuggestions = []
      const totalExpenses = budget.expenses.reduce((sum, expense) => sum + expense.amount, 0)
      
      // Group expenses by category
      const categories = {}
      budget.expenses.forEach(expense => {
        if (categories[expense.category]) {
          categories[expense.category] += expense.amount
        } else {
          categories[expense.category] = expense.amount
        }
      })
      
      // Calculate percentage of each category
      const categoryPercentages = {}
      Object.keys(categories).forEach(category => {
        categoryPercentages[category] = (categories[category] / totalExpenses) * 100
      })
      
      // Generate suggestions based on category percentages
      if (categoryPercentages['Food'] && categoryPercentages['Food'] > 30) {
        newSuggestions.push({
          category: 'Food',
          message: `You're spending ${categoryPercentages['Food'].toFixed(1)}% on food. Try meal planning and cooking at home to reduce this to 20-25%.`,
          priority: 'high',
          potentialSavings: ((categoryPercentages['Food'] - 25) / 100) * totalExpenses
        })
      }
      
      if (categoryPercentages['Entertainment'] && categoryPercentages['Entertainment'] > 10) {
        newSuggestions.push({
          category: 'Entertainment',
          message: `Entertainment expenses are ${categoryPercentages['Entertainment'].toFixed(1)}% of your budget. Consider free or low-cost alternatives.`,
          priority: 'medium',
          potentialSavings: ((categoryPercentages['Entertainment'] - 5) / 100) * totalExpenses
        })
      }
      
      if (categoryPercentages['Transport'] && categoryPercentages['Transport'] > 15) {
        newSuggestions.push({
          category: 'Transport',
          message: `Transport costs are ${categoryPercentages['Transport'].toFixed(1)}% of your budget. Consider carpooling, public transport, or cycling.`,
          priority: 'medium',
          potentialSavings: ((categoryPercentages['Transport'] - 10) / 100) * totalExpenses
        })
      }
      
      if (categoryPercentages['Rent'] && categoryPercentages['Rent'] > 40) {
        newSuggestions.push({
          category: 'Rent',
          message: `Your rent is ${categoryPercentages['Rent'].toFixed(1)}% of your expenses. The recommended maximum is 30%. Consider a roommate or a more affordable place.`,
          priority: 'high',
          potentialSavings: ((categoryPercentages['Rent'] - 30) / 100) * totalExpenses
        })
      }
      
      if (categoryPercentages['Shopping'] && categoryPercentages['Shopping'] > 10) {
        newSuggestions.push({
          category: 'Shopping',
          message: `You're spending ${categoryPercentages['Shopping'].toFixed(1)}% on shopping. Try implementing a 48-hour rule before non-essential purchases.`,
          priority: 'medium',
          potentialSavings: ((categoryPercentages['Shopping'] - 5) / 100) * totalExpenses
        })
      }
      
      if (categoryPercentages['Utilities'] && categoryPercentages['Utilities'] > 10) {
        newSuggestions.push({
          category: 'Utilities',
          message: `Utilities are ${categoryPercentages['Utilities'].toFixed(1)}% of your budget. Consider energy-saving measures and reviewing service plans.`,
          priority: 'low',
          potentialSavings: ((categoryPercentages['Utilities'] - 8) / 100) * totalExpenses
        })
      }
      
      // Sort suggestions by priority and potential savings
      newSuggestions.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        return b.potentialSavings - a.potentialSavings
      })
      
      setSuggestions(newSuggestions)
    }
  }, [budget])

  if (suggestions.length === 0) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Cutback Suggestions</Card.Title>
          <p>No cutback suggestions available. Add more expense data to receive personalized recommendations.</p>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Cutback Suggestions</Card.Title>
        <p>Based on your spending patterns, here are some areas where you could potentially save:</p>
        
        <ListGroup variant="flush">
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{suggestion.category}</div>
                {suggestion.message}
                <div className="mt-2">
                  <strong>Potential monthly savings:</strong> ${suggestion.potentialSavings.toFixed(2)}
                </div>
              </div>
              <Badge 
                bg={suggestion.priority === 'high' ? 'danger' : suggestion.priority === 'medium' ? 'warning' : 'info'}
                pill
              >
                {suggestion.priority}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default CutbackSuggestions
