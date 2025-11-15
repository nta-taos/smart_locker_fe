import axiosInstance from './axios/config';

export const createPaymentRequest = async (amount: number, orderId?: number) => {
  const response = await axiosInstance.post('/payments/payos/create', {
    amount,
    orderId,
  });
  return response.data;
};
