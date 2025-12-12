import axiosInstance from './axios/config';

export interface DashboardStats {
  date: string;
  rentalsToday: number;
  revenueToday: number;
  totalBuildings: number;
  totalLockers: number;
  totalSlots: number;
  occupiedSlots: number;
  occupancyRate: number;
  hourlyRentals: Array<{ hour: number; count: number }>;
  hourlyRevenue: Array<{ hour: number; amount: number }>;
}

export interface Building {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  isPublic: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Locker {
  id: number;
  code: string;
  building: Building;
  status: number;
  floor: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface LockerSlot {
  id: number;
  locker: Locker;
  size: number;
  hw_index: number;
  status: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBuildingDto {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  isPublic: boolean;
}

export interface CreateLockerDto {
  buildingId: number;
  status?: number;
  floor?: number;
}

export interface CreateSlotDto {
  lockerId: number;
  size: number;
  hw_index: number;
}

export const adminApi = {
  // Dashboard
  getDashboardStats: async (date?: string) => {
    const params = date ? { date } : {};
    return axiosInstance.get<DashboardStats>('/admin/dashboard/stats', { params });
  },

  // Remote Locker Control
  openLockerRemote: async (slotId: number, reason?: string) => {
    return axiosInstance.post(`/admin/slots/${slotId}/open`, { reason });
  },

  // Buildings
  getBuildings: async () => {
    return axiosInstance.get<Building[]>('/admin/buildings');
  },
  getBuilding: async (id: number) => {
    return axiosInstance.get<Building>(`/admin/buildings/${id}`);
  },
  createBuilding: async (data: CreateBuildingDto) => {
    return axiosInstance.post<Building>('/admin/buildings', data);
  },
  updateBuilding: async (id: number, data: Partial<CreateBuildingDto>) => {
    return axiosInstance.put<Building>(`/admin/buildings/${id}`, data);
  },
  deleteBuilding: async (id: number) => {
    return axiosInstance.delete(`/admin/buildings/${id}`);
  },

  // Lockers
  getLockers: async (buildingId?: number) => {
    const params = buildingId ? { buildingId } : {};
    return axiosInstance.get<Locker[]>('/admin/lockers', { params });
  },
  getLocker: async (id: number) => {
    return axiosInstance.get<Locker>(`/admin/lockers/${id}`);
  },
  createLocker: async (data: CreateLockerDto) => {
    return axiosInstance.post<Locker>('/admin/lockers', data);
  },
  updateLocker: async (id: number, data: Partial<CreateLockerDto>) => {
    return axiosInstance.put<Locker>(`/admin/lockers/${id}`, data);
  },
  deleteLocker: async (id: number) => {
    return axiosInstance.delete(`/admin/lockers/${id}`);
  },

  // Slots
  getSlots: async (lockerId?: number) => {
    const params = lockerId ? { lockerId } : {};
    return axiosInstance.get<LockerSlot[]>('/admin/slots', { params });
  },
  getSlot: async (id: number) => {
    return axiosInstance.get<LockerSlot>(`/admin/slots/${id}`);
  },
  createSlot: async (data: CreateSlotDto) => {
    return axiosInstance.post<LockerSlot>('/admin/slots', data);
  },
  updateSlot: async (id: number, data: Partial<CreateSlotDto>) => {
    return axiosInstance.put<LockerSlot>(`/admin/slots/${id}`, data);
  },
  deleteSlot: async (id: number) => {
    return axiosInstance.delete(`/admin/slots/${id}`);
  },
};
