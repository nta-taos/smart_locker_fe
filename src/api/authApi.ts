import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const authApi = {
  login: async (phone: string, password: string) => {
    return axiosInstance.post(ENDPOINTS.auth.login, { phone, password });
  },
  logout: async () => {
    return axiosInstance.post(ENDPOINTS.auth.logout);
  },
  register: async (name: string, phone: string, email: string, password: string, role: string) => {
    return axiosInstance.post(ENDPOINTS.auth.register, { name, phone, email, password, role });
  },
};
