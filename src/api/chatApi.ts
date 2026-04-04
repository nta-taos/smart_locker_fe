import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const chatApi = {
  ask: async (message: string) => {
    return axiosInstance.post(ENDPOINTS.post.chatAsk, { message });
  },
};
