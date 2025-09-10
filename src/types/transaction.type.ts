export type TransactionItemType = {
  id: string;
  amount: number;
  type: number;
  description: string;
  created_at: string;
};

export type TransactionResponeType = {
  data: TransactionItemType[];
  limit: number;
  page: number;
  totalPages: number;
};
