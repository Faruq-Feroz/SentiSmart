const ruleEngine = require('../services/ruleEngine');
const tipService = require('../services/tipService');

// Get personalized recommendations based on user data
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.uid; // From auth middleware
    const recommendations = await ruleEngine.getRecommendations(userId);
    
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: error.message
    });
  }
};

// Get daily financial tips
exports.getDailyTips = async (req, res) => {
  try {
    const tips = await tipService.getDailyTips();
    
    // Make sure we're returning a valid response even if tips is empty
    res.status(200).json({
      success: true,
      data: tips || [] // Ensure we always return an array
    });
  } catch (error) {
    console.error('Error getting daily tips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get daily tips',
      error: error.message
    });
  }
};

// Get goal-based advice
exports.getGoalAdvice = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { goalType } = req.params;
    
    // Implement goal-specific advice logic here
    // This could be another method in the rule engine
    
    res.status(200).json({
      success: true,
      data: {
        message: `Advice for ${goalType} goal`,
        steps: ['Step 1', 'Step 2', 'Step 3']
      }
    });
  } catch (error) {
    console.error('Error getting goal advice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get goal advice',
      error: error.message
    });
  }
};