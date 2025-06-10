const mongoose = require('mongoose');

const SavingsGoalSchema = new mongoose.Schema({
  user: {
    type: String,  // Firebase UID
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a name for your savings goal']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount']
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  targetDate: {
    type: Date,
    required: [true, 'Please add a target date']
  },
  category: {
    type: String,
    enum: ['Emergency Fund', 'Vacation', 'Education', 'Home', 'Vehicle', 'Retirement', 'Wedding', 'Electronics', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  notes: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SavingsGoal', SavingsGoalSchema);