import { OrderItemType } from '@/types/order.type';
import { SlotType } from '@/types/slot.type';
import { WalletType } from '@/types/wallet.type';

import { getSocket } from '.';

interface SocketEventHandlers {
  onOrderCreated: (order: OrderItemType) => void;
  onSlotUpdated: (slot: SlotType) => void;
  onWalletUpdate: (wallet: WalletType) => void;
}

export const registerSocketEvents = ({
  onOrderCreated,
  onSlotUpdated,
  onWalletUpdate,
}: SocketEventHandlers) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on('order:created', onOrderCreated);
  socket.on('slot:updated', onSlotUpdated);
  socket.on('wallet:updated', onWalletUpdate);
};
