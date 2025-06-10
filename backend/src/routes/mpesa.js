const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');

// STK Push endpoint
router.post('/stkpush', mpesaController.initiateSTKPush);

// Bill payment endpoint
router.post('/billpayment', mpesaController.initiateBillPayment);

// Save bill payment record
router.post('/savebill', mpesaController.saveBillPayment);

// Callback URL for M-Pesa
router.post('/callback', mpesaController.mpesaCallback);

// Query transaction status
router.post('/query', mpesaController.queryTransactionStatus);

module.exports = router;