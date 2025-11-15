import { LockerResponeType } from './locker.type';

export type BuildingType = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isPublic: boolean;
  lockers: number[];
};

export type BuildingResponeType = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isPublic: boolean;
  lockers: LockerResponeType[];
};
