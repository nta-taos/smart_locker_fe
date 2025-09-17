import { useLockerStateById } from '@/recoil/atom/building.atom';

export const useLockerItem = ({ id }: { id: number }) => {
  const locker = useLockerStateById(id);

  return { locker };
};
