import axios from 'axios';

// To this
const API_URL = 'https://sentismart.onrender.com/api/mpesa'

// Initiate STK Push for M-Pesa payment
export const initiateSTKPush = async (phoneNumber, amount, campaignId) => {
  try {
    // Format phone number (remove leading 0 or +254 and add 254)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? `254${phoneNumber.substring(1)}` 
      : phoneNumber.startsWith('+254') 
        ? phoneNumber.substring(1) 
        : phoneNumber;
    
    try {
      const response = await axios.post(`${API_URL}/stkpush`, {
        phoneNumber: formattedPhone,
        amount,
        accountReference: `Donation-${campaignId}`,
        transactionDesc: `Donation to campaign ${campaignId}`
      }, {
        timeout: 10000 // 10 second timeout
      });
      
      return response.data;
    } catch (apiError) {
      console.error('M-Pesa API Error:', apiError);
      
      // Check if it's a connection error (backend not running)
      if (apiError.code === 'ECONNREFUSED' || apiError.code === 'ECONNABORTED' || !apiError.response) {
        throw new Error('Cannot connect to the payment server. Please try again later.');
      }
      
      // If it's an API error with a response, pass through the error message
      throw new Error(apiError.response?.data?.error || 'Payment processing failed. Please try again.');
    }
  } catch (error) {
    console.error('M-Pesa STK Push Error:', error);
    throw error;
  }
};

// Check the status of an STK Push transaction
export const checkTransactionStatus = async (checkoutRequestId) => {
  try {
    const response = await axios.post(`${API_URL}/query`, {
      checkoutRequestId
    }, {
      timeout: 10000 // 10 second timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('M-Pesa Query Error:', error);
    throw new Error('Could not check payment status. Please try again later.');
  }
};

// Initiate bill payment via STK Push
export const initiateBillPayment = async (phoneNumber, amount, billType, accountNumber) => {
  try {
    // Format phone number (remove leading 0 or +254 and add 254)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? `254${phoneNumber.substring(1)}` 
      : phoneNumber.startsWith('+254') 
        ? phoneNumber.substring(1) 
        : phoneNumber;
    
    try {
      const response = await axios.post(`${API_URL}/billpayment`, {
        phoneNumber: formattedPhone,
        amount,
        billType,
        billReference: `${billType}-${accountNumber}`,
        accountNumber
      }, {
        timeout: 10000 // 10 second timeout
      });
      
      return response.data;
    } catch (apiError) {
      console.error('M-Pesa API Error:', apiError);
      
      // Check if it's a connection error (backend not running)
      if (apiError.code === 'ECONNREFUSED' || apiError.code === 'ECONNABORTED' || !apiError.response) {
        throw new Error('Cannot connect to the payment server. Please try again later.');
      }
      
      // If it's an API error with a response, pass through the error message
      throw new Error(apiError.response?.data?.error || 'Payment processing failed. Please try again.');
    }
  } catch (error) {
    console.error('M-Pesa Bill Payment Error:', error);
    throw error;
  }
};

// Save bill payment record
export const saveBillPayment = async (userId, billType, amount, accountNumber, transactionId, status) => {
  try {
    const response = await axios.post(`${API_URL}/savebill`, {
      userId,
      billType,
      amount,
      accountNumber,
      transactionId,
      status
    }, {
      timeout: 10000 // 10 second timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('Save Bill Payment Error:', error);
    throw new Error('Could not save bill payment record. Please try again later.');
  }
};

export default {
  initiateSTKPush,
  checkTransactionStatus,
  initiateBillPayment,
  saveBillPayment
};
