import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atom/authAtom';

const useDashboardHeader = () => {
  const auth = useRecoilValue(authState);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const user = auth?.user;

  return {
    user,
    isOpen,
    toggleMenu,
  };
};

export default useDashboardHeader;
