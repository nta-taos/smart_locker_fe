import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { transactionApi } from '@/api/transactionApi';
import { transactionState } from '@/recoil/atom/transaction.atom';
import { TransactionResponeType } from '@/types/transaction.type';

export const useTransaction = () => {
  const [transactions, setTransactions] = useRecoilState(transactionState);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
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
        const result: TransactionResponeType = res.data.data;

        setTransactions((prev) => (append ? [...prev, ...result.data] : result.data));

        setIsHasMore(pageNum < result.totalPages);
      } catch (error) {
        toast.error('Lấy lịch sử giao dịch thất bại');
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    },
    [setTransactions],
  );

  useEffect(() => {
    if (page === 1 && transactions.length === 0) {
      getTransactions(page, false);
    }

    if (page > 1) {
      getTransactions(page, true);
    }
  }, [page, getTransactions, transactions.length]);

  const loadMore = () => {
    if (!isLoading && isHasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    transactions,
    loadMore,
    isLoading,
    isHasMore,
    isLoadMore,
  };
};
