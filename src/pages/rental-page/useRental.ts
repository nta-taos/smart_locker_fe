import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import axios from 'axios';

import { orderApi } from '@/api/orderApi';
import { authState } from '@/recoil/atom/authAtom';
import { useBuildingStateById, useLockerStateById } from '@/recoil/atom/building.atom';

export const useRental = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const buildingState = useBuildingStateById(Number(id) || 0);
  const selectedLockerId = buildingState.lockers[0];
  const lockerState = useLockerStateById(selectedLockerId);
  const slotIds = lockerState.slots;
  const [isStateOne, setIsStateOne] = useState(true);
  const [slotIdSelected, setSlotIdSelected] = useState(-1);
  const [phone, setPhone] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [dateTime, setDateTime] = useState('');

  console.log(auth.user);

  const handleRent = () => {
    if (slotIdSelected == -1) {
      toast.error('Hãy chọn tủ !');
      return;
    }
    setIsStateOne(false);
  };

  const validationOrderUser = () => {
    if (!dateTime) {
      toast.error('Hãy nhập ngày giờ');
      return false;
    }
    return true;
  };
  const validationOrderShipper = () => {
    if (!orderCode.trim()) {
      toast.error('Hãy nhập mã đơn hàng');
      return false;
    }
    if (!phone.trim()) {
      toast.error('Hãy nhập số điện thoại');
      return false;
    }
    return true;
  };

  const handleOrder = async () => {
    try {
      let res;
      if (auth.user?.role === 0) {
        if (!validationOrderUser()) return;
        res = await orderApi.postOrderUser(auth.user.id, dateTime, slotIdSelected);
      } else if (auth.user?.role === 1) {
        if (!validationOrderShipper()) return;
        res = await orderApi.postOrderShipper(auth.user.id, phone, selectedLockerId, orderCode);
      }

      if (res?.status == 200) {
        navigate('/smartbox');
        toast.success('Đặt tủ thành công');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Có lỗi xảy ra');
      } else {
        toast.error('Lỗi không xác định');
      }
    }
  };

  useEffect(() => {
    if (!id || isNaN(Number(id)) || buildingState.lockers.length == 0) {
      navigate('/smartbox');
    }
  }, [id, buildingState, navigate]);

  return {
    auth,
    isStateOne,
    setIsStateOne,
    phone,
    setPhone,
    orderCode,
    dateTime,
    setDateTime,
    setOrderCode,
    handleOrder,
    handleRent,
    buildingState,
    selectedLockerId,
    slotIds,
    slotIdSelected,
    setSlotIdSelected,
  };
};
