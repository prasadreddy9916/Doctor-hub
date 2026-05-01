import axios from 'axios';
import useAuthStore from '../context/useAuthStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json', // Default for JSON requests
  },
});

// 1. Request Interceptor: Attach Token + Fix Upload Headers
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    
    // Attach Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // ✅ FIX: If uploading a file, remove default JSON header.
    // Axios will automatically add 'multipart/form-data' with correct boundary.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Handle 401 Errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;