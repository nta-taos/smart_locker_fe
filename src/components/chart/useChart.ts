import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { orderApi } from '@/api/orderApi';

export const useChart = () => {
  const [data, setData] = useState([]);

  const getOrderStats = useCallback(async () => {
    try {
      const res = await orderApi.getOrderStats();
      const result = res.data.data;
      setData(result);
    } catch (error) {
      console.log(error);
      toast.error('Không thể load biểu đồ');
    }
  }, []);

  useEffect(() => {
    getOrderStats();
  }, [getOrderStats]);

  return { data };
};
