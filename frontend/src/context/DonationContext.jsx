import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load campaigns from localStorage on initial render
  useEffect(() => {
    if (user) {
      const savedCampaigns = localStorage.getItem('campaigns');
      if (savedCampaigns) {
        setCampaigns(JSON.parse(savedCampaigns));
      }

      // Load user's donation history
      const savedDonations = localStorage.getItem(`donations_${user.uid}`);
      if (savedDonations) {
        setDonations(JSON.parse(savedDonations));
      }
    }
  }, [user]);

  // Update userCampaigns whenever campaigns change
  useEffect(() => {
    if (user) {
      // Filter campaigns created by the current user
      const filteredUserCampaigns = campaigns.filter(campaign => campaign.creatorId === user.uid);
      setUserCampaigns(filteredUserCampaigns);
    }
  }, [campaigns, user]);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    if (campaigns.length > 0) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
  }, [campaigns]);

  // Create a new donation campaign
  const createCampaign = (campaignData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newCampaign = {
        id: Date.now().toString(),
        creatorId: user.uid,
        creatorName: user.displayName || 'Anonymous',
        createdAt: new Date().toISOString(),
        amountRaised: 0,
        donations: [],
        status: 'active',
        ...campaignData
      };
      
      setCampaigns([...campaigns, newCampaign]);
      return newCampaign;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing campaign
  const updateCampaign = (campaignId, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedCampaigns = campaigns.map(campaign => 
        campaign.id === campaignId ? { ...campaign, ...updatedData } : campaign
      );
      
      setCampaigns(updatedCampaigns);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a campaign
  const deleteCampaign = (campaignId) => {
    try {
      setLoading(true);
      setError(null);
      
      const filteredCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
      setCampaigns(filteredCampaigns);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Make a donation to a campaign
  const makeDonation = async (campaignId, amount, phoneNumber) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call the M-Pesa API
      // For now, we'll simulate a successful donation
      const donationData = {
        id: Date.now().toString(),
        campaignId,
        donorId: user ? user.uid : 'anonymous',
        donorName: user ? user.displayName : 'Anonymous',
        amount,
        phoneNumber,
        timestamp: new Date().toISOString(),
        status: 'completed'
      };
      
      // Update the campaign with the new donation
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.id === campaignId) {
          const updatedDonations = [...campaign.donations, donationData];
          const newAmountRaised = campaign.amountRaised + parseFloat(amount);
          
          return {
            ...campaign,
            donations: updatedDonations,
            amountRaised: newAmountRaised
          };
        }
        return campaign;
      });
      
      setCampaigns(updatedCampaigns);
      
      // Add to user's donation history if logged in
      if (user) {
        const updatedDonations = [...donations, donationData];
        setDonations(updatedDonations);
        localStorage.setItem(`donations_${user.uid}`, JSON.stringify(updatedDonations));
      }
      
      return donationData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DonationContext.Provider value={{
      campaigns,
      userCampaigns,
      donations,
      loading,
      error,
      createCampaign,
      updateCampaign,
      deleteCampaign,
      makeDonation
    }}>
      {children}
    </DonationContext.Provider>
  );
};

export default DonationContext;