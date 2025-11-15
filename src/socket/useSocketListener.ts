import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';
import { orderState } from '@/recoil/atom/order.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { transactionState } from '@/recoil/atom/transaction.atom';
import { OrderItemType } from '@/types/order.type';
import { SlotType } from '@/types/slot.type';
import { TransactionItemType } from '@/types/transaction.type';
import { WalletType } from '@/types/wallet.type';

import { getSocket } from '.';
import { registerSocketEvents } from './socketEvents';

export const useSocketListener = () => {
  const setOrders = useSetRecoilState(orderState);
  const setAuth = useSetRecoilState(authState);
  const setTransaction = useSetRecoilState(transactionState);

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
      onTransactionCreated: (transactionItem: TransactionItemType) => {
        setTransaction((prev) => ({
          ...prev,
          transactions: [transactionItem, ...prev.transactions],
        }));
      },
      onOrderCreated: (newOrder: OrderItemType) => {
        setOrders((prev) => ({
          ...prev,
          orders: [newOrder, ...prev.orders],
        }));
      },

      onOrderUpdated: (updatedOrder: OrderItemType) => {
        setOrders((prev) => ({
          ...prev,
          orders: prev.orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
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
      socket.off('order:updated');
      socket.off('slot:updated');
      socket.off('wallet:updated');
      socket.off('transaction:created');
    };
  }, [setOrders, setSlotState, setAuth, setTransaction]);
};
