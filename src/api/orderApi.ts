import { SendPackagePayload } from '@/types/order.type';

import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const orderApi = {
  getOrderStats: async () => {
    return axiosInstance.get(ENDPOINTS.get.orderStats);
  },
  getOrders: async (page: number, limit: number, status: 'pending' | 'received' | 'all') => {
    return axiosInstance.get(ENDPOINTS.get.orders, {
      params: { page, limit, status },
    });
  },
  postOrderUser: async (userId: number, endTime: string, lockerSlotId: number) => {
    return axiosInstance.post(ENDPOINTS.post.orderUser, {
      userId,
      endTime,
      lockerSlotId,
    });
  },
  postOrderShipper: async (
    userId: number,
    phone: string,
    lockerSlotId: number,
    order_code: string,
  ) => {
    return axiosInstance.post(ENDPOINTS.post.orderShipper, {
      userId,
      phone,
      lockerSlotId,
      order_code,
    });
  },
  postSendPackageOrder: async (data: SendPackagePayload) => {
    return axiosInstance.post(ENDPOINTS.post.sendPackage, data);
  },
};
