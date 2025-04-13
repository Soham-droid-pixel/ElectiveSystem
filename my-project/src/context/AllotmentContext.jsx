import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AllotmentContext = createContext();

export const AllotmentProvider = ({ children }) => {
  const [allotmentData, setAllotmentData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ pie: [], bar: [] });
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allotmentResponse = await axios.get('/api/allotments'); // Replace with your backend endpoint
        const analyticsResponse = await axios.get('/api/analytics'); // Replace with your backend endpoint

        setAllotmentData(allotmentResponse.data);
        setAnalyticsData(analyticsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to update allotment data
  const updateAllotment = async (updatedData) => {
    try {
      const response = await axios.put('/api/allotments', updatedData); // Replace with your backend endpoint
      setAllotmentData(response.data);
    } catch (error) {
      console.error('Error updating allotment data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <AllotmentContext.Provider value={{ allotmentData, analyticsData, updateAllotment }}>
      {children}
    </AllotmentContext.Provider>
  );
};

export const useAllotment = () => useContext(AllotmentContext);
