// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change in production
  withCredentials: true,
});

// Attach token from localStorage if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// (Optional) Global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle 401/403 etc.
    return Promise.reject(error);
  }
);

// API calls
export const uploadCSV = (formData) => API.post('/upload', formData);
export const processAllotment = () => API.get('/process');
export const downloadCSV = () => API.get('/download', { responseType: 'blob' });

export const getAnalytics = () => API.get('/analytics');
export const getDroppedCourses = () => API.get('/dropped-courses');

// Auth
export const loginUser = (credentials) => API.post('/auth/login');
export const getUserProfile = () => API.get('/auth/profile');

export default API;
export const logoutUser = () => API.post('/auth/logout'); 