const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Register or update user in our database after Firebase authentication
router.post('/register', authMiddleware, async (req, res) => {
  try {
    // req.user contains the Firebase user data from the middleware
    const { uid, email, name, phone_number, picture } = req.user;
    
    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });
    
    if (user) {
      // Update existing user
      user.email = email || user.email;
      user.displayName = name || user.displayName;
      user.phoneNumber = phone_number || user.phoneNumber;
      user.photoURL = picture || user.photoURL;
    } else {
      // Create new user
      user = new User({
        firebaseUid: uid,
        email: email || '',
        displayName: name || '',
        phoneNumber: phone_number || '',
        photoURL: picture || ''
      });
    }
    
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error.message);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

module.exports = router;