import { atom, atomFamily, useRecoilValue } from 'recoil';

import { BuildingType } from '@/types/building.type';

import { lockerAtom } from './locker.atom';
import { slotAtom } from './slot.atom';

export const buildingAtom = atomFamily<BuildingType, number>({
  key: 'buildingAtom',
  default: (buildingId: number) => ({
    id: buildingId,
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    isPublic: false,
    lockers: [],
  }),
});

export const buildingIdsAtom = atom<number[]>({
  key: 'buildingIdsAtom',
  default: [],
});

export const useBuildingStateById = (id: number) => {
  return useRecoilValue(buildingAtom(id));
};

export const useLockerStateById = (id: number) => {
  return useRecoilValue(lockerAtom(id));
};

export const useSlotStateById = (id: number) => {
  return useRecoilValue(slotAtom(id));
};
