import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // Importante
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