import { joinClass } from '@/utils/join-class';

import styles from './LockerItem.module.scss';
import { useLockerItem } from './useLockerItem';

export const LockerItem: React.FC<{
  id: number;
  className?: string;
}> = ({ id, className = '' }) => {
  const { locker } = useLockerItem({ id });

  const classes = joinClass([className, styles.container]);
  return (
    <div className={classes}>
      <div className={styles.top}>
        <h1 className={styles.size}>S</h1>
        <p>D x R x C (cm)</p>
        <h1> 3 0 x 3 0 x 3 5</h1>
      </div>
      <div className={styles.bottom}>
        <p>Ngăn trống</p>
        <h1>{locker.slots}</h1>
      </div>
    </div>
  );
};
