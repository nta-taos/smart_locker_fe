import { atom, atomFamily } from 'recoil';

import { BuildingType } from '@/types/building.type';

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
