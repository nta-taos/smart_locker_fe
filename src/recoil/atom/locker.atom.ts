import { atomFamily, selectorFamily } from 'recoil';

import { LockerType } from '@/types/locker.type';

import { slotAtom } from './slot.atom';

export const lockerAtom = atomFamily<LockerType, number>({
  key: 'lockerAtom',
  default: (lockerId) => ({
    id: lockerId,
    code: '',
    status: 0,
    slots: [],
  }),
});

export const getSlotsByLockerId = selectorFamily({
  key: 'slotsByLockerId',
  get:
    (lockerId: number) =>
    ({ get }) => {
      const locker = get(lockerAtom(lockerId));
      return locker.slots.map((slotId: number) => get(slotAtom(slotId)));
    },
});

export const slotListSelector = selectorFamily({
  key: 'slotListSelector',
  get:
    (slotIds: number[]) =>
    ({ get }) => {
      return slotIds.map((id) => get(slotAtom(id)));
    },
});
