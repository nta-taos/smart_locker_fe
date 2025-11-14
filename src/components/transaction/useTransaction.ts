import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { transactionApi } from '@/api/transactionApi';
import { transactionState } from '@/recoil/atom/transaction.atom';
import { TransactionResponeType } from '@/types/transaction.type';

export const useTransaction = () => {
  const [state, setState] = useRecoilState(transactionState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const limit = 5;

  const getTransactions = useCallback(
    async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }

        const res = await transactionApi.getAll(pageNum, limit);
        const result: TransactionResponeType = res.data;
        const data = result.data || [];

        setState((prev) => ({
          transactions: append ? [...prev.transactions, ...data] : data,
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
    if (state.transactions?.length === 0) {
      getTransactions(1, false);
    }
  }, [state.transactions, getTransactions]);

  const loadMore = () => {
    if (!isLoading && state.page < state.totalPages) {
      getTransactions(state.page + 1, true);
    }
  };

  return {
    transactions: state.transactions,
    loadMore,
    isLoading,
    isLoadMore,
    isHasMore: state.page < state.totalPages,
  };
};
