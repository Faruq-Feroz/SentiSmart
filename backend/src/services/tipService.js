const fs = require('fs').promises;
const path = require('path');

// Path to the financial tips data file
// We'll use the data from financialTips.js
class TipService {
  constructor() {
    this.tips = [
      {
        id: 1,
        text: "Save at least 20% of your income each month for financial security.",
        category: "savings"
      },
      {
        id: 2,
        text: "Track all your expenses for a month to identify spending patterns.",
        category: "budgeting"
      },
      {
        id: 3,
        text: "Set up automatic transfers to your savings account on payday.",
        category: "automation"
      },
      {
        id: 4,
        text: "Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings.",
        category: "budgeting"
      },
      {
        id: 5,
        text: "Build an emergency fund that covers 3-6 months of expenses.",
        category: "emergency"
      },
      {
        id: 6,
        text: "Pay off high-interest debt before focusing on investments.",
        category: "debt"
      },
      {
        id: 7,
        text: "Review your budget regularly and adjust as your income or expenses change.",
        category: "budgeting"
      },
      {
        id: 8,
        text: "Avoid impulse purchases by waiting 24 hours before buying non-essential items.",
        category: "spending"
      },
      {
        id: 9,
        text: "Invest in your skills to increase your earning potential.",
        category: "income"
      },
      {
        id: 10,
        text: "Use mobile banking apps to monitor your accounts and track spending.",
        category: "technology"
      }
    ];
  }

  // Get a list of daily tips
  async getDailyTips() {
    try {
      // Return all tips for now
      // In a real implementation, you might want to return a random subset
      // or tips based on the user's profile
      return this.tips;
    } catch (error) {
      console.error('Error getting daily tips:', error);
      throw error;
    }
  }

  // Get tips by category
  async getTipsByCategory(category) {
    try {
      return this.tips.filter(tip => tip.category === category);
    } catch (error) {
      console.error(`Error getting tips for category ${category}:`, error);
      throw error;
    }
  }

  // Get a random tip
  async getRandomTip() {
    try {
      const randomIndex = Math.floor(Math.random() * this.tips.length);
      return this.tips[randomIndex];
    } catch (error) {
      console.error('Error getting random tip:', error);
      throw error;
    }
  }
}

module.exports = new TipService();