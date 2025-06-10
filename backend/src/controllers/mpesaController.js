const axios = require('axios');
const datetime = require('node-datetime');

// Helper function to generate the auth token
const getAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const response = await axios.get(
      `${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Initiate STK Push
exports.initiateSTKPush = async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body;
    
    // Validate required fields
    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: 'Phone number and amount are required' });
    }
    
    // Get access token
    const token = await getAccessToken();
    
    // Format the date and time
    const dt = datetime.create();
    const formattedDate = dt.format('YmdHMS');
    
    // Create password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortcode}${passkey}${formattedDate}`).toString('base64');
    
    // Prepare request data
    const requestData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: formattedDate,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference || 'SentiSmart Donation',
      TransactionDesc: transactionDesc || 'Donation to SentiSmart'
    };
    
    // Make the request to M-Pesa API
    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Callback endpoint for M-Pesa
exports.mpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('M-Pesa Callback Data:', JSON.stringify(callbackData, null, 2));
    
    // Here you would typically update your database with the transaction status
    // For now, we'll just log it and return a success response
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('M-Pesa Callback Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Query STK Push transaction status
exports.queryTransactionStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;
    
    if (!checkoutRequestId) {
      return res.status(400).json({ error: 'Checkout request ID is required' });
    }
    
    // Get access token
    const token = await getAccessToken();
    
    // Format the date and time
    const dt = datetime.create();
    const formattedDate = dt.format('YmdHMS');
    
    // Create password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortcode}${passkey}${formattedDate}`).toString('base64');
    
    // Prepare request data
    const requestData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: formattedDate,
      CheckoutRequestID: checkoutRequestId
    };
    
    // Make the request to M-Pesa API
    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/stkpushquery/v1/query`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Query Transaction Error:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Initiate bill payment via STK Push
exports.initiateBillPayment = async (req, res) => {
  try {
    const { phoneNumber, amount, billType, billReference, accountNumber } = req.body;
    
    // Validate required fields
    if (!phoneNumber || !amount || !billType) {
      return res.status(400).json({ error: 'Phone number, amount, and bill type are required' });
    }
    
    // Get access token
    const token = await getAccessToken();
    
    // Format the date and time
    const dt = datetime.create();
    const formattedDate = dt.format('YmdHMS');
    
    // Create password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortcode}${passkey}${formattedDate}`).toString('base64');
    
    // Prepare request data
    const requestData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: formattedDate,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: billReference || `${billType}-${accountNumber}`,
      TransactionDesc: `Payment for ${billType}`
    };
    
    // Make the request to M-Pesa API
    const response = await axios.post(
      `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Bill Payment STK Push Error:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Save bill payment record
exports.saveBillPayment = async (req, res) => {
  try {
    const { userId, billType, amount, accountNumber, transactionId, status } = req.body;
    
    // Here you would save the bill payment record to your database
    // For now, we'll just return a success response
    
    return res.status(200).json({ 
      success: true, 
      message: 'Bill payment record saved',
      data: {
        userId,
        billType,
        amount,
        accountNumber,
        transactionId,
        status,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Save Bill Payment Error:', error);
    return res.status(500).json({ error: error.message });
  }
};