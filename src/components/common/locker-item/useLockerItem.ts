import useMap from '@/components/map/useMap';

export const useLockerItem = ({ id }: { id: number }) => {
  const { getLockerStateById } = useMap();
  const locker = getLockerStateById(id);

  return { locker };
};
