const Chama = require('../models/Chama');
const User = require('../models/User');

// Get all Chama groups for a user
exports.getChamaGroups = async (req, res) => {
  try {
    // Find groups where user is either creator or member
    const chamaGroups = await Chama.find({
      $or: [
        { creator: req.user.uid },
        { members: req.user.uid }
      ]
    });

    res.status(200).json({
      success: true,
      count: chamaGroups.length,
      data: chamaGroups
    });
  } catch (error) {
    console.error('Error fetching Chama groups:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Chama groups'
    });
  }
};

// Get a single Chama group
exports.getChamaGroup = async (req, res) => {
  try {
    const chamaGroup = await Chama.findById(req.params.id);

    if (!chamaGroup) {
      return res.status(404).json({
        success: false,
        message: 'Chama group not found'
      });
    }

    // Check if the user is a member or creator of the group
    if (chamaGroup.creator !== req.user.uid && !chamaGroup.members.includes(req.user.uid)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this Chama group'
      });
    }

    res.status(200).json({
      success: true,
      data: chamaGroup
    });
  } catch (error) {
    console.error('Error fetching Chama group:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Chama group'
    });
  }
};

// Create a new Chama group
exports.createChamaGroup = async (req, res) => {
  try {
    const { name, description, targetAmount, members } = req.body;

    // Validate members limit (max 3)
    if (members && members.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'A Chama group can have a maximum of 3 members plus the creator'
      });
    }

    // Create new Chama group
    const chamaGroup = await Chama.create({
      name,
      description,
      targetAmount: targetAmount || 0,
      creator: req.user.uid,
      members: members || []
    });

    res.status(201).json({
      success: true,
      data: chamaGroup
    });
  } catch (error) {
    console.error('Error creating Chama group:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Chama group'
    });
  }
};

// Update a Chama group
exports.updateChamaGroup = async (req, res) => {
  try {
    let chamaGroup = await Chama.findById(req.params.id);

    if (!chamaGroup) {
      return res.status(404).json({
        success: false,
        message: 'Chama group not found'
      });
    }

    // Only creator can update the group
    if (chamaGroup.creator !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Only the creator can update this Chama group'
      });
    }

    // Validate members limit (max 3)
    if (req.body.members && req.body.members.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'A Chama group can have a maximum of 3 members plus the creator'
      });
    }

    chamaGroup = await Chama.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: chamaGroup
    });
  } catch (error) {
    console.error('Error updating Chama group:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Chama group'
    });
  }
};

// Delete a Chama group
exports.deleteChamaGroup = async (req, res) => {
  try {
    const chamaGroup = await Chama.findById(req.params.id);

    if (!chamaGroup) {
      return res.status(404).json({
        success: false,
        message: 'Chama group not found'
      });
    }

    // Only creator can delete the group
    if (chamaGroup.creator !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Only the creator can delete this Chama group'
      });
    }

    await chamaGroup.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting Chama group:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Chama group'
    });
  }
};

// Add a contribution to a Chama group
exports.addContribution = async (req, res) => {
  try {
    const { amount, notes } = req.body;
    const chamaGroup = await Chama.findById(req.params.id);

    if (!chamaGroup) {
      return res.status(404).json({
        success: false,
        message: 'Chama group not found'
      });
    }

    // Check if the user is a member or creator of the group
    if (chamaGroup.creator !== req.user.uid && !chamaGroup.members.includes(req.user.uid)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to contribute to this Chama group'
      });
    }

    // Add contribution
    const contribution = {
      contributor: req.user.uid,
      amount,
      notes
    };

    chamaGroup.contributions.push(contribution);
    chamaGroup.totalContributed += amount;

    await chamaGroup.save();

    res.status(200).json({
      success: true,
      data: chamaGroup
    });
  } catch (error) {
    console.error('Error adding contribution:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add contribution'
    });
  }
};

// Get all messages for a Chama group
exports.getMessages = async (req, res) => {
  try {
    const chamaGroup = await Chama.findById(req.params.id);

    if (!chamaGroup) {
      return res.status(404).json({
        success: false,
        message: 'Chama group not found'
      });
    }

    // Check if the user is a member or creator of the group
    if (chamaGroup.creator !== req.user.uid && !chamaGroup.members.includes(req.user.uid)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view messages in this Chama group'
      });
    }

    res.status(200).json({
      success: true,
      data: chamaGroup.messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
};