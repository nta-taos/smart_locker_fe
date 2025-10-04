import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { orderApi } from '@/api/orderApi';
import { orderPendingState, orderReceivedState, orderState } from '@/recoil/atom/order.atom';
import { OrderListResponType } from '@/types/order.type';

export const useOrderList = (
  limit: number,
  status: 'pending' | 'received' | 'all',
  search: string,
) => {
  const [orderAll, setOrderAll] = useRecoilState(orderState);
  const [orderPending, setOrderPending] = useRecoilState(orderPendingState);
  const [orderReceived, setOrderReceived] = useRecoilState(orderReceivedState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  console.log(search);

  const getOrders = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }

        const res = await orderApi.getOrders(pageNum, limit, status);
        const result: OrderListResponType = res.data.data;

        if (status === 'all') {
          setOrderAll((prev) => ({
            orders: append ? [...prev.orders, ...result.data] : result.data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        } else if (status === 'pending') {
          setOrderPending((prev) => ({
            orders: append ? [...prev.orders, ...result.data] : result.data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        } else if (status === 'received') {
          setOrderReceived((prev) => ({
            orders: append ? [...prev.orders, ...result.data] : result.data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        }
      } catch (error) {
        toast.error('Lấy lịch sử giao dịch thất bại');
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    },
    [setOrderAll, setOrderPending, setOrderReceived, status, limit],
  );
  useEffect(() => {
    if (
      (orderAll.orders.length === 0,
      orderPending.orders.length === 0,
      orderReceived.orders.length === 0)
    ) {
      getOrders(1, false);
    }
  }, [orderAll.orders.length, orderPending.orders.length, orderReceived.orders.length, getOrders]);

  const loadMore = () => {
    if (!isLoading && orderAll.page < orderAll.totalPages && status === 'all') {
      getOrders(orderAll.page + 1, true);
      return;
    }
    if (!isLoading && orderPending.page < orderPending.totalPages && status === 'pending') {
      getOrders(orderPending.page + 1, true);
      return;
    }
    if (!isLoading && orderReceived.page < orderReceived.totalPages && status === 'received') {
      getOrders(orderReceived.page + 1, true);
      return;
    }
  };

  return {
    orderAll,
    orderPending,
    orderReceived,
    loadMore,
    isLoading,
    isLoadMore,
  };
};
