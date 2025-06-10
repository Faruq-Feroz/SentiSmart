const SavingsGoal = require('../models/SavingsGoal');

// Get all savings goals for a user
exports.getSavingsGoals = async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.find({ user: req.user.uid });

    res.status(200).json({
      success: true,
      count: savingsGoals.length,
      data: savingsGoals
    });
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch savings goals'
    });
  }
};

// Get a single savings goal
exports.getSavingsGoal = async (req, res) => {
  try {
    const savingsGoal = await SavingsGoal.findById(req.params.id);

    if (!savingsGoal) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found'
      });
    }

    // Check if the goal belongs to the user
    if (savingsGoal.user !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this savings goal'
      });
    }

    res.status(200).json({
      success: true,
      data: savingsGoal
    });
  } catch (error) {
    console.error('Error fetching savings goal:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch savings goal'
    });
  }
};

// Create a new savings goal
exports.createSavingsGoal = async (req, res) => {
  try {
    // Add user ID to request body
    req.body.user = req.user.uid;

    const savingsGoal = await SavingsGoal.create(req.body);

    res.status(201).json({
      success: true,
      data: savingsGoal
    });
  } catch (error) {
    console.error('Error creating savings goal:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create savings goal'
    });
  }
};

// Update a savings goal
exports.updateSavingsGoal = async (req, res) => {
  try {
    let savingsGoal = await SavingsGoal.findById(req.params.id);

    if (!savingsGoal) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found'
      });
    }

    // Check if the goal belongs to the user
    if (savingsGoal.user !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this savings goal'
      });
    }

    // Check if goal is completed
    if (req.body.currentAmount >= savingsGoal.targetAmount) {
      req.body.isCompleted = true;
    }

    savingsGoal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: savingsGoal
    });
  } catch (error) {
    console.error('Error updating savings goal:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update savings goal'
    });
  }
};

// Delete a savings goal
exports.deleteSavingsGoal = async (req, res) => {
  try {
    const savingsGoal = await SavingsGoal.findById(req.params.id);

    if (!savingsGoal) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found'
      });
    }

    // Check if the goal belongs to the user
    if (savingsGoal.user !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this savings goal'
      });
    }

    await savingsGoal.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting savings goal:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete savings goal'
    });
  }
};

// Get savings tips
exports.getSavingsTips = async (req, res) => {
  try {
    // These would typically come from a database, but for simplicity, we'll hardcode them
    const savingsTips = [
      "Set up automatic transfers to your savings account on payday.",
      "Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings.",
      "Build an emergency fund that covers 3-6 months of expenses.",
      "Save loose change in a jar and deposit it when full.",
      "Cancel unused subscriptions and save that money instead.",
      "Try a 'no-spend' day once a week and transfer the money you would have spent.",
      "Set specific savings goals with deadlines to stay motivated.",
      "Use cashback apps and credit cards, but pay off the balance in full each month.",
      "Cook at home more often and save on eating out.",
      "Wait 24 hours before making non-essential purchases to avoid impulse buying."
    ];

    // Randomly select 3 tips
    const randomTips = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * savingsTips.length);
      randomTips.push(savingsTips[randomIndex]);
      savingsTips.splice(randomIndex, 1); // Remove the selected tip to avoid duplicates
    }

    res.status(200).json({
      success: true,
      data: randomTips
    });
  } catch (error) {
    console.error('Error fetching savings tips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch savings tips'
    });
  }
};