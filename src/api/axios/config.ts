import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const API_KEY = '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
  },
});

export default axiosInstance;
