import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = 'http://localhost:5000/api';

// Helper to get auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  throw new Error('User not authenticated');
};

// Get personalized recommendations
export const getRecommendations = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/advice/recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

// Get daily financial tips
export const getDailyTips = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/advice/daily-tips`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching daily tips:', error);
    throw error;
  }
};

// Get goal-based advice
export const getGoalAdvice = async (goalType) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/advice/goal/${goalType}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching goal advice:', error);
    throw error;
  }
};