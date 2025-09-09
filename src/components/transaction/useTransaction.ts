import { useEffect, useState } from 'react';

import { transactionApi } from '@/api/transactionApi';
import { TransactionItemType } from '@/types/transactionitem.type';
import { TransactionResponeType } from '@/types/transactionrespon.type';

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<TransactionItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const getTransactions = async (pageNum: number, append = false) => {
      try {
        if (append) {
          setIsLoadMore(true);
        } else {
          setIsLoading(true);
        }

        // await new Promise((resolve) => setTimeout(resolve, 2500));

        const res = await transactionApi.getAll(pageNum, limit);
        const result: TransactionResponeType = res.data.data;

        setTransactions((prev) => (append ? [...prev, ...result.data] : result.data));

        setIsHasMore(pageNum < result.totalPages);
      } catch (error) {
        console.error('getTransactions error:', error);
      } finally {
        setIsLoading(false);
        setIsLoadMore(false);
      }
    };

    getTransactions(page, page > 1);
  }, [page]);

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
