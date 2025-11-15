import { atomFamily } from 'recoil';

import { SlotType } from '@/types/slot.type';

export const slotAtom = atomFamily<SlotType, number>({
  key: 'slotAtom',
  default: (slotId) => ({
    id: slotId,
    size: 0,
    status: 0,
  }),
});
