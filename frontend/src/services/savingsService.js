import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://sentismart.onrender.com/api';

// Helper to get auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  throw new Error('User not authenticated');
};

// Get all savings goals
export const getSavingsGoals = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/savings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    throw error;
  }
};

// Get a single savings goal
export const getSavingsGoal = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/savings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching savings goal:', error);
    throw error;
  }
};

// Create a new savings goal
export const createSavingsGoal = async (goalData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/savings`, goalData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating savings goal:', error);
    throw error;
  }
};

// Update a savings goal
export const updateSavingsGoal = async (id, goalData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${API_URL}/savings/${id}`, goalData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating savings goal:', error);
    throw error;
  }
};

// Delete a savings goal
export const deleteSavingsGoal = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.delete(`${API_URL}/savings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting savings goal:', error);
    throw error;
  }
};

// Get savings tips
export const getSavingsTips = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/savings/tips`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching savings tips:', error);
    throw error;
  }
};
