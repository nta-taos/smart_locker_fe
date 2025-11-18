import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const authApi = {
  login: async (phone: string, password: string) => {
    return axiosInstance.post(ENDPOINTS.auth.login, { phone, password });
  },
  logout: async () => {
    return axiosInstance.post(ENDPOINTS.auth.logout);
  },
  register: async (name: string, phone: string, email: string, password: string) => {
    return axiosInstance.post(ENDPOINTS.auth.register, { name, phone, email, password });
  },
  googleCheck: async (idToken: string) => {
    return axiosInstance.post(ENDPOINTS.auth.googleCheck, { idToken });
  },
  googleRegisterComplete: async (idToken: string, phone: string) => {
    return axiosInstance.post(ENDPOINTS.auth.googleRegisterComplete, { idToken, phone });
  },
  forgotPassword: async (email: string) => {
    return axiosInstance.post(ENDPOINTS.auth.forgotPassword, { email });
  },
  resetPassword: async (token: string, newPassword: string) => {
    return axiosInstance.post(ENDPOINTS.auth.resetPassword, { token, newPassword });
  },
};
