import { PaginationType } from './pagination.type';

export type OrderItemType = {
  id: number;
  order_code: string;
  receiver_phone: string;
  status: number;
  fee: number | string;
  start_time: string;
  end_time: string;
  type: number;
  payment_status: number;
  sender: {
    id: number;
    phone: string;
    name: string;
    role: number;
    avatar: string | null;
  };
  receiver: {
    id: number;
    phone: string;
    name: string;
    role: number;
    avatar: string | null;
  };
  lockerSlot: {
    id: number;
    size: number;
  };
  updated_at: string;
  hours: number;
};

export type SendPackagePayload = {
  lockerId: number;
  receiveDateTime: string;
  orderCode: string;
  receiverPhoneNumber: string;
  size: number;
};

export type RentalPayload = {
  lockerId: number;
  receiveDateTime: string;
  size: number;
};

export type OrderListResponType = PaginationType<OrderItemType>;
