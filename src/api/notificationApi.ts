import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const notificationApi = {
  getNotifications: async (page: number = 1, limit: number = 10) => {
    return axiosInstance.get(ENDPOINTS.get.notifications, { params: { page, limit } });
  },

  markAsRead: async (id: number) => {
    return axiosInstance.patch(ENDPOINTS.patch.notificationRead(id));
  },

  markAllAsRead: async () => {
    return axiosInstance.patch(ENDPOINTS.patch.notificationReadAll);
  },

  deleteNotification: async (id: number) => {
    return axiosInstance.delete(ENDPOINTS.delete.notification(id));
  },
};
