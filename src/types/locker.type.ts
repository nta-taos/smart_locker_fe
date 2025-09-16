import { SlotType } from './slot.type';

export type LockerType = {
  id: number;
  code: string;
  status: number;
  slots: number[];
};

export type LockerResponeType = {
  id: number;
  code: string;
  status: number;
  slots: SlotType[];
};
