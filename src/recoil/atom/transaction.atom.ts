import { atom } from 'recoil';

import { TransactionItemType } from '@/types/transaction.type';

export const transactionState = atom<{
  transactions: TransactionItemType[];
  page: number;
  totalPages: number;
}>({
  key: 'transactionState',
  default: {
    transactions: [],
    page: 1,
    totalPages: 1,
  },
});
