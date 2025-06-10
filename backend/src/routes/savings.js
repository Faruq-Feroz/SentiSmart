const express = require('express');
const router = express.Router();
const savingsController = require('../controllers/savingsController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all savings goals and create a new one
router.route('/')
  .get(savingsController.getSavingsGoals)
  .post(savingsController.createSavingsGoal);

// Get savings tips - MOVED THIS ROUTE BEFORE THE /:id ROUTE
router.get('/tips', savingsController.getSavingsTips);

// Get, update, and delete a specific savings goal
router.route('/:id')
  .get(savingsController.getSavingsGoal)
  .put(savingsController.updateSavingsGoal)
  .delete(savingsController.deleteSavingsGoal);

module.exports = router;