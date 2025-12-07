import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import { FormInstance, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { buildingApi } from '@/api/buildingApi';
import { sizeOptions } from '@/constants/sizeOptions';
import { useWallet } from '@/hooks/useWallet';
import {
  buildingAtom,
  buildingIdsAtom,
  slotCountBySizeSelector,
} from '@/recoil/atom/building.atom';
import { lockerAtom } from '@/recoil/atom/locker.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { BuildingResponeType } from '@/types/building.type';

export interface SelectedLockerState {
  size: number;
  lockerId: number;
  code: string;
}

interface Step1FormValuesBase {
  receiveDate: Dayjs;
  receiveTime: Dayjs;
  [key: string]: unknown;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const useLockerFlow = (buildingId: number, form: FormInstance) => {
  const navigate = useNavigate();
  const currentBuildingId = Number(buildingId) || 1;

  const [step1Values, setStep1Values] = useState<Step1FormValuesBase | null>(null);
  const [buildingIds] = useRecoilState(buildingIdsAtom);
  const availableSizesCount = useRecoilValue(slotCountBySizeSelector(currentBuildingId));
  const currentBuilding = useRecoilValue(buildingAtom(currentBuildingId));
  const { wallet } = useWallet();

  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [selectedLocker, setselectedLocker] = useState<SelectedLockerState | null>(null);
  const [duration, setDuration] = useState(1);
  const walletBalance = Number(wallet?.balance || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const selectedSizeData = useMemo(
    () => sizeOptions.find((s) => s.id === selectedSize),
    [selectedSize],
  );
  const rawTotal = (selectedSizeData?.price || 0) * duration;
  const total = useMemo(() => Math.ceil(rawTotal), [rawTotal]);

  const populateRecoilState = useRecoilCallback(
    ({ set }) =>
      (buildings: BuildingResponeType[]) => {
        const allBuildingIds: number[] = [];
        if (!buildings || buildings.length === 0) return;

        buildings.forEach((bd) => {
          allBuildingIds.push(bd.id);
          const lockerIds: number[] = [];

          bd.lockers.forEach((lk) => {
            lockerIds.push(lk.id);
            const slotIds: number[] = [];

            lk.slots.forEach((sl) => {
              slotIds.push(sl.id);
              set(slotAtom(sl.id), sl);
            });

            set(lockerAtom(lk.id), {
              ...lk,
              slots: slotIds,
            });
          });

          set(buildingAtom(bd.id), {
            ...bd,
            lockers: lockerIds,
          });
        });

        set(buildingIdsAtom, allBuildingIds);
      },
    [],
  );

  const getBuildings = useCallback(async () => {
    try {
      const res = await buildingApi.getBuildings();
      const result: BuildingResponeType[] = res.data;
      populateRecoilState(result);
    } catch (error) {
      console.log(error);
      message.error('Lỗi khi tải dữ liệu toà nhà.');
    }
  }, [populateRecoilState]);

  useEffect(() => {
    if (buildingIds.length === 0) {
      getBuildings();
    }
  }, [buildingIds.length, getBuildings]);

  const handleTopUp = () => {
    setIsDepositModalOpen(true);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (step === 0 && selectedLocker) {
        setStep(1);
      } else if (step === 1 && values.receiveDate && values.receiveTime) {
        setStep1Values(values);
        const { receiveDate, receiveTime } = values;
        const combinedReceiveDateTime: Dayjs = receiveDate
          .hour(receiveTime.hour())
          .minute(receiveTime.minute())
          .second(0);
        const now = dayjs();
        const diffInHoursFloat = combinedReceiveDateTime.diff(now, 'hour', true);
        const finalDuration = diffInHoursFloat;

        if (finalDuration < 1) {
          message.error('Thời gian nhận hàng phải tối thiểu sau 1 giờ kể từ hiện tại.', 3);
          return;
        }

        setDuration(finalDuration);
        setStep(2);
      } else {
        message.error('Vui lòng điền đủ thông tin bắt buộc và chọn tủ.', 3);
      }
    } catch {
      message.error('Vui lòng điền đủ thông tin bắt buộc.', 3);
    }
  };

  return {
    step,
    setStep,
    selectedSize,
    setSelectedSize,
    selectedLocker,
    setselectedLocker,
    duration,
    total,
    walletBalance,
    availableSizesCount,
    currentBuilding,
    selectedSizeData,
    step1Values,
    setStep1Values,
    setDuration,
    setIsSubmitting,

    handleTopUp,
    handleNextStep,
    formatCurrency,
    sizeOptions,
    isDepositModalOpen,
    handleCloseDepositModal,
    isSubmitting,
    navigate,
  };
};
