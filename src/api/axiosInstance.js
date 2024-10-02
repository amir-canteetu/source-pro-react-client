import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors to handle requests/responses globally.
axiosInstance.interceptors.request.use((config) => {
  // Add auth token, etc.
  return config;
});

export default axiosInstance;
