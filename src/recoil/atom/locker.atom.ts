import { atomFamily } from 'recoil';

import { LockerType } from '@/types/locker.type';

export const lockerAtom = atomFamily<LockerType, number>({
  key: 'lockerAtom',
  default: (lockerId) => ({
    id: lockerId,
    code: '',
    status: 0,
    slots: [],
  }),
});
