import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        console.error('Invalid auth in localStorage', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        message.error('Phiên đăng nhập đã hết hạn.');
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return Promise.reject(new Error('Session Expired'));
      }

      if (status >= 500) {
        message.error('Dịch vụ máy chủ đang gián đoạn. Vui lòng thử lại sau.');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        message.error('Yêu cầu vượt quá thời gian chờ.');
      } else {
        message.error('Không thể kết nối đến máy chủ.');
      }
    } else {
      message.error('Đã xảy ra lỗi không xác định.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
