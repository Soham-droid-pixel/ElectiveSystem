import axios from 'axios';

// You can change the baseURL based on your deployment (localhost or production)
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this if your backend runs on another port
  withCredentials: true, // If you're using cookies for auth
});

// Add a request interceptor (Optional: for attaching tokens)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // if you're using token-based auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export all endpoints
export const uploadCSV = (formData) => API.post('/upload', formData);
export const processAllotment = () => API.get('/process');
export const downloadCSV = () => API.get('/download', { responseType: 'blob' });

export const getAnalytics = () => API.get('/analytics');
export const getDroppedCourses = () => API.get('/dropped-courses');

// Auth
export const loginUser = (credentials) => API.post('/auth/login');
export const getUserProfile = () => API.get('/auth/profile');

export default API;
