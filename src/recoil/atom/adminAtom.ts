import { atom } from 'recoil';

import type { Building, DashboardStats, Locker, LockerSlot } from '@/api/adminApi';

export const adminStatsAtom = atom<DashboardStats | null>({
  key: 'adminStatsAtom',
  default: null,
});

export const adminBuildingsAtom = atom<Building[]>({
  key: 'adminBuildingsAtom',
  default: [],
});

export const adminLockersAtom = atom<Locker[]>({
  key: 'adminLockersAtom',
  default: [],
});

export const adminSlotsAtom = atom<LockerSlot[]>({
  key: 'adminSlotsAtom',
  default: [],
});

export const adminLoadingAtom = atom<boolean>({
  key: 'adminLoadingAtom',
  default: false,
});
