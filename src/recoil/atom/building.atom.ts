import { atom, atomFamily, selectorFamily, useRecoilValue } from 'recoil';

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

export const slotCountBySizeSelector = selectorFamily<Record<number, number>, number>({
  key: 'slotCountBySizeSelector',
  get:
    (buildingId: number) =>
    ({ get }) => {
      const building = get(buildingAtom(buildingId));
      if (!building) return {};

      const counts: Record<number, number> = {};

      building.lockers.forEach((lockerId) => {
        const locker = get(lockerAtom(lockerId));
        if (!locker) return;

        locker.slots.forEach((slotId) => {
          const slot = get(slotAtom(slotId));
          if (!slot) return;

          if (slot.status === 0) counts[slot.size] = (counts[slot.size] || 0) + 1;
        });
      });

      return counts;
    },
});
