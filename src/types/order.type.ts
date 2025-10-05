import { PaginationType } from './pagination.type';
import { UserType } from './user.type';

export type OrderItemType = {
  id: number;
  lockerSlot: {
    id: number;
    size: number;
  };
  order_code?: number;
  receiver?: UserType;
  receiver_phone: string;
  sender: UserType;
  start_time: string;
};

export type OrderListResponType = PaginationType<OrderItemType>;
