import axiosInstance from './axios/config';

export const getWallet = async () => {
  const response = await axiosInstance.get('/wallet');
  return response.data;
};
