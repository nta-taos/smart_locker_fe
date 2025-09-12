import { atom } from 'recoil';

import { OrderItemType } from '@/types/order.type';

export const orderState = atom<{
  orders: OrderItemType[];
  page: number;
  totalPages: number;
}>({
  key: 'orderState',
  default: {
    orders: [],
    page: 1,
    totalPages: 1,
  },
});
