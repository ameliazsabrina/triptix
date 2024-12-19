// src/services/authService.js
import apiClient from './apiClient';

export const authService = {
  async login(email, password) {
    const response = await apiClient.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(username, email, password) {
    const response = await apiClient.post('/users/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  logout() {
    localStorage 