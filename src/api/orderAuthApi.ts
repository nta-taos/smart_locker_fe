import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const orderAuthApi = {
  createAuthorization: (orderId: number, email: string, name: string) => {
    return axiosInstance.post('/order-authorizations', {
      orderId,
      email,
      name,
    });
  },

  confirmAuthorization: (orderId: number, token: string | null) =>
    axiosInstance.post(ENDPOINTS.post.confirmOrderAuthorization(orderId), { token }),
};
