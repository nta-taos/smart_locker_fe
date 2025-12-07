import { atom } from 'recoil';

import { WalletType } from '@/types/wallet.type';

export const walletState = atom<WalletType | null>({
  key: 'walletState',
  default: null,
});
