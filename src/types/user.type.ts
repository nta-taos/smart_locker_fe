import { WalletType } from './wallet.type';

export type UserType = {
  avatar: string;
  email: string;
  phone: string;
  id: number;
  name: string;
  role: number;
  wallet: WalletType;
  updated_at: string;
  token: string;
};
