import { TransactionItemType } from './transactionitem.type';

export type TransactionResponeType = {
  data: TransactionItemType[];
  limit: number;
  page: number;
  totalPages: number;
};
