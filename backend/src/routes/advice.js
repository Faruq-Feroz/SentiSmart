const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get personalized recommendations
router.get('/recommendations', adviceController.getRecommendations);

// Get daily financial tips
router.get('/daily-tips', adviceController.getDailyTips);

// Get goal-based advice
router.get('/goal/:goalType', adviceController.getGoalAdvice);

module.exports = router;