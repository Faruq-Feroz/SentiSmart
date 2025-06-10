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

// Get all Chama groups
export const getChamaGroups = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/chama`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Chama groups:', error);
    throw error;
  }
};

// Get a single Chama group
export const getChamaGroup = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/chama/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Chama group:', error);
    throw error;
  }
};

// Create a new Chama group
export const createChamaGroup = async (groupData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/chama`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating Chama group:', error);
    throw error;
  }
};

// Update a Chama group
export const updateChamaGroup = async (id, groupData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${API_URL}/chama/${id}`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating Chama group:', error);
    throw error;
  }
};

// Delete a Chama group
export const deleteChamaGroup = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.delete(`${API_URL}/chama/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error deleting Chama group:', error);
    throw error;
  }
};

// Add a contribution to a Chama group
export const addContribution = async (id, contributionData) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/chama/${id}/contributions`, contributionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error adding contribution:', error);
    throw error;
  }
};

// Get all messages for a Chama group
export const getMessages = async (id) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/chama/${id}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};