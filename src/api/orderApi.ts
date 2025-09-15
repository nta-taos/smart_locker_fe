import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const orderApi = {
  getOrderStats: async () => {
    return axiosInstance.get(ENDPOINTS.get.orderStats);
  },
  getOrders: async (page: number, limit: number) => {
    return axiosInstance.get(ENDPOINTS.get.orders, {
      params: { page, limit },
    });
  },
};
