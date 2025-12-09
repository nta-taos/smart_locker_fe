import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';

export const useAuth = () => {
  const auth = useRecoilValue(authState);

  const isAuthenticated = useMemo(() => {
    return !!auth.token && !!auth.user;
  }, [auth]);

  return { isAuthenticated, user: auth.user };
};
