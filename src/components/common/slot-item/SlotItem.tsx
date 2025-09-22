import { joinClass } from '@/utils/join-class';

import styles from './SlotItem.module.scss';

interface SlotItemProps {
  className?: string;
  id: string;
  status: 0 | 1 | 2 | 3;
  isSelected: boolean;
  onClick: () => void;
}

export const SlotItem: React.FC<SlotItemProps> = ({
  className = '',
  id,
  status,
  isSelected,
  onClick,
}) => {
  const classes = joinClass([className, styles.container]);

  if (status == 0) {
    return (
      <button
        className={classes}
        onClick={() => {
          onClick();
        }}
      >
        <div className={styles.available}>
          <div className={styles.left}>
            <div></div>
          </div>
          <div className={styles.right}>
            <div className={`${styles.body} ${isSelected && styles.isSelected}`}>
              <div className={styles.top}>
                <h1>{id}</h1>
                <div></div>
                <div></div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button className={classes}>
      <div className={styles.unavailable}>
        <div className={`${styles.body} ${status == 3 && styles.isMaintenance}`}>
          <div className={styles.top}>
            <h1>{id}</h1>
            <div></div>
            <div></div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </div>
        </div>
      </div>
    </button>
  );
};
