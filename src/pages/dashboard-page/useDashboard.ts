import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';

export const useDashboard = () => {
  const auth = useRecoilValue(authState);

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = useCallback(() => {
    setIsBalanceVisible((prev) => !prev);
  }, []);

  const userRole = auth?.user?.role || 0;

  return {
    auth,
    userRole,
    isBalanceVisible,
    toggleBalanceVisibility,
  };
};
