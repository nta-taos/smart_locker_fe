import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import { message } from 'antd';

import { buildingApi } from '@/api/buildingApi';
import { useAuth } from '@/hooks/useAuth';
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
import { extractErrorMessage } from '@/utils/error.utils';

const useMap = () => {
  const navigate = useNavigate();
  const [isShowLockerPopup, setIsShowLockerPopup] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const buildingSelected = useBuildingStateById(selectedBuildingId || 1);
  const [searchInput, setSearchInput] = useState('');
  const [buildingIds, setBuildingIds] = useRecoilState(buildingIdsAtom);
  const countSlot = useRecoilValue(slotCountBySizeSelector(selectedBuildingId || 0));
  const { isAuthenticated } = useAuth();

  const handleRentLocker = () => {
    if (!isAuthenticated) {
      navigate('/login');
      message.error('Vui lòng đăng nhập để thuê tủ');
      return;
    }
    navigate(`/rent/${selectedBuildingId}`);
  };

  const handleSendPackage = () => {
    if (!isAuthenticated) {
      navigate('/login');
      message.error('Vui lòng đăng nhập để gửi hàng');
      return;
    }
    navigate(`/send/${selectedBuildingId}`);
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
      const res = await buildingApi.getBuildings();
      const result: BuildingResponeType[] = res.data;

      const buildingIds: number[] = [];
      if (!result || result.length === 0) return;
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
      console.error(error);
      extractErrorMessage(error);
    }
  }, [setBuildingIds, setBuildingState, setLockerState, setSlotState]);

  useEffect(() => {
    if (buildingIds.length === 0) {
      getBuildings();
    }
  }, [buildingIds.length, getBuildings]);

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
    handleSendPackage,
    handleRentLocker,
  };
};

export default useMap;
