// src/services/authService.js
import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.usuario));
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.usuario));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async updateProfile(userData) {
    const response = await api.put('/auth/updateprofile', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  }

  async updatePassword(passwordActual, passwordNuevo) {
    const response = await api.put('/auth/updatepassword', {
      passwordActual,
      passwordNuevo
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.rol === role;
  }
}

export default new AuthService();