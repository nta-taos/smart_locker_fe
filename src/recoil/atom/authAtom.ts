import { atom } from 'recoil';

import { AuthType } from '@/types/auth.type';

const storedAuth = localStorage.getItem('auth');
export const authState = atom<AuthType>({
  key: 'authState',
  default: storedAuth
    ? JSON.parse(storedAuth)
    : {
        isAuthenticated: false,
        token: null,
        user: null,
      },
});
