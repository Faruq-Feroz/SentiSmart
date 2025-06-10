import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getSavingsGoals, createSavingsGoal, updateSavingsGoal, deleteSavingsGoal, getSavingsTips } from '../services/savingsService';

// Create the context
export const SavingsContext = createContext();

// Create the provider component
export const SavingsProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [savingsTips, setSavingsTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch savings goals when user is authenticated
  useEffect(() => {
    const fetchSavingsGoals = async () => {
      if (!isAuthenticated) {
        setSavingsGoals([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const goals = await getSavingsGoals();
        setSavingsGoals(goals);
      } catch (err) {
        setError('Failed to fetch savings goals');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsGoals();
  }, [isAuthenticated, user]);

  // Fetch savings tips
  useEffect(() => {
    const fetchSavingsTips = async () => {
      if (!isAuthenticated) {
        setSavingsTips([]);
        return;
      }

      try {
        const tips = await getSavingsTips();
        setSavingsTips(tips);
      } catch (err) {
        console.error('Failed to fetch savings tips:', err);
      }
    };

    fetchSavingsTips();
  }, [isAuthenticated]);

  // Add a new savings goal
  const addSavingsGoal = async (goalData) => {
    try {
      setError(null);
      const newGoal = await createSavingsGoal(goalData);
      setSavingsGoals([...savingsGoals, newGoal]);
      return newGoal;
    } catch (err) {
      setError('Failed to create savings goal');
      console.error(err);
      throw err;
    }
  };

  // Update a savings goal
  const updateGoal = async (id, goalData) => {
    try {
      setError(null);
      const updatedGoal = await updateSavingsGoal(id, goalData);
      setSavingsGoals(savingsGoals.map(goal => 
        goal._id === id ? updatedGoal : goal
      ));
      return updatedGoal;
    } catch (err) {
      setError('Failed to update savings goal');
      console.error(err);
      throw err;
    }
  };

  // Delete a savings goal
  const removeGoal = async (id) => {
    try {
      setError(null);
      await deleteSavingsGoal(id);
      setSavingsGoals(savingsGoals.filter(goal => goal._id !== id));
    } catch (err) {
      setError('Failed to delete savings goal');
      console.error(err);
      throw err;
    }
  };

  return (
    <SavingsContext.Provider value={{
      savingsGoals,
      savingsTips,
      loading,
      error,
      addSavingsGoal,
      updateGoal,
      removeGoal
    }}>
      {children}
    </SavingsContext.Provider>
  );
};

export default SavingsContext;