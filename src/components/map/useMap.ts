import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import { buildingApi } from '@/api/buildingApi';
import {
  buildingAtom,
  buildingIdsAtom,
  slotCountBySizeSelector,
  useBuildingStateById,
} from '@/recoil/atom/building.atom';
import { lockerAtom } from '@/recoil/atom/locker.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { BuildingResponeType, BuildingType } from '@/types/building.type';
import { LockerType } from '@/types/locker.type';
import { SlotType } from '@/types/slot.type';

const useMap = () => {
  const navigate = useNavigate();
  const [isShowLockerPopup, setIsShowLockerPopup] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const buildingSelected = useBuildingStateById(selectedBuildingId || 1);
  const [searchInput, setSearchInput] = useState('');
  const [buildingIds, setBuildingIds] = useRecoilState(buildingIdsAtom);
  const countSlot = useRecoilValue(slotCountBySizeSelector(selectedBuildingId || 0));

  const handleSubmitButton = () => {
    navigate(`/lockers/rental/${selectedBuildingId}`);
  };

  const setBuildingState = useRecoilCallback(({ set }) => (id: number, data: BuildingType) => {
    set(buildingAtom(id), data);
  });
  const setLockerState = useRecoilCallback(({ set }) => (id: number, data: LockerType) => {
    set(lockerAtom(id), data);
  });
  const setSlotState = useRecoilCallback(({ set }) => (id: number, data: SlotType) => {
    set(slotAtom(id), data);
  });

  const getBuildings = useCallback(async () => {
    try {
      console.log('calllling');

      const res = await buildingApi.getBuildings();
      const result: BuildingResponeType[] = res.data.data;
      console.log(result);

      const buildingIds: number[] = [];
      result.forEach((bd) => {
        buildingIds.push(bd.id);

        const lockerIds: number[] = [];
        bd.lockers.forEach((lk) => {
          lockerIds.push(lk.id);

          const slotIds: number[] = [];
          lk.slots.forEach((sl) => {
            slotIds.push(sl.id);

            setSlotState(sl.id, {
              ...sl,
            });
          });

          setLockerState(lk.id, {
            ...lk,
            slots: slotIds,
          });
        });

        setBuildingState(bd.id, {
          ...bd,
          lockers: lockerIds,
        });
      });

      setBuildingIds(buildingIds);
    } catch (error) {
      console.log(error);
    }
  }, [setBuildingIds, setBuildingState, setLockerState, setSlotState]);

  useEffect(() => {
    if (buildingIds.length === 0) {
      getBuildings();
    }
  }, [buildingIds, getBuildings]);

  return {
    countSlot,
    buildingSelected,
    selectedBuildingId,
    setSelectedBuildingId,
    isShowLockerPopup,
    setIsShowLockerPopup,
    searchInput,
    setSearchInput,
    buildingIds,
    handleSubmitButton,
  };
};

export default useMap;
