// src/services/api.js
import axios from 'axios';

// Axios instance with base config
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update to production URL when deploying
  withCredentials: true, // Ensures cookies and sessions are included
});

// === Request Interceptor ===
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

// === Response Interceptor (Optional: Global error handling) ===
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        console.warn('Unauthorized or forbidden. Redirecting to login...');
        // Optional: redirect to login page or show toast
      }
    }
    return Promise.reject(error);
  }
);

// ======================
// 🔽 API Call Functions 🔽
// ======================

// --- Upload ---
export const uploadCSV = (formData) =>
  API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// --- Allotment ---
export const processAllotment = () => API.get('/process');
export const downloadCSV = () =>
  API.get('/download', { responseType: 'blob' }); // For downloading file

// --- Analytics ---
export const getAnalytics = () => API.get('/analytics');
export const getDroppedCourses = () => API.get('/dropped-courses');

// --- Auth ---
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const getUserProfile = () => API.get('/auth/profile');
export const logoutUser = () => API.post('/auth/logout');

// Default export for custom use (like axios.get('/custom'))
export default API;
