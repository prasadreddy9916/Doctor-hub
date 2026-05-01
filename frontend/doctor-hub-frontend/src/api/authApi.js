import apiClient from '../services/apiClient';

export const login = (email, password) => {
  return apiClient.post('/accounts/login/', { email, password });
};

export const registerDoctor = (userData) => {
  return apiClient.post('/accounts/register/', userData);
};