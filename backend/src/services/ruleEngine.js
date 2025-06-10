// Rule Engine Service - Simulates AI behavior with predefined rules
const User = require('../models/User');

class RuleEngine {
  constructor() {
    // Define rule categories
    this.rules = {
      budget: [],
      savings: [],
      expenses: []
    };
    
    // Initialize rules
    this.initializeRules();
  }

  initializeRules() {
    // Budget rules
    this.rules.budget = [
      {
        id: 'budget_001',
        condition: (data) => !data.budget || data.budget.income === 0,
        recommendation: (data) => ({
          type: 'warning',
          message: 'Please set your monthly income to get personalized recommendations.',
          action: 'SET_INCOME'
        })
      },
      {
        id: 'budget_002',
        condition: (data) => data.budget && data.budget.expenses.length === 0,
        recommendation: (data) => ({
          type: 'info',
          message: 'Start tracking your expenses to get insights on your spending habits.',
          action: 'ADD_EXPENSE'
        })
      }
    ];

    // Savings rules
    this.rules.savings = [
      {
        id: 'savings_001',
        condition: (data) => {
          if (!data.budget || !data.budget.income) return false;
          const totalExpenses = data.budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);
          const savingsRate = (data.budget.income - totalExpenses) / data.budget.income;
          return savingsRate < 0.1; // Less than 10% savings
        },
        recommendation: (data) => {
          const userName = data.user ? data.user.displayName.split(' ')[0] : 'there';
          return {
            type: 'warning',
            message: `Hi ${userName}! You're currently saving less than 10% of your income. Try to aim for at least 20%.`,
            action: 'INCREASE_SAVINGS'
          };
        }
      },
      {
        id: 'savings_002',
        condition: (data) => {
          if (!data.budget || !data.budget.income) return false;
          const totalExpenses = data.budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);
          const savingsRate = (data.budget.income - totalExpenses) / data.budget.income;
          return savingsRate > 0.3; // More than 30% savings
        },
        recommendation: (data) => {
          const userName = data.user ? data.user.displayName.split(' ')[0] : 'there';
          return {
            type: 'success',
            message: `Great job ${userName}! You're saving more than 30% of your income. Keep it up!`,
            badge: 'SUPER_SAVER',
            action: 'CELEBRATE'
          };
        }
      }
    ];

    // Expense rules
    this.rules.expenses = [
      {
        id: 'expense_001',
        condition: (data) => {
          if (!data.budget || !data.budget.expenses || data.budget.expenses.length === 0) return false;
          const foodExpenses = data.budget.expenses
            .filter(exp => exp.category === 'Food')
            .reduce((sum, exp) => sum + exp.amount, 0);
          return foodExpenses > (data.budget.income * 0.3); // Food > 30% of income
        },
        recommendation: (data) => {
          const userName = data.user ? data.user.displayName.split(' ')[0] : 'there';
          return {
            type: 'warning',
            message: `${userName}, you're spending over 30% of your income on food. Consider meal planning to reduce costs.`,
            action: 'REDUCE_FOOD_EXPENSES'
          };
        }
      },
      {
        id: 'expense_002',
        condition: (data) => {
          if (!data.budget || !data.budget.expenses || data.budget.expenses.length === 0) return false;
          const rentExpenses = data.budget.expenses
            .filter(exp => exp.category === 'Rent' || exp.category === 'Housing')
            .reduce((sum, exp) => sum + exp.amount, 0);
          return rentExpenses > (data.budget.income * 0.4); // Rent > 40% of income
        },
        recommendation: (data) => {
          const userName = data.user ? data.user.displayName.split(' ')[0] : 'there';
          return {
            type: 'warning',
            message: `${userName}, your housing costs exceed 40% of your income. This might be stretching your budget too thin.`,
            action: 'REVIEW_HOUSING_OPTIONS'
          };
        }
      }
    ];
  }

  // Get personalized recommendations based on user data
  async getRecommendations(userId) {
    try {
      // Get user data
      const user = await User.findOne({ firebaseUid: userId });
      
      // Instead of throwing an error, create default recommendations for new users
      if (!user) {
        return [
          {
            type: 'info',
            message: 'Welcome to SentiSmart! Please complete your profile to get personalized recommendations.',
            action: 'COMPLETE_PROFILE'
          },
          {
            type: 'info',
            message: 'Set your monthly income to start tracking your budget.',
            action: 'SET_INCOME'
          }
        ];
      }
  
      // Get user's budget data (you'll need to implement this based on your models)
      const budget = await this.getUserBudgetData(userId);
      
      // Prepare data for rule evaluation
      const data = {
        user,
        budget
      };

      // Apply rules and collect recommendations
      const recommendations = [];
      
      // Process budget rules
      this.rules.budget.forEach(rule => {
        if (rule.condition(data)) {
          recommendations.push(rule.recommendation(data));
        }
      });
      
      // Process savings rules
      this.rules.savings.forEach(rule => {
        if (rule.condition(data)) {
          recommendations.push(rule.recommendation(data));
        }
      });
      
      // Process expense rules
      this.rules.expenses.forEach(rule => {
        if (rule.condition(data)) {
          recommendations.push(rule.recommendation(data));
        }
      });

      return recommendations;
    } catch (error) {
      console.error('Error in rule engine:', error);
      throw error;
    }
  }

  // Helper method to get user's budget data
  async getUserBudgetData(userId) {
    // Implement this based on your data models
    // This should return the user's income, expenses, savings goals, etc.
    // For now, returning a placeholder
    return {
      income: 0,
      expenses: []
    };
  }
}

module.exports = new RuleEngine();