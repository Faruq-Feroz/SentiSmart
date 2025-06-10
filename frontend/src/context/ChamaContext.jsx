import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getChamaGroups, getChamaGroup, createChamaGroup, updateChamaGroup, deleteChamaGroup, addContribution } from '../services/chamaService';

// Create the context
export const ChamaContext = createContext();

// Create the provider component
export const ChamaProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [chamaGroups, setChamaGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Chama groups when user is authenticated
  useEffect(() => {
    const fetchChamaGroups = async () => {
      if (!isAuthenticated) {
        setChamaGroups([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const groups = await getChamaGroups();
        setChamaGroups(groups);
      } catch (err) {
        setError('Failed to fetch Chama groups');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChamaGroups();
  }, [isAuthenticated, user]);

  // Select a Chama group
  const selectGroup = async (groupId) => {
    try {
      setLoading(true);
      setError(null);
      const group = await getChamaGroup(groupId);
      setSelectedGroup(group);
    } catch (err) {
      setError('Failed to fetch Chama group');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new Chama group
  const createGroup = async (groupData) => {
    try {
      setLoading(true);
      setError(null);
      const newGroup = await createChamaGroup(groupData);
      setChamaGroups([...chamaGroups, newGroup]);
      return newGroup;
    } catch (err) {
      setError('Failed to create Chama group');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a Chama group
  const updateGroup = async (groupId, groupData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGroup = await updateChamaGroup(groupId, groupData);
      setChamaGroups(chamaGroups.map(group => 
        group._id === groupId ? updatedGroup : group
      ));
      if (selectedGroup && selectedGroup._id === groupId) {
        setSelectedGroup(updatedGroup);
      }
      return updatedGroup;
    } catch (err) {
      setError('Failed to update Chama group');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a Chama group
  const deleteGroup = async (groupId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteChamaGroup(groupId);
      setChamaGroups(chamaGroups.filter(group => group._id !== groupId));
      if (selectedGroup && selectedGroup._id === groupId) {
        setSelectedGroup(null);
      }
    } catch (err) {
      setError('Failed to delete Chama group');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a contribution to a Chama group
  const addGroupContribution = async (groupId, contributionData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGroup = await addContribution(groupId, contributionData);
      setChamaGroups(chamaGroups.map(group => 
        group._id === groupId ? updatedGroup : group
      ));
      if (selectedGroup && selectedGroup._id === groupId) {
        setSelectedGroup(updatedGroup);
      }
      return updatedGroup;
    } catch (err) {
      setError('Failed to add contribution');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChamaContext.Provider value={{
      chamaGroups,
      selectedGroup,
      loading,
      error,
      selectGroup,
      createGroup,
      updateGroup,
      deleteGroup,
      addGroupContribution
    }}>
      {children}
    </ChamaContext.Provider>
  );
};

export default ChamaContext;