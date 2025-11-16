import axios from 'axios';

// Usar variable de entorno, fallback a localhost para desarrollo
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔧 API URL:', API_URL);
console.log('🌍 Environment:', import.meta.env.MODE);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    console.log('📤 Axios request:', config.method, config.url, config.baseURL + config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('📥 Axios response:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Axios error:', error.code, error.message);
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - backend might be down or CORS issue');
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;