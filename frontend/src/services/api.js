import axios from 'axios';

const api = axios.create({
  // If we have a production URL, use it. Otherwise, use localhost.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add Token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
};

export const registerUser = async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
};

export const sendTextToBot = async (text) => {
  const response = await api.post('/bot/process-audio', { userText: text });
  return response.data;
};

export const getChatHistory = async () => {
    const response = await api.get('/bot/history');
    return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats'); // Update backend logic for user stats later if needed
  return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateUserProfile = async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
};

export default api;