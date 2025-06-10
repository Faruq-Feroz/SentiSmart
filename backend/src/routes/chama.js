const express = require('express');
const router = express.Router();
const chamaController = require('../controllers/chamaController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all Chama groups and create a new one
router.route('/')
  .get(chamaController.getChamaGroups)
  .post(chamaController.createChamaGroup);

// Get, update, and delete a specific Chama group
router.route('/:id')
  .get(chamaController.getChamaGroup)
  .put(chamaController.updateChamaGroup)
  .delete(chamaController.deleteChamaGroup);

// Add a contribution to a Chama group
router.post('/:id/contributions', chamaController.addContribution);

// Get all messages for a Chama group
router.get('/:id/messages', chamaController.getMessages);

module.exports = router;