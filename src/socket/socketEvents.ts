import { OrderItemType } from '@/types/order.type';
import { SlotType } from '@/types/slot.type';

import { getSocket } from '.';

interface SocketEventHandlers {
  onOrderCreated: (order: OrderItemType) => void;
  onSlotUpdated: (slot: SlotType) => void;
}

export const registerSocketEvents = ({ onOrderCreated, onSlotUpdated }: SocketEventHandlers) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on('order:created', onOrderCreated);
  socket.on('slot:updated', onSlotUpdated);
};
