import { RentalPayload, SendPackagePayload } from '@/types/order.type';

import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const orderApi = {
  getOrderStats: async () => {
    return axiosInstance.get(ENDPOINTS.get.orderStats);
  },
  getOrders: async (
    page: number,
    limit: number,
    status: 'pending' | 'received' | 'all',
    options?: { code?: string; from?: string; to?: string },
  ) => {
    const params: Record<string, unknown> = { page, limit, status };
    if (options?.code) params.code = options.code;
    if (options?.from) params.from = options.from;
    if (options?.to) params.to = options.to;
    return axiosInstance.get(ENDPOINTS.get.orders, {
      params,
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
  postOpenOrder: async (orderId: number) => {
    return axiosInstance.post(ENDPOINTS.post.openOrder.replace(':orderId', String(orderId)));
  },

  postRentalOrder: async (data: RentalPayload) => {
    return axiosInstance.post(ENDPOINTS.post.rentalOrder, data);
  },

  getOrder: (orderId: number | string) => {
    return axiosInstance.get(`orders/${orderId}`);
  },
};
