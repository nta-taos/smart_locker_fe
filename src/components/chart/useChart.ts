import { useCallback, useEffect, useState } from 'react';

import { orderApi } from '@/api/orderApi';

export const useChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrderStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await orderApi.getOrderStats();
      setData(res.data);
    } catch (error) {
      console.log('Lỗi tại useChart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrderStats();
  }, [getOrderStats]);

  return { data, isLoading };
};
