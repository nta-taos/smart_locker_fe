import { AtomEffect, atom } from 'recoil';

import { AuthType } from '@/types/auth.type';

// Effect to sync authState with localStorage
const localStorageEffect: AtomEffect<AuthType> = ({ setSelf, onSet }) => {
  // Initialize from localStorage on first load
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    setSelf(JSON.parse(storedAuth));
  }

  // Sync to localStorage whenever state changes
  onSet((newValue, _, isReset) => {
    if (isReset) {
      localStorage.removeItem('auth');
    } else {
      localStorage.setItem('auth', JSON.stringify(newValue));
    }
  });
};

export const authState = atom<AuthType>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  effects: [localStorageEffect],
});
