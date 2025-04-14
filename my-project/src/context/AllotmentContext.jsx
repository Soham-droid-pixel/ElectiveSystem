import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AllotmentContext = createContext();

export const AllotmentProvider = ({ children }) => {
  const [allotmentData, setAllotmentData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ pie: [], bar: [] });
  const [loading, setLoading] = useState(true);

  // Enhanced fetch function with data validation
  const fetchData = async () => {
    try {
      const allotmentResponse = await axios.get('/api/allotments');
      const analyticsResponse = await axios.get('/api/analytics');

      // Validate and set allotment data (ensure it's always an array)
      const validatedAllotment = Array.isArray(allotmentResponse?.data) 
        ? allotmentResponse.data 
        : [];
      
      // Validate analytics data structure
      const validatedAnalytics = {
        pie: Array.isArray(analyticsResponse?.data?.pie) ? analyticsResponse.data.pie : [],
        bar: Array.isArray(analyticsResponse?.data?.bar) ? analyticsResponse.data.bar : []
      };

      setAllotmentData(validatedAllotment);
      setAnalyticsData(validatedAnalytics);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Reset to empty/default values on error
      setAllotmentData([]);
      setAnalyticsData({ pie: [], bar: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Enhanced update function with validation
  const updateAllotment = async (updatedData) => {
    try {
      const response = await axios.put('/api/allotments', updatedData);
      setAllotmentData(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error('Error updating allotment data:', error);
      // Optionally: maintain previous data on error
      // Or setAllotmentData([]) to reset
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AllotmentContext.Provider 
      value={{ 
        allotmentData: Array.isArray(allotmentData) ? allotmentData : [], 
        analyticsData: {
          pie: Array.isArray(analyticsData?.pie) ? analyticsData.pie : [],
          bar: Array.isArray(analyticsData?.bar) ? analyticsData.bar : []
        },
        updateAllotment 
      }}
    >
      {children}
    </AllotmentContext.Provider>
  );
};

export const useAllotment = () => {
  const context = useContext(AllotmentContext);
  // Provide safe defaults if context is undefined
  return context || { 
    allotmentData: [], 
    analyticsData: { pie: [], bar: [] },
    updateAllotment: () => {} 
  };
};