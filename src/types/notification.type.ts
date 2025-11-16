export type NotificationDataType = {
  role: string;
  orderId: number;
  totalCost: number;
};

export type NotificationPayload = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  userId: number;
  type: number;
  title: string;
  message: string;
  isRead: boolean;
  data: NotificationDataType;
};
