const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,  // Firebase UID
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ContributionSchema = new mongoose.Schema({
  contributor: {
    type: String,  // Firebase UID
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String
});

const ChamaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name for your Chama group']
  },
  description: {
    type: String
  },
  creator: {
    type: String,  // Firebase UID
    required: true,
    ref: 'User'
  },
  members: [{
    type: String,  // Firebase UID
    ref: 'User'
  }],
  targetAmount: {
    type: Number,
    default: 0
  },
  totalContributed: {
    type: Number,
    default: 0
  },
  contributions: [ContributionSchema],
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Limit members to 3 (plus creator = 4 total)
ChamaSchema.path('members').validate(function(members) {
  return members.length <= 3;
}, 'A Chama group can have a maximum of 3 members plus the creator');

module.exports = mongoose.model('Chama', ChamaSchema);