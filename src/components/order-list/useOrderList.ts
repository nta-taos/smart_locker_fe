import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { orderApi } from '@/api/orderApi';
import { orderState } from '@/recoil/atom/order.atom';
import { OrderListResponType } from '@/types/order.type';

export const useOrderList = () => {
  const [state, setState] = useRecoilState(orderState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const limit = 5;

  const getOrders = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }

        const res = await orderApi.getOrders(pageNum, limit);
        const result: OrderListResponType = res.data.data;

        setState((prev) => ({
          orders: append ? [...prev.orders, ...result.data] : result.data,
          page: pageNum,
          totalPages: result.totalPages,
        }));
      } catch (error) {
        toast.error('Lấy lịch sử giao dịch thất bại');
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    },
    [setState],
  );
  useEffect(() => {
    if (state.orders.length === 0) {
      getOrders(1, false);
    }
  }, [state.orders.length, getOrders]);

  const loadMore = () => {
    if (!isLoading && state.page < state.totalPages) {
      getOrders(state.page + 1, true);
    }
  };

  return {
    orders: state.orders,
    loadMore,
    isLoading,
    isLoadMore,
    isHasMore: state.page < state.totalPages,
  };
};
