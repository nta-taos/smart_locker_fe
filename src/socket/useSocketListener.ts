import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';
import { orderState } from '@/recoil/atom/order.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { OrderItemType } from '@/types/order.type';
import { SlotType } from '@/types/slot.type';
import { WalletType } from '@/types/wallet.type';

import { getSocket } from '.';
import { registerSocketEvents } from './socketEvents';

export const useSocketListener = () => {
  const setOrders = useSetRecoilState(orderState);
  const setAuth = useSetRecoilState(authState);

  const setSlotState = useRecoilCallback(
    ({ set }) =>
      (id: number, data: SlotType) => {
        set(slotAtom(id), data);
      },
    [],
  );

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

      onWalletUpdate: (updatedWallet: WalletType) => {
        console.log('chek updatedWallet', updatedWallet);
        setAuth((prevAuth) => {
          if (!prevAuth?.user) return prevAuth;
          return {
            ...prevAuth,
            user: {
              ...prevAuth.user,
              wallet: updatedWallet,
            },
          };
        });
      },
    });

    return () => {
      socket.off('order:created');
      socket.off('slot:updated');
      socket.off('wallet:updated');
    };
  }, [setOrders, setSlotState, setAuth]);
};
