import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const transactionApi = {
  getAll: async (page: number, limit: number) => {
    return axiosInstance.get(ENDPOINTS.get.transactions, {
      params: { page, limit },
    });
  },
};
