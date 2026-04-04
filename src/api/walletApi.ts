import axiosInstance from './axios/config';

export const walletApi = {
  getWallet: async () => {
    const response = await axiosInstance.get('/wallet');
    return response.data;
  },
};
