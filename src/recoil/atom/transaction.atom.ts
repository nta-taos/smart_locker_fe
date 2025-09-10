import { atom } from 'recoil';

import { TransactionItemType } from '@/types/transaction.type';

export const transactionState = atom<TransactionItemType[]>({
  key: 'transactionState',
  default: [],
});
