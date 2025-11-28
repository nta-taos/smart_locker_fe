import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { orderApi } from '@/api/orderApi';
import { orderPendingState, orderReceivedState, orderState } from '@/recoil/atom/order.atom';
import { OrderListResponType } from '@/types/order.type';
import { extractErrorMessage } from '@/utils/error.utils';

export const useOrderList = (
  limit: number,
  status: 'pending' | 'received' | 'all',
  searchCode?: string,
  from?: string,
  to?: string,
) => {
  const [orderAll, setOrderAll] = useRecoilState(orderState);
  const [orderPending, setOrderPending] = useRecoilState(orderPendingState);
  const [orderReceived, setOrderReceived] = useRecoilState(orderReceivedState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const getOrders = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }

        const res = await orderApi.getOrders(pageNum, limit, status, {
          code: searchCode,
          from,
          to,
        });
        const result: OrderListResponType = res.data;
        const data = result.data || [];

        if (status === 'all') {
          setOrderAll((prev) => ({
            orders: append ? [...prev.orders, ...data] : data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        } else if (status === 'pending') {
          setOrderPending((prev) => ({
            orders: append ? [...prev.orders, ...data] : data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        } else if (status === 'received') {
          setOrderReceived((prev) => ({
            orders: append ? [...prev.orders, ...data] : data,
            page: pageNum,
            totalPages: result.totalPages,
          }));
        }
      } catch (error) {
        console.error(error);
        extractErrorMessage(error);
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    },
    [setOrderAll, setOrderPending, setOrderReceived, status, limit, searchCode, from, to],
  );
  useEffect(() => {
    // Load first page on mount or when search params change
    getOrders(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCode, from, to, status, limit]);

  const loadMore = () => {
    if (isLoading) return;

    const currentData =
      status === 'all' ? orderAll : status === 'pending' ? orderPending : orderReceived;

    if (currentData.page < currentData.totalPages) {
      getOrders(currentData.page + 1, true);
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
