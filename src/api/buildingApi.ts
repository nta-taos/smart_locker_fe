import axiosInstance from './axios/config';
import { ENDPOINTS } from './axios/endpoints';

export const buildingApi = {
  getBuildings: async () => {
    return axiosInstance.get(ENDPOINTS.get.buildings);
  },
};
