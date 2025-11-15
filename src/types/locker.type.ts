import { SlotType } from './slot.type';

export type LockerType = {
  id: number;
  code: string;
  status: number;
  slots: number[];
  floor: number | null;
};

export type LockerResponeType = {
  id: number;
  code: string;
  status: number;
  slots: SlotType[];
  floor: number | null;
};
