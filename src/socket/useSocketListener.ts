import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { orderState } from '@/recoil/atom/order.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { OrderItemType } from '@/types/order.type';
import { SlotType } from '@/types/slot.type';

import { getSocket } from '.';
import { registerSocketEvents } from './socketEvents';

export const useSocketListener = () => {
  const setOrders = useSetRecoilState(orderState);
  const setSlotState = useRecoilCallback(({ set }) => (id: number, data: SlotType) => {
    set(slotAtom(id), data);
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    registerSocketEvents({
      onOrderCreated: (newOrder: OrderItemType) => {
        setOrders((prev) => ({
          ...prev,
          orders: [newOrder, ...prev.orders],
        }));
      },
      onSlotUpdated: (updatedSlot: SlotType) => {
        setSlotState(updatedSlot.id, updatedSlot);
      },
    });

    return () => {
      socket.off('order:created');
      socket.off('slot:updated');
    };
  }, [setOrders, setSlotState]);
};
