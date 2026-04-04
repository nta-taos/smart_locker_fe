import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { walletApi } from '@/api/walletApi';
import { authState } from '@/recoil/atom/authAtom';
import { walletState } from '@/recoil/atom/walletAtom';

export const useWallet = () => {
  const [wallet, setWallet] = useRecoilState(walletState);
  const auth = useRecoilValue(authState);

  const fetchWallet = useCallback(async () => {
    if (!auth.isAuthenticated) {
      setWallet(null);
      return;
    }

    try {
      const data = await walletApi.getWallet();
      setWallet(data);
    } catch (error) {
      console.error('Failed to fetch wallet:', error);
      setWallet(null);
    }
  }, [auth.isAuthenticated, setWallet]);

  // Auto-fetch on mount if authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchWallet();
    }
  }, [auth.isAuthenticated, fetchWallet]);

  return {
    wallet,
    fetchWallet,
    setWallet,
  };
};
