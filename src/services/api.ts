import axios from 'axios';
import router from '@/router';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://petstore-backend-api.onrender.com/api', // Production backend on Render
  // baseURL: 'http://localhost:5000/api', // 🟢 Local Backend for Testing
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🟢 REQUEST INTERCEPTOR
// Automatically attaches the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔴 RESPONSE INTERCEPTOR (The Real World Safety Net)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Session expired or invalid token. Logging out...");

      // 1. Clear local storage to prevent loops
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // 2. Force redirect to login
      // We use window.location to ensure a hard refresh clears any stale memory
      if (window.location.pathname !== '/login') {
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
