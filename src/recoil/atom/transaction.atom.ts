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
    page: 0,
    totalPages: 0,
  },
});
