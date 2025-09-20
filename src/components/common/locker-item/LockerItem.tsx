import { joinClass } from '@/utils/join-class';

import styles from './LockerItem.module.scss';

export const LockerItem: React.FC<{
  num?: number;
  size: 0 | 1 | 2;
  className?: string;
}> = ({ num, size, className = '' }) => {
  const classes = joinClass([className, styles.container]);
  return (
    <div className={classes}>
      <div className={styles.top}>
        <h1 className={styles.size}>{size === 0 ? 'S' : size === 1 ? 'M' : 'L'}</h1>
        <p>D x R x C (cm)</p>
        <h1> 3 0 x 3 0 x 3 5</h1>
      </div>
      <div className={styles.bottom}>
        <p>Ngăn trống</p>
        <h1 className={styles.slot}>{num || 0}</h1>
      </div>
    </div>
  );
};
